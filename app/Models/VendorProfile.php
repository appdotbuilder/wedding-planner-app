<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\VendorProfile
 *
 * @property int $id
 * @property int $user_id
 * @property int $vendor_category_id
 * @property string $business_name
 * @property string $description
 * @property string|null $website
 * @property array|null $images
 * @property float $average_rating
 * @property int $total_reviews
 * @property bool $is_verified
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\VendorCategory $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Service> $services
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\VendorAvailability> $availability
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Reservation> $reservations
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Review> $reviews
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereAverageRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereBusinessName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereIsVerified($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereTotalReviews($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereVendorCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile whereWebsite($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile active()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorProfile verified()
 * @method static \Database\Factories\VendorProfileFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class VendorProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'vendor_category_id',
        'business_name',
        'description',
        'website',
        'images',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'images' => 'array',
        'average_rating' => 'decimal:2',
        'is_verified' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Scope a query to only include active profiles.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include verified profiles.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    /**
     * Get the user that owns this vendor profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the category this vendor belongs to.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(VendorCategory::class, 'vendor_category_id');
    }

    /**
     * Get the services for this vendor.
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    /**
     * Get the availability for this vendor.
     */
    public function availability(): HasMany
    {
        return $this->hasMany(VendorAvailability::class);
    }

    /**
     * Get the reservations for this vendor.
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Get the reviews for this vendor.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }
}