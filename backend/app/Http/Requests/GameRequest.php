<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GameRequest extends FormRequest
{
    public function rules(): array {
        return [
            'date' => 'required|date',
            'players_per_team' => 'required|int|min:1'
        ];
    }
}
