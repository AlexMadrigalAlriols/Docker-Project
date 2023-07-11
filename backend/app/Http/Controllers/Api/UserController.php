<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Users\AuthRequest;
use App\Http\Services\ApiResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $models = User::get();

        return ApiResponse::ok("Data Found", $models);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return ApiResponse::ok("Data Found", $user);
    }

    /**
     * Login user and get token
    */
    public function login(AuthRequest $request) {
        $credentials = $request->validated();

        if($credentials && Auth::attempt($credentials)) {
            return ApiResponse::ok("User Found", ["user_id" => Auth::id(), "token" => $request->user()->createToken($request->ip())->plainTextToken]);
        }

        return ApiResponse::bad("Error on login");
    }

    /**
     * Logout user and delete token
     */
    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        return ApiResponse::ok("Token Revoked");
    }
}
