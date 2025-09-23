<?php

namespace Database\Seeders;

use App\Models\{User, Event, EventRequest, Notification, Analytics};
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed initial admin and a normal user
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('Admin@123'),
                'role' => 'admin',
            ]
        );

        $user = User::updateOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User',
                'password' => Hash::make('User@123'),
                'role' => 'user',
            ]
        );

        // Sample events created by admin
        $event1 = Event::updateOrCreate(
            [
                'name' => 'Tech Talk 101',
            ],
            [
                'mode' => 'online',
                'meeting_link' => 'https://meet.example.com/techtalk',
                'venue' => null,
                'start_time' => now()->addDays(2),
                'end_time' => now()->addDays(2)->addHours(2),
                'details' => 'Introductory tech talk.',
                'status' => 'upcoming',
                'created_by' => $admin->id,
            ]
        );

        $event2 = Event::updateOrCreate(
            [
                'name' => 'Campus Meetup',
            ],
            [
                'mode' => 'offline',
                'meeting_link' => null,
                'venue' => 'Auditorium A',
                'start_time' => now()->addDays(5),
                'end_time' => now()->addDays(5)->addHours(3),
                'details' => 'Networking event.',
                'status' => 'upcoming',
                'created_by' => $admin->id,
            ]
        );

        // Analytics rows
        Analytics::updateOrCreate(['event_id' => $event1->id], ['views' => 5, 'registrations' => 2]);
        Analytics::updateOrCreate(['event_id' => $event2->id], ['views' => 8, 'registrations' => 3]);

        // Sample pending event requests
        EventRequest::updateOrCreate(
            [
                'user_id' => $user->id,
                'name' => 'Workshop: React Basics',
            ],
            [
                'mode' => 'online',
                'meeting_link' => 'https://meet.example.com/react',
                'venue' => null,
                'start_time' => now()->addDays(7),
                'end_time' => now()->addDays(7)->addHours(2),
                'details' => 'Hands-on workshop.',
                'status' => 'pending',
            ]
        );

        EventRequest::updateOrCreate(
            [
                'user_id' => $user->id,
                'name' => 'Design Sprint',
            ],
            [
                'mode' => 'offline',
                'meeting_link' => null,
                'venue' => 'Lab 3',
                'start_time' => now()->addDays(9),
                'end_time' => now()->addDays(9)->addHours(4),
                'details' => 'Team-based design sprint.',
                'status' => 'pending',
            ]
        );

        // Notify admin about pending requests
        Notification::create([
            'user_id' => $admin->id,
            'message' => 'Sample: Pending event requests are available to review.',
            'is_read' => false,
        ]);
    }
}
