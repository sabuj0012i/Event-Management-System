<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'mode', 'meeting_link', 'venue', 'start_time', 'end_time', 'details', 'status', 'created_by'
    ];

    // Event creator (User)
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Event has many event requests
    public function eventRequests()
    {
        return $this->hasMany(EventRequest::class);
    }

    // Event has one analytics
    public function analytics()
    {
        return $this->hasOne(Analytics::class);
    }
}