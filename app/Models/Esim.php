<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Esim extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'order_item_id',
        'user_id',
        'iccid',
        'activation_code',
        'qr_code_data',
        'qr_code_path',
        'status',
        'provider_reference',
        'activated_at',
        'expires_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'activated_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    /**
     * Get the order item that owns the eSIM.
     */
    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class);
    }

    /**
     * Get the user that owns the eSIM.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
