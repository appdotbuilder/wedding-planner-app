<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Models\Reservation;
use App\Models\Service;
use App\Models\VendorProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    /**
     * Display a listing of the user's reservations.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if ($user->isCouple()) {
            $reservations = $user->coupleReservations()
                ->with(['vendorProfile.category', 'vendorProfile.user', 'service'])
                ->latest()
                ->paginate(10);
        } else {
            $reservations = Reservation::whereHas('vendorProfile', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->with(['couple', 'service'])
                ->latest()
                ->paginate(10);
        }

        return Inertia::render('reservations/index', [
            'reservations' => $reservations,
        ]);
    }

    /**
     * Show the form for creating a new reservation.
     */
    public function create(Request $request, VendorProfile $vendor, Service $service)
    {
        $vendor->load(['category', 'user']);
        
        return Inertia::render('reservations/create', [
            'vendor' => $vendor,
            'service' => $service,
        ]);
    }

    /**
     * Store a newly created reservation.
     */
    public function store(StoreReservationRequest $request)
    {
        $reservation = Reservation::create([
            'couple_id' => $request->user()->id,
            'vendor_profile_id' => $request->vendor_profile_id,
            'service_id' => $request->service_id,
            'event_date' => $request->event_date,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'total_price' => $request->total_price,
            'notes' => $request->notes,
        ]);

        return redirect()->route('reservations.show', $reservation)
            ->with('success', 'Reservation request submitted successfully!');
    }

    /**
     * Display the specified reservation.
     */
    public function show(Reservation $reservation)
    {
        $reservation->load([
            'vendorProfile.category',
            'vendorProfile.user',
            'service',
            'couple',
            'review'
        ]);

        return Inertia::render('reservations/show', [
            'reservation' => $reservation,
        ]);
    }

    /**
     * Update the reservation status (for vendors).
     */
    public function update(Request $request, Reservation $reservation)
    {
        $request->validate([
            'status' => 'required|in:confirmed,rejected',
            'vendor_notes' => 'nullable|string|max:1000',
        ]);

        $reservation->update([
            'status' => $request->status,
            'vendor_notes' => $request->vendor_notes,
            'confirmed_at' => $request->status === 'confirmed' ? now() : null,
        ]);

        return redirect()->back()
            ->with('success', 'Reservation status updated successfully!');
    }
}