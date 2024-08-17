<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('game_player', function (Blueprint $table) {
            $table->id();
            $table->foreignId('game_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('player_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('team_id')->constrained()->nullable();
            $table->boolean('confirmed');
            $table->timestamps();

            $table->unique(['game_id', 'player_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_player');
    }
};
