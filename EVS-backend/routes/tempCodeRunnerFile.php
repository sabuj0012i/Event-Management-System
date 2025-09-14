<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventRequestController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AnalyticsController; // Add this line

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Events, Event Requests, Notifications & Analytics routes (protected)
Route::middleware('auth:sanctum')->group(function () {
    // Events CRUD
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{id}', [EventController::class, 'show']);
    Route::post('/events', [EventController::class, 'store']); // admin only
    Route::put('/events/{id}', [EventController::class, 'update']); // admin only
    Route::delete('/events/{id}', [EventController::class, 'destroy']); // admin only

    // My Events for user
    Route::get('/my-events', [EventController::class, 'myEvents']);

    // Event Requests (users submit, admins process)
    Route::post('/event-requests', [EventRequestController::class, 'store']); // user submit
    Route::get('/event-requests', [EventRequestController::class, 'index']); // admin view pending
    Route::get('/event-requests/{id}', [EventRequestController::class, 'show']); // view details

    // Admin actions: approve/reject
    Route::post('/event-requests/{id}/approve', [EventRequestController::class, 'approve']);
    Route::post('/event-requests/{id}/reject', [EventRequestController::class, 'reject']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications', [NotificationController::class, 'store']); // admin only
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    // Analytics (admin only)
    Route::get('/admin/analytics', [AnalyticsController::class, 'summary']); // admin only