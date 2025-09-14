<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'event_id', 'name', 'mode', 'meeting_link', 'venue', 'start_time', 'end_time', 'details', 'status', 'rejection_message'
    ];

    // EventRequest belongs to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // EventRequest belongs to Event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}