<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GamePlayerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'game_id' => $this->pivot->game_id,
            'player' => [
                'id' => $this->id,
                'name' => $this->name,
                'level' => $this->level,
                'goalkeeper' => $this->goalkeeper
            ],
            'team' => $this->pivot->team,
            'confirmed' => $this->pivot->confirmed,
            'created_at' => $this->pivot->created_at,
            'updated_at' => $this->pivot->updated_at,
        ];
    }
}
