<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('event_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->enum('mode', ['online', 'offline']);
            $table->string('meeting_link')->nullable();
            $table->string('venue')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->text('details');
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            $table->string('rejection_message')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_requests');
    }
};