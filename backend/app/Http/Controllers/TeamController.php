<?php

namespace App\Http\Controllers;

use App\Models\Team;

class TeamController extends Controller
{
    public function __construct(Team $model) {
        $this->model = $model;
    }
}
