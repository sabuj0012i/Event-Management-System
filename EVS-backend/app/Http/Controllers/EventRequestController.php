<?php

namespace App\Http\Controllers;

use App\Models\EventRequest;
use App\Models\Event;
use App\Models\Notification;
use App\Models\Analytics;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventRequestController extends Controller
{
    // User: submit event request
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'mode' => 'required|in:online,offline',
            'meeting_link' => 'nullable|required_if:mode,online|string|max:255',
            'venue' => 'nullable|required_if:mode,offline|string|max:255',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'details' => 'nullable|string'
        ]);

        $eventRequest = EventRequest::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
            'mode' => $validated['mode'],
            'meeting_link' => $validated['mode'] === 'online' ? $validated['meeting_link'] : null,
            'venue' => $validated['mode'] === 'offline' ? $validated['venue'] : null,
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'details' => $validated['details'] ?? null,
            'status' => 'pending'
        ]);

        // Notify all admins about the new event request
        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            Notification::create([
                'user_id' => $admin->id,
                'message' => "New event request submitted by ".Auth::user()->name.": '{$validated['name']}'",
                'is_read' => false,
            ]);
        }

        return response()->json($eventRequest, 201);
    }

    // Admin: list all pending event requests
    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admin can view event requests.'], 403);
        }
        $pending = EventRequest::where('status', 'pending')->with('user')->orderBy('created_at', 'desc')->get();
        return response()->json($pending, 200);
    }

    // Show single request (user or admin)
    public function show($id)
    {
        $eventRequest = EventRequest::with('user')->find($id);
        if (!$eventRequest) {
            return response()->json(['error' => 'Event request not found'], 404);
        }
        if (Auth::user()->role === 'admin' || Auth::id() === $eventRequest->user_id) {
            return response()->json($eventRequest, 200);
        }
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    // Admin: approve request and create event
    public function approve(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admin can approve requests.'], 403);
        }

        $eventRequest = EventRequest::find($id);
        if (!$eventRequest) {
            return response()->json(['error' => 'Event request not found'], 404);
        }
        if ($eventRequest->status !== 'pending') {
            return response()->json(['error' => 'Request is already processed.'], 400);
        }

        // Create event
        $event = Event::create([
            'name' => $eventRequest->name,
            'mode' => $eventRequest->mode,
            'meeting_link' => $eventRequest->meeting_link,
            'venue' => $eventRequest->venue,
            'start_time' => $eventRequest->start_time,
            'end_time' => $eventRequest->end_time,
            'details' => $eventRequest->details,
            'status' => 'upcoming',
            'created_by' => $eventRequest->user_id
        ]);

        // Ensure analytics row exists for the new event
        Analytics::firstOrCreate(['event_id' => $event->id], ['views' => 0, 'registrations' => 0]);

        $eventRequest->status = 'accepted';
        $eventRequest->save();

        // Notify user
        Notification::create([
            'user_id' => $eventRequest->user_id,
            'message' => "Your event request '{$eventRequest->name}' has been accepted!",
            'is_read' => false,
        ]);

        return response()->json(['message' => 'Event request approved!', 'event' => $event], 200);
    }

    // Admin: reject request with message
    public function reject(Request $request, $id)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admin can reject requests.'], 403);
        }

        $eventRequest = EventRequest::find($id);
        if (!$eventRequest) {
            return response()->json(['error' => 'Event request not found'], 404);
        }
        if ($eventRequest->status !== 'pending') {
            return response()->json(['error' => 'Request is already processed.'], 400);
        }

        $validated = $request->validate([
            'rejection_message' => 'required|string|max:255'
        ]);

        $eventRequest->status = 'rejected';
        $eventRequest->rejection_message = $validated['rejection_message'];
        $eventRequest->save();

        // Notify user
        Notification::create([
            'user_id' => $eventRequest->user_id,
            'message' => "Your event request '{$eventRequest->name}' has been rejected. Reason: {$eventRequest->rejection_message}",
            'is_read' => false,
        ]);

        return response()->json(['message' => 'Event request rejected!', 'event_request' => $eventRequest], 200);
    }
}