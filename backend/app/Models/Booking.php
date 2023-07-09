<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'status_id',
        'property_id',
        'description',
        'booked_users',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    /**
     * Get the status of the booking
     *
     * @return \Illuminate\Commercialbase\Eloquent\Relations\BelongsTo
     */
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    /**
     * Get the user of the booking
     *
     * @return \Illuminate\Commercialbase\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the property of the booking
     *
     * @return \Illuminate\Commercialbase\Eloquent\Relations\BelongsTo
     */
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
