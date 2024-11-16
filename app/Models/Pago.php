<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    /** @use HasFactory<\Database\Factories\PagoFactory> */
    use HasFactory;
    protected $fillable=[
        'fecha',
        'nroComprobante',
        'monto',
        'medioPago',
        'imgComprobante',
        'matricula_id',
    ];
    public function matricula()
    {
        return $this->belongsTo(Matricula::class);
    }
}
