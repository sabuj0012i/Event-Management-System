<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRequest;
use App\Models\Analytics;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    // List all events, optionally filter by status
    public function index(Request $request)
    {
        $status = $request->query('status'); // 'upcoming', 'ongoing', 'finished'
        $query = Event::query();

        if ($status) {
            $query->where('status', $status);
        }

        $events = $query->with('creator')->get();
        return response()->json($events, 200);
    }

    // Show single event details
    public function show($id)
    {
        $event = Event::with('creator')->find($id);
        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }
        // Increment analytics views for this event
        $analytics = Analytics::firstOrCreate(['event_id' => $event->id], ['views' => 0, 'registrations' => 0]);
        $analytics->increment('views');
        return response()->json($event, 200);
    }

    // Create new event (admin only, direct entry)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'mode' => 'required|in:online,offline',
            'meeting_link' => 'nullable|required_if:mode,online|string|max:255',
            'venue' => 'nullable|required_if:mode,offline|string|max:255',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
            'details' => 'nullable|string',
        ]);

        // Only admin can create event directly
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admin can create event directly.'], 403);
        }

        $event = Event::create([
            'name' => $validated['name'],
            'mode' => $validated['mode'],
            'meeting_link' => $validated['mode'] === 'online' ? $validated['meeting_link'] : null,
            'venue' => $validated['mode'] === 'offline' ? $validated['venue'] : null,
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'details' => $validated['details'] ?? null,
            'created_by' => Auth::id(),
            'status' => 'upcoming',
        ]);

        return response()->json($event, 201);
    }

    // Update event (admin only)
    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admin can update events.'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'mode' => 'sometimes|in:online,offline',
            'meeting_link' => 'nullable|required_if:mode,online|string|max:255',
            'venue' => 'nullable|required_if:mode,offline|string|max:255',
            'start_time' => 'sometimes|date|after:now',
            'end_time' => 'sometimes|date|after:start_time',
            'details' => 'nullable|string',
            'status' => 'sometimes|in:upcoming,ongoing,finished',
        ]);

        // Update only validated fields
        $event->update($validated);

        return response()->json($event, 200);
    }

    // Delete event (admin only)
    public function destroy($id)
    {
        $event = Event::find($id);
        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admin can delete events.'], 403);
        }

        $event->delete();
        return response()->json(['message' => 'Event deleted'], 200);
    }

    // My Events: events and requests for current user
    public function myEvents()
    {
        $userId = Auth::id();

        // Events directly created by user/admin (with analytics)
        $events = Event::with(['analytics'])->where('created_by', $userId)->get();

        // Events requested by user
        $requests = EventRequest::with('event')->where('user_id', $userId)->get();

        return response()->json([
            'created_events' => $events,
            'event_requests' => $requests,
        ], 200);
    }
}