<?php

namespace App\Http\Controllers;

use App\Models\Game;

class GameController extends Controller
{
    public function __construct(Game $model) {
        $this->model = $model;
    }
}
