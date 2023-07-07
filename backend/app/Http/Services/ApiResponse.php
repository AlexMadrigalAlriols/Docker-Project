<?php


namespace App\Http\Services;

use Illuminate\Http\Response;

class ApiResponse
{
    public static function ok($message = "", $data = null) {
        $response = ["success" => true, "message" => $message];

        if($data) {
            $response["data"] = $data;
        }

        return response()->json($response, Response::HTTP_OK);
    }

    public static function bad($message = "") {
        return response()->json([
            "success" => false,
            "message" => trans($message)
        ], Response::HTTP_BAD_REQUEST);
    }
}