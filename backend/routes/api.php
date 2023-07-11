<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\StatusController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'v1', 'as' => 'api.'], function() {
    // Login Route
    Route::post('login', [UserController::class, 'login'])->name('users.login');

    // Routes protected with token
    Route::middleware('auth:sanctum')->group(function () {
        // User Logout
        Route::post('logout', [UserController::class, 'logout'])->name('users.logout');

        // Booking Routes
        Route::post('booking/list', [BookingController::class, 'index'])->name('booking.index');
        Route::apiResource('booking', BookingController::class)->except('index');

        // Properites Routes
        Route::post('properties/list', [PropertyController::class, 'index'])->name('property.index');
        Route::apiResource('properties', PropertyController::class)->except('index');

        // Status Routes
        Route::post('status/list', [StatusController::class, 'index'])->name('status.index');
        Route::apiResource('status', StatusController::class)->except('index');

        // Users Routes
        Route::post('users/list', [UserController::class, 'index'])->name('users.index');
        Route::apiResource('users', UserController::class)->except('index');
    });
});