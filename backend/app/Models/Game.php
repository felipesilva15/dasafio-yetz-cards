<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'players_per_team'
    ];

    protected $with = ['players'];

    public function players(): BelongsToMany {
        return $this->belongsToMany(Player::class, 'game_player')
                    ->using(GamePlayer::class)
                    ->withPivot('team_id', 'confirmed');
    }

    public function teams(): HasMany {
        return $this->hasMany(Team::class);
    }
}
