<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\ApiResponse;
use App\Models\Property;
use App\Http\Requests\Properties\StoreRequest;
use App\Http\Requests\Properties\UpdateRequest;

class PropertyController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $models = Property::get();

        return ApiResponse::ok("Data Found", $models);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        if($property = Property::create($request->validated())) {
            return ApiResponse::ok("Resource Created", $property);
        }

        return ApiResponse::bad("Error On Create Resource");
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        return ApiResponse::ok("Data Found", $property);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Property $property)
    {
        // Fill the fields to update
        $property->fill($request->validated());

        if($property->save()) {
            return ApiResponse::ok("Success Save");
        }

        return ApiResponse::bad("Error On Save Resource");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        if($property->delete()) {
            return ApiResponse::ok("Success Deleted");
        }

        return ApiResponse::bad("Error On Delete Resource");
    }
}
