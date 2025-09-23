<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:4173', // vite preview default
            'http://127.0.0.1:5173',
            'http://127.0.0.1:4173',
        ];

        $origin = $request->headers->get('Origin');
        $allowedOrigin = in_array($origin, $allowedOrigins, true) ? $origin : $allowedOrigins[0];

        // OPTIONS preflight request হলে শুধু headers return করবো
        if ($request->getMethod() === "OPTIONS") {
            $requestedHeaders = $request->headers->get('Access-Control-Request-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
            return response()
                ->json('OK', 200)
                ->header('Access-Control-Allow-Origin', $allowedOrigin)
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', $requestedHeaders)
                ->header('Access-Control-Allow-Credentials', 'true')
                ->header('Vary', 'Origin');
        }

        $response = $next($request);

        // normal request এর জন্য headers set
        $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Vary', 'Origin');

        return $response;
    }
}
