<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Reservation
 *
 * @property int $id
 * @property int $couple_id
 * @property int $vendor_profile_id
 * @property int $service_id
 * @property \Illuminate\Support\Carbon $event_date
 * @property string $start_time
 * @property string $end_time
 * @property string $status
 * @property float $total_price
 * @property string|null $notes
 * @property string|null $vendor_notes
 * @property \Illuminate\Support\Carbon|null $confirmed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $couple
 * @property-read \App\Models\VendorProfile $vendorProfile
 * @property-read \App\Models\Service $service
 * @property-read \App\Models\Review|null $review
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereConfirmedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereCoupleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereEventDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereServiceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereTotalPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereVendorNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation whereVendorProfileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation confirmed()
 * @method static \Illuminate\Database\Eloquent\Builder|Reservation completed()

 * 
 * @mixin \Eloquent
 */
class Reservation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'couple_id',
        'vendor_profile_id',
        'service_id',
        'event_date',
        'start_time',
        'end_time',
        'status',
        'total_price',
        'notes',
        'vendor_notes',
        'confirmed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'event_date' => 'date',
        'total_price' => 'decimal:2',
        'confirmed_at' => 'datetime',
    ];

    /**
     * Scope a query to only include pending reservations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include confirmed reservations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    /**
     * Scope a query to only include completed reservations.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Get the couple that made this reservation.
     */
    public function couple(): BelongsTo
    {
        return $this->belongsTo(User::class, 'couple_id');
    }

    /**
     * Get the vendor profile for this reservation.
     */
    public function vendorProfile(): BelongsTo
    {
        return $this->belongsTo(VendorProfile::class);
    }

    /**
     * Get the service for this reservation.
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Get the review for this reservation.
     */
    public function review(): HasOne
    {
        return $this->hasOne(Review::class);
    }
}