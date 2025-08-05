<?php

namespace Database\Factories;

use App\Models\Service;
use App\Models\VendorProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vendor_profile_id' => VendorProfile::factory(),
            'name' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 100, 5000),
            'price_type' => fake()->randomElement(['fixed', 'per_hour', 'per_day', 'per_guest', 'custom']),
            'duration_hours' => fake()->optional()->numberBetween(1, 12),
            'is_available' => true,
        ];
    }
}