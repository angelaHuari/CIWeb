<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormularioMatricula extends Model
{
    /** @use HasFactory<\Database\Factories\FormularioMatriculaFactory> */
    use HasFactory;
   
    protected $fillable = [
        'estudiante_id',
        'fechaMatricula',
        'cicloIngles',
        'horarioIngles',
        'medioPago',
        'fechaPago',
        'montoPago',
        'nroComprobante',
        'imgComprobante',
    ];
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class);
    }
}
