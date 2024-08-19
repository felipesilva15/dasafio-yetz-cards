<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

// Games
Route::apiResource('/games', GameController::class);
Route::get('/games/{game}/teams', [GameController::class, 'teams']);
Route::get('/games/{game}/players', [GameController::class, 'players']);
Route::post('/games/{game}/player/{player}', [GameController::class, 'storePlayer']);
Route::delete('/games/{game}/player/{player}', [GameController::class, 'destroyPlayer']);
Route::patch('/games/{game}/player/{player}', [GameController::class, 'setPlayerConfirmed']);
Route::patch('/games/{game}/draw-teams', [GameController::class, 'drawTeams']);

// Players
Route::apiResource('/players', PlayerController::class);

// Teams
Route::apiResource('/teams', TeamController::class);