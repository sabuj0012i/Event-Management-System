<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('mode', ['online', 'offline']);
            $table->string('meeting_link')->nullable();
            $table->string('venue')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->text('details');
            $table->enum('status', ['upcoming', 'ongoing', 'finished'])->default('upcoming');
            $table->unsignedBigInteger('created_by'); // Foreign key to users
            $table->timestamps();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};