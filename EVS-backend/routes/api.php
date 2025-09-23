<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventRequestController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Middleware\CorsMiddleware;

// Preflight handler for any route
Route::options('/{any}', function () {
    return response('OK', 200);
})->where('any', '.*');

// ----------------------------
// Public Auth Routes
// ----------------------------
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/health', fn () => response()->json(['status' => 'ok']));

// ----------------------------
// Protected Routes (Sanctum)
// ----------------------------
Route::middleware(['auth:sanctum'])->group(function () {

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Events (read for all auth users)
    Route::get('/events', [EventController::class, 'index']); 
    Route::get('/events/{id}', [EventController::class, 'show']); 

    // Events admin-only
    Route::middleware('admin')->group(function () {
        Route::post('/events', [EventController::class, 'store']);
        Route::put('/events/{id}', [EventController::class, 'update']);
        Route::delete('/events/{id}', [EventController::class, 'destroy']);
        Route::post('/notifications', [NotificationController::class, 'store']);
        Route::get('/admin/analytics', [AnalyticsController::class, 'summary']);
        Route::post('/admin/users', [AuthController::class, 'createUser']);
        Route::get('/event-requests', [EventRequestController::class, 'index']);
        Route::post('/event-requests/{id}/approve', [EventRequestController::class, 'approve']);
        Route::post('/event-requests/{id}/reject', [EventRequestController::class, 'reject']);
    });

    // User-specific events
    Route::get('/my-events', [EventController::class, 'myEvents']); 

    // Event Requests (user)
    Route::post('/event-requests', [EventRequestController::class, 'store']);
    Route::get('/event-requests/{id}', [EventRequestController::class, 'show']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']); 
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']); 
});
