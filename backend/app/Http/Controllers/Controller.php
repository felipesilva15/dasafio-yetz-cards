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
        $requestData = $this->validateRequest($request);
        
        $data = $this->model::create($requestData);

        return response()->json($data, 201);
    }

    public function update(Request $request, $id) {
        $data = $this->model::find($id);

        if (!$data) {
            throw new NotFoundHttpException();
        }

        $requestData = $this->validateRequest($request);
            
        $data->update($requestData);

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

    protected function validateRequest(Request $request): mixed {
        $formRequestClass = $this->getFormRequestClass();

        if (class_exists($formRequestClass)) {
            $formRequest = app($formRequestClass);
            $data = $formRequest->validated();
        } else {
            $data = $request->all();
        }

        return $data;
    }

    protected function getFormRequestClass(): string {
        $modelClass = class_basename($this->model);
        $requestClass = "App\\Http\\Requests\\{$modelClass}Request";

        return $requestClass;
    }
}
