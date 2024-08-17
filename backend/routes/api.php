<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

// Games
Route::apiResource('/games', GameController::class);
Route::post('/games/{game}/player/{player}', [GameController::class, 'storePlayer']);
Route::patch('/games/{game}/player/{player}', [GameController::class, 'setPlayerConfirmed']);

// Players
Route::apiResource('/players', PlayerController::class);

// Teams
Route::apiResource('/teams', TeamController::class);