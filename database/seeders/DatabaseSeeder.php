<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            VendorCategorySeeder::class,
        ]);

        // Create sample users
        User::factory()->create([
            'name' => 'Test Couple',
            'email' => 'couple@example.com',
            'role' => 'couple',
        ]);

        User::factory()->create([
            'name' => 'Test Vendor',
            'email' => 'vendor@example.com',
            'role' => 'vendor',
        ]);
    }
}
