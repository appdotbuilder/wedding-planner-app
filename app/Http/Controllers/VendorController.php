<?php

namespace App\Http\Controllers;

use App\Models\VendorProfile;
use App\Models\VendorAvailability;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    /**
     * Display the specified vendor profile.
     */
    public function show(VendorProfile $vendor)
    {
        $vendor->load([
            'category',
            'user',
            'services' => function ($query) {
                $query->available();
            },
            'reviews' => function ($query) {
                $query->with('couple')->latest()->take(10);
            }
        ]);

        // Get availability for the next 30 days
        $availability = [];

        return Inertia::render('vendors/show', [
            'vendor' => $vendor,
            'availability' => $availability,
        ]);
    }


}