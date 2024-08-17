<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\PlayerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Games
Route::apiResource('/games', GameController::class);

// Players
Route::apiResource('/players', PlayerController::class);