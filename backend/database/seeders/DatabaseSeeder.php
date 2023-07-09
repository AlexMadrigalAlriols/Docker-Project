<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory()->create(
            [
                'name' => 'Admin',
                'email' => 'admin@admin.com'
            ]
        );

        \App\Models\Status::factory(10)->create();
        \App\Models\Property::factory(10)->create();
        \App\Models\Booking::factory(20)->create();
    }
}
