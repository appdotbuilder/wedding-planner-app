<?php

namespace Tests\Feature;

use App\Models\Service;
use App\Models\User;
use App\Models\VendorCategory;
use App\Models\VendorProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class WeddingApplicationTest extends TestCase
{
    use RefreshDatabase;

    public function test_welcome_page_displays_vendor_categories(): void
    {
        // Create some vendor categories
        VendorCategory::factory(3)->create();

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->has('categories', 3)
        );
    }

    public function test_vendor_category_page_displays_vendors(): void
    {
        $category = VendorCategory::factory()->create(['slug' => 'photographers']);
        $vendor = User::factory()->create(['role' => 'vendor']);
        VendorProfile::factory()->create([
            'user_id' => $vendor->id,
            'vendor_category_id' => $category->id,
        ]);

        $response = $this->get("/categories/{$category->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('vendors/category')
                ->where('category.id', $category->id)
                ->has('vendors.data', 1)
        );
    }

    public function test_vendor_profile_page_displays_vendor_details(): void
    {
        $vendor = User::factory()->create(['role' => 'vendor']);
        $category = VendorCategory::factory()->create();
        $profile = VendorProfile::factory()->create([
            'user_id' => $vendor->id,
            'vendor_category_id' => $category->id,
        ]);
        
        // Create a service for the vendor
        Service::factory()->create(['vendor_profile_id' => $profile->id]);

        $response = $this->get("/vendors/{$profile->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('vendors/show')
                ->where('vendor.id', $profile->id)
        );
    }

    public function test_couples_can_access_reservation_pages(): void
    {
        $couple = User::factory()->create(['role' => 'couple']);
        $vendor = User::factory()->create(['role' => 'vendor']);
        $category = VendorCategory::factory()->create();
        $profile = VendorProfile::factory()->create([
            'user_id' => $vendor->id,
            'vendor_category_id' => $category->id,
        ]);

        $response = $this->actingAs($couple)->get('/reservations');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('reservations/index')
        );
    }

    public function test_vendors_can_access_reservation_management(): void
    {
        $vendor = User::factory()->create(['role' => 'vendor']);
        VendorProfile::factory()->create(['user_id' => $vendor->id]);

        $response = $this->actingAs($vendor)->get('/reservations');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('reservations/index')
        );
    }
}