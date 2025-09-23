<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventRequest;
use App\Models\Analytics;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AnalyticsController extends Controller
{
    // Only admin can view analytics
    public function summary()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admin can view analytics.'], 403);
        }

        // Basic counts
        $response = [
            'total_events' => Event::count(),
            'upcoming_events' => Event::where('status', 'upcoming')->count(),
            'ongoing_events' => Event::where('status', 'ongoing')->count(),
            'finished_events' => Event::where('status', 'finished')->count(),
            'total_event_requests' => EventRequest::count(),
            'pending_requests' => EventRequest::where('status', 'pending')->count(),
            'accepted_requests' => EventRequest::where('status', 'accepted')->count(),
            'rejected_requests' => EventRequest::where('status', 'rejected')->count(),
        ];

        // Optional: total user registrations
        $response['user_registrations'] = User::count();

        // Active users in last 30 days if last_login column exists
        try {
            $hasLastLogin = Schema::hasColumn('users', 'last_login');
        } catch (\Throwable $e) {
            $hasLastLogin = false;
        }
        if ($hasLastLogin) {
            $response['active_users_30d'] = User::where('last_login', '>=', now()->subDays(30))->count();
        } else {
            $response['active_users_30d'] = null;
        }

        // Participation trends from analytics table (registrations per day, last 14 days)
        $rows = Analytics::select(DB::raw('DATE(created_at) as d'), DB::raw('SUM(registrations) as regs'))
            ->where('created_at', '>=', now()->subDays(14))
            ->groupBy('d')
            ->orderBy('d')
            ->get();
        $response['participation_labels'] = $rows->pluck('d')->map(fn($d) => date('M d', strtotime($d)))->values();
        $response['participation'] = $rows->pluck('regs')->values();

        return response()->json($response, 200);
    }
}