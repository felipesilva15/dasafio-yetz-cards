<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlayerRequest extends FormRequest
{
    public function rules(): array {
        return [
            'name' => 'required|string|max:80',
            'level' => 'required|int|min:1|max:5',
            'goalkeeper' => 'required|boolean'
        ];
    }
}
