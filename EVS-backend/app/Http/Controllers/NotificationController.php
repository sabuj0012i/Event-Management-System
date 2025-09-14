<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    // List notifications for current user
    public function index()
    {
        $notifications = Notification::where('user_id', Auth::id())->orderBy('created_at', 'desc')->get();
        return response()->json($notifications, 200);
    }

    // Admin sends notification to user
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admin can send notifications.'], 403);
        }

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string'
        ]);

        $notification = Notification::create([
            'user_id' => $validated['user_id'],
            'message' => $validated['message'],
            'is_read' => false,
        ]);

        return response()->json($notification, 201);
    }

    // Mark notification as read
    public function markAsRead($id)
    {
        $notification = Notification::where('user_id', Auth::id())->find($id);
        if (!$notification) {
            return response()->json(['error' => 'Notification not found'], 404);
        }
        $notification->is_read = true;
        $notification->save();

        return response()->json(['message' => 'Notification marked as read'], 200);
    }
}