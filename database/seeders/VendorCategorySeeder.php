<?php

namespace Database\Seeders;

use App\Models\VendorCategory;
use Illuminate\Database\Seeder;

class VendorCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Photographers',
                'slug' => 'photographers',
                'description' => 'Professional wedding photographers to capture your special moments',
                'icon' => '📷',
            ],
            [
                'name' => 'Caterers',
                'slug' => 'caterers',
                'description' => 'Delicious catering services for your wedding reception and events',
                'icon' => '🍽️',
            ],
            [
                'name' => 'Venues',
                'slug' => 'venues',
                'description' => 'Beautiful wedding venues for your ceremony and reception',
                'icon' => '🏛️',
            ],
            [
                'name' => 'Florists',
                'slug' => 'florists',
                'description' => 'Stunning floral arrangements and decorations for your wedding',
                'icon' => '🌸',
            ],
            [
                'name' => 'Gift Shops',
                'slug' => 'gift-shops',
                'description' => 'Unique wedding gifts and favors for your guests',
                'icon' => '🎁',
            ],
            [
                'name' => 'Musicians',
                'slug' => 'musicians',
                'description' => 'Live music and entertainment for your wedding celebration',
                'icon' => '🎵',
            ],
            [
                'name' => 'Wedding Planners',
                'slug' => 'wedding-planners',
                'description' => 'Professional wedding planning and coordination services',
                'icon' => '📋',
            ],
            [
                'name' => 'Transportation',
                'slug' => 'transportation',
                'description' => 'Luxury transportation services for your wedding day',
                'icon' => '🚗',
            ],
        ];

        foreach ($categories as $category) {
            VendorCategory::create($category);
        }
    }
}