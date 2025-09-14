<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Analytics extends Model
{
    use HasFactory;

    protected $fillable = [
        'event_id', 'views', 'registrations'
    ];

    // Analytics belongs to Event
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}