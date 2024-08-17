<?php

namespace App\Http\Controllers;

use App\Http\Requests\GamePlayerRequest;
use App\Models\Game;
use App\Models\Player;

class GameController extends Controller
{
    public function __construct(Game $model) {
        $this->model = $model;
    }

    public function storePlayer(Game $game, Player $player, GamePlayerRequest $request) {
        $requestData = $request->validated();
        $data = $game->players()->attach($player->id, $requestData);

        return response()->json($data, 200);
    }
}
