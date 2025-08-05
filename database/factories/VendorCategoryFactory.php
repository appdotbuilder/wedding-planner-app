<?php

namespace Database\Factories;

use App\Models\VendorCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VendorCategory>
 */
class VendorCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'slug' => fake()->slug(),
            'description' => fake()->sentence(),
            'icon' => fake()->randomElement(['📷', '🍽️', '🏛️', '🌸', '🎁', '🎵']),
            'is_active' => true,
        ];
    }
}