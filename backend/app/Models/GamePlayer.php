<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class GamePlayer extends Pivot
{
    protected $table = 'game_player';

    protected $fillable = [
        'game_id', 
        'player_id', 
        'team_id',
        'confirmed'
    ];

    protected $casts = [
        'confirmed' => 'boolean'
    ];

    public function team(): BelongsTo {
        return $this->belongsTo(Team::class);
    }
}
