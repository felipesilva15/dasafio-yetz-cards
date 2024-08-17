<?php

namespace App\Http\Controllers;

use App\Models\Player;

class PlayerController extends Controller
{
    public function __construct(Player $model) {
        $this->model = $model;
    }
}
