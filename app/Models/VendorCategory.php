<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\VendorCategory
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string|null $icon
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\VendorProfile> $vendor_profiles
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VendorCategory active()
 * @method static \Database\Factories\VendorCategoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class VendorCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Scope a query to only include active categories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the vendor profiles for this category.
     */
    public function vendorProfiles(): HasMany
    {
        return $this->hasMany(VendorProfile::class);
    }
}