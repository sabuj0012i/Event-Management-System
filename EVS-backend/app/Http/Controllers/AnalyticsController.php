<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRequest;
use Illuminate\Support\Facades\Auth;

class AnalyticsController extends Controller
{
    // Only admin can view analytics
    public function summary()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admin can view analytics.'], 403);
        }

        return response()->json([
            'total_events' => Event::count(),
            'upcoming_events' => Event::where('status', 'upcoming')->count(),
            'ongoing_events' => Event::where('status', 'ongoing')->count(),
            'finished_events' => Event::where('status', 'finished')->count(),
            'total_event_requests' => EventRequest::count(),
            'pending_requests' => EventRequest::where('status', 'pending')->count(),
            'accepted_requests' => EventRequest::where('status', 'accepted')->count(),
            'rejected_requests' => EventRequest::where('status', 'rejected')->count(),
        ], 200);
    }
}