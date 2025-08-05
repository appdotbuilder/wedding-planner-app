<?php

use App\Http\Controllers\ReservationController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\WeddingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main wedding planning page
Route::get('/', [WeddingController::class, 'index'])->name('home');

// Vendor category pages
Route::get('/categories/{category:slug}', [WeddingController::class, 'show'])->name('categories.show');

// Vendor profile pages
Route::get('/vendors/{vendor}', [VendorController::class, 'show'])->name('vendors.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Reservation routes
    Route::resource('reservations', ReservationController::class)->except(['edit', 'destroy']);
    Route::get('/vendors/{vendor}/services/{service}/book', [ReservationController::class, 'create'])->name('reservations.book');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
