<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Public Registration (always registers as user)
    public function register(Request $request)
    {
        // Custom email exist check
        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'This email is already registered! Please log in.',
            ], 409); // 409 Conflict
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'user',
        ]);

        // Sanctum token generate
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registration successful!',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    // Admin: Create a user (can specify role)
    public function createUser(Request $request)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json(['error' => 'Forbidden: Admins only'], 403);
        }

        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'message' => 'This email is already registered!'
            ], 409);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|in:user,admin',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
        ]);

        return response()->json([
            'message' => 'User created successfully!',
            'user' => $user,
        ], 201);
    }

    // Get current authenticated user
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    // User Login
    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Always issue a fresh token (remove any previous with same name)
        $user->tokens()->where('name', 'auth_token')->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful!',
            'user' => $user,
            'token' => $token,
        ]);
    }

    // User Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully!']);
    }
}