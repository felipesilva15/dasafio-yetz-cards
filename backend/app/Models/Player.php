<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Player extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'level',
        'goalkeeper'
    ];

    protected $casts = [
        'goalkeeper' => 'boolean'
    ];

    public function games(): BelongsToMany {
        return $this->belongsToMany(Game::class)->using(GamePlayer::class);
    }
}
