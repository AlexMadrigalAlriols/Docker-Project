<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Status\StoreRequest;
use App\Http\Requests\Status\UpdateRequest;
use App\Http\Services\ApiResponse;
use App\Models\Status;

class StatusController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $models = Status::get();

        return ApiResponse::ok("Data Found", $models);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        if($status = Status::create($request->validated())) {
            return ApiResponse::ok("Resource Created", $status);
        }

        return ApiResponse::bad("Error On Create Resource");
    }

    /**
     * Display the specified resource.
     */
    public function show(Status $status)
    {
        return ApiResponse::ok("Data Found", $status);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Status $status)
    {
        $status->fill($request->validated());

        if($status->save()) {
            return ApiResponse::ok("Success Save");
        }

        return ApiResponse::bad("Error On Save Resource");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Status $status)
    {
        if($status->delete()) {
            return ApiResponse::ok("Success Deleted");
        }

        return ApiResponse::bad("Error On Delete Resource");
    }
}
