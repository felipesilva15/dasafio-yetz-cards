<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundHttpException;
use Illuminate\Http\Request;

abstract class Controller
{
    protected $model;

    public function index() {
        $query = $this->model::query();
        $query->orderBy('id', 'desc');

        $data = $query->get();

        return response()->json($data, 200);
    }

    public function show($id) {
        $data = $this->model::find($id);
        
        return response()->json($data, 200);
    }

    public function store(Request $request) {
        if (method_exists($this->model, 'rules')){
            $request->validate($this->model::rules());
        }
        
        $data = $this->model::create($request->all());

        return response()->json($data, 201);
    }

    public function update(Request $request, $id) {
        $data = $this->model::find($id);

        if (!$data) {
            throw new NotFoundHttpException();
        }

        if (method_exists($this->model, 'rules')){
            $request->validate($this->model::rules());
        }
            
        $data->update($request->all());

        return response()->json($data, 200);
    }

    public function destroy($id) {
        $data = $this->model::find($id);

        if (!$data) {
            throw new NotFoundHttpException;
        }

        $data->delete();

        return response()->json(['message' => 'Registro deletado com sucesso!'], 200);
    }
}
