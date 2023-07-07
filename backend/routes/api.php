<?php

use App\Http\Controllers\Api\BookingController;
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
    Route::post('login', [UserController::class, 'login'])->name('users.login');

    Route::middleware('auth:sanctum')->group(function () {
        // User Logout
        Route::post('logout', [UserController::class, 'logout'])->name('users.logout');

        //Booking
        Route::post('booking/list', [BookingController::class, 'index'])->name('booking.index');
        Route::apiResource('booking', BookingController::class)->except('index');

        // Status
        Route::post('status/list', [StatusController::class, 'index'])->name('status.index');
        Route::apiResource('status', StatusController::class)->except('index');

        // Users
        Route::post('users/list', [UserController::class, 'index'])->name('users.index');
        Route::apiResource('users', UserController::class)->except('index');
    });
});