<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role', // Added role here!
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // User has many events (as creator)
    public function events()
    {
        return $this->hasMany(Event::class, 'created_by');
    }

    // User has many event requests
    public function eventRequests()
    {
        return $this->hasMany(EventRequest::class);
    }

    // User has many notifications
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}