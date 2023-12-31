<?php

namespace App\Http\Requests\Bookings;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'booked_users' => 'required|numeric|min:1',
            'description' => 'nullable|string',
            'property_id' => 'required|exists:properties,id',
            'user_id' => 'required|exists:users,id',
            'status_id' => 'nullable|exists:statuses,id',
        ];
    }
}