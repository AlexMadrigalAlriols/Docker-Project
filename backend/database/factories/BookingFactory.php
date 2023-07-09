<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = DB::table('users')->pluck('id');
        $statuses = DB::table('users')->pluck('id');
        $properties = DB::table('properties')->pluck('id');

        return [
            'user_id' => fake()->randomElement($users),
            'status_id' => fake()->randomElement($statuses),
            'property_id' => fake()->randomElement($properties),
            'description' => fake()->sentence(),
            'booked_users' => fake()->numberBetween(1, 6)
        ];
    }
}
