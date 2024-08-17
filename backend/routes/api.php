<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Games
Route::apiResource('/games', GameController::class);

// Players
Route::apiResource('/players', PlayerController::class);

// Teams
Route::apiResource('/teams', TeamController::class);