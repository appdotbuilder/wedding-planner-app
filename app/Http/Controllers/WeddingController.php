<?php

namespace App\Http\Controllers;

use App\Models\VendorCategory;
use App\Models\VendorProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeddingController extends Controller
{
    /**
     * Display the main wedding planning dashboard.
     */
    public function index()
    {
        $categories = VendorCategory::active()
            ->withCount('vendorProfiles')
            ->orderBy('name')
            ->get();

        $featuredVendors = VendorProfile::with(['category', 'user'])
            ->active()
            ->where('average_rating', '>=', 4.0)
            ->orderBy('average_rating', 'desc')
            ->take(6)
            ->get();

        return Inertia::render('welcome', [
            'categories' => $categories,
            'featuredVendors' => $featuredVendors,
        ]);
    }

    /**
     * Display vendors by category.
     */
    public function show(VendorCategory $category)
    {
        $vendors = VendorProfile::with(['category', 'user', 'services'])
            ->where('vendor_category_id', $category->id)
            ->active()
            ->orderBy('average_rating', 'desc')
            ->paginate(12);

        return Inertia::render('vendors/category', [
            'category' => $category,
            'vendors' => $vendors,
        ]);
    }
}