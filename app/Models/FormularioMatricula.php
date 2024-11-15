<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormularioMatricula extends Model
{
    /** @use HasFactory<\Database\Factories\FormularioMatriculaFactory> */
    use HasFactory;
    protected $fillable = [
        'fecha',
        'cicloIngles',
        'horarioIngles',
        'fechaPago',
        'nroComprobante',
        'monto',
        'medioPago',
        'imgComprobante',
    ];
}
