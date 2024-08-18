<?php

namespace App\Http\Controllers;

use App\Http\Requests\GamePlayerRequest;
use App\Models\Game;
use App\Models\GamePlayer;
use App\Models\Player;
use App\Services\GameService;

class GameController extends Controller
{
    private $service;

    public function __construct(Game $model, GameService $service) {
        $this->model = $model;
        $this->service = $service;
    }

    public function storePlayer(Game $game, Player $player, GamePlayerRequest $request) {
        $requestData = $request->validated();
        $data = $game->players()->attach($player->id, $requestData);

        return response()->json($data, 200);
    }

    public function setPlayerConfirmed(Game $game, Player $player, GamePlayerRequest $request) {
        $requestData = $request->validated();

        $gamePlayer = GamePlayer::where('player_id', $player->id)->where('game_id', $game->id)->get();
        $gamePlayer = $gamePlayer[0];

        $gamePlayer->update([
            'confirmed' => $requestData['confirmed']
        ]);

        return response()->json($gamePlayer, 200);
    }

    public function drawTeams(Game $game) {
        $this->service->drawTeams($game);

        return response()->json(['message' => 'Sorteio realizado!'], 200);
    }
}
