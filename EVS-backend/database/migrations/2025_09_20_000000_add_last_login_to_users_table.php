<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('users', 'last_login')) {
            Schema::table('users', function (Blueprint $table) {
                $table->timestamp('last_login')->nullable()->after('remember_token');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'last_login')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('last_login');
            });
        }
    }
};


