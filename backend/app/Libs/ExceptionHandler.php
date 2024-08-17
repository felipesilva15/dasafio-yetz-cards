<?php

namespace App\Exceptions;

use App\Data\System\ApiErrorDTO;
use Illuminate\Foundation\Exceptions\Handler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class ExceptionHandler extends Handler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e) {
        if ($e instanceof HttpException) {
            $error = [
                "code" =>"EXCPHAND001", 
                "message" => $e->getMessage(), 
                "endpoint" => $request->path()
            ];

            return response()->json($error, $e->getStatusCode());
        }

        return parent::render($request, $e);
    }
}
