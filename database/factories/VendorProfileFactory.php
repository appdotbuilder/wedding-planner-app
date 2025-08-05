<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\VendorCategory;
use App\Models\VendorProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VendorProfile>
 */
class VendorProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'vendor_category_id' => VendorCategory::factory(),
            'business_name' => fake()->company(),
            'description' => fake()->paragraphs(3, true),
            'website' => fake()->optional()->url(),
            'average_rating' => fake()->randomFloat(2, 3.0, 5.0),
            'total_reviews' => fake()->numberBetween(0, 100),
            'is_verified' => fake()->boolean(70),
            'is_active' => true,
        ];
    }
}