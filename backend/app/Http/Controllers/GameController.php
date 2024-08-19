<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundHttpException;
use App\Exceptions\ValidationException;
use App\Http\Requests\GamePlayerRequest;
use App\Http\Resources\GamePlayerResource;
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

    public function teams(int $id) {
        $game = Game::find($id);

        if (!$game) {
            throw new NotFoundHttpException();
        }
        
        return response()->json($game->teams, 200);
    }

    public function players(int $id) {
        $game = Game::find($id);

        if (!$game) {
            throw new NotFoundHttpException();
        }
        
        return response()->json(GamePlayerResource::collection($game->players), 200);
    }

    public function storePlayer(Game $game, Player $player, GamePlayerRequest $request) {
        $requestData = $request->validated();

        $gamePlayer = Game::find($game->id)
                            ->players()
                            ->where('player_id', $player->id)
                            ->first();

        if ($gamePlayer) {
            throw new ValidationException('Este jogador já está cadastrado neste jogo.');
        }

        $game->players()->attach($player->id, $requestData);

        $data = Game::find($game->id)
                    ->players()
                    ->where('player_id', $player->id)
                    ->first();

        $data = new GamePlayerResource($data);

        return response()->json($data, 200);
    }

    public function destroyPlayer(Game $game, Player $player) {
        $game->players()->detach([$player->id]);

        return response()->noContent();
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
