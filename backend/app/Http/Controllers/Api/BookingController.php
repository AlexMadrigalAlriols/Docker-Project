<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Bookings\IndexRequest;
use App\Http\Requests\Bookings\StoreRequest;
use App\Http\Requests\Bookings\UpdateRequest;
use App\Http\Services\ApiResponse;
use App\Models\Booking;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        $request = $request->validated();

        if(isset($request['user_id'])) {
            $models = Booking::where('user_id', $request['user_id'])->get();
        } else {
            $models = Booking::get();
        }

        return ApiResponse::ok("Data Found", $models);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        if($booking = Booking::create($request->validated())) {
            return ApiResponse::ok("Resource Created", $booking);
        }

        return ApiResponse::bad("Error On Create Resource");
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return ApiResponse::ok("Data Found", $booking);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Booking $booking)
    {
        $booking->fill($request->validated());

        if($booking->save()) {
            return ApiResponse::ok("Success Save");
        }

        return ApiResponse::bad("Error On Save Resource");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        if($booking->delete()) {
            return ApiResponse::ok("Success Deleted");
        }

        return ApiResponse::bad("Error On Delete Resource");
    }
}
