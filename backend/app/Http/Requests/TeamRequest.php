<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeamRequest extends FormRequest
{
    public function rules(): array {
        return [
            'name' => 'required|string|max:40',
            'game_id' => 'required|int|exists:games,id'
        ];
    }
}
