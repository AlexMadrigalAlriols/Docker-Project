<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color',
        'text-color',
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];
}
