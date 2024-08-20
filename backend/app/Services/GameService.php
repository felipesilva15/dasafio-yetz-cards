<?php

namespace App\Services;

use App\Exceptions\ValidationException;
use App\Models\Game;

class GameService
{
    public function drawTeams(Game $game): void {
        $this->validateGameForDraw($game);

        $players = $game->players()->wherePivot('confirmed', true)->get();

        $normalPlayers = collect($players
                        ->where('goalkeeper', false)
                        ->shuffle()
                        ->all());

        $goalkeepers = collect($players
                        ->where('goalkeeper', true)
                        ->shuffle()
                        ->all());

        $teams = [];

        foreach ($game->teams as $team) {
            $teams[$team->id] = [];
        }

        // Define os goleiros de cada time
        foreach ($game->teams as $team) {
            if (count($goalkeepers) == 0) {
                break;
            }

            if (count($teams[$team->id]) == 0) {
                array_push($teams[$team->id], $goalkeepers->shift());
            }
        }

        foreach ($game->teams as $team) {
            while (count($normalPlayers) != 0 && count($teams[$team->id]) < $game->players_per_team) {
                array_push($teams[$team->id], $normalPlayers->shift());
            }
        }

        // Atualiza o time como nulo para jogadores que não couberem em nenhum time
        foreach ($normalPlayers as $player) {
            $player->pivot->update(['team_id' => null]);
        }

        // Atualiza o time como nulo para goleiros que não couberem em nenhum time
        foreach ($goalkeepers as $goalkeeper) {
            $goalkeeper->pivot->update(['team_id' => null]);
        }

        foreach ($teams as $team_id => $players) {
            foreach($players as $player) {
                $player->pivot->update(['team_id' => $team_id]);
            }
        }
    }

    private function validateGameForDraw(Game $game): void {
        $total_players_confirmed = $game->players()
                                    ->wherePivot('confirmed', true)
                                    ->get()
                                    ->count();

        $minimum_players = $game->players_per_team * 2;

        if ($game->teams->count() < 2) {
            throw new ValidationException("Para sortear os times é necessário que tenha pelo menos 2 times cadastrados.");
        }

        if ($total_players_confirmed < $minimum_players) {
            throw new ValidationException("Para sortear os times é necessário que tenha pelo menos {$minimum_players} jogadores confirmados. Apenas {$total_players_confirmed} jogadores confirmaram.");
        }
    }
}
