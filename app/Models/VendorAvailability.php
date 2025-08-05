<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\VendorAvailability
 *
 * @property int $id
 * @property int $vendor_profile_id
 * @property \Illuminate\Support\Carbon $date
 * @property string $start_time
 * @property string $end_time
 * @property bool $is_available
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\VendorProfile $vendorProfile
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability query()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability whereIsAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability whereVendorProfileId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorAvailability available()

 * 
 * @mixin \Eloquent
 */
class VendorAvailability extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'vendor_profile_id',
        'date',
        'start_time',
        'end_time',
        'is_available',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'is_available' => 'boolean',
    ];

    /**
     * Scope a query to only include available slots.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true);
    }

    /**
     * Get the vendor profile that owns this availability.
     */
    public function vendorProfile(): BelongsTo
    {
        return $this->belongsTo(VendorProfile::class);
    }
}