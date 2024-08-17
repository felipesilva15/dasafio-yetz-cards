<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GamePlayerRequest extends FormRequest
{
    public function rules(): array {
        return [
            'game_id' => 'nullable|int|exists:games,id',
            'player_id' => 'nullable|int|exists:players,id',
            'team_id' => 'nullable|int|exists:teams,id',
            'confirmed' => 'required|boolean'
        ];
    }
}
