<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formulario extends Model
{
    /** @use HasFactory<\Database\Factories\FormularioFactory> */
    use HasFactory;
     // Campos que pueden ser asignados en masa
     protected $fillable = [
        'email',
        'nombres',
        'aPaterno',
        'aMaterno',
        'dni',
        'sexo',
        'celular',
        'fechaNacimiento',
        'tipoAlumno',
        'programadeEstudios',
        'semestre',
        'correoInstitucional',
        'institucionProviene',
        'medioPublicitario',
        'cicloIngles',
        'horarioIngles',
        'tienecertificadoIngles',
        'realizoInglesBasico',
        'realizoInglesIntermedio',
        'nroComprobante',
        'fechaPago',
        'montoPago',
        'medioPago',
        'imgComprobante',
    ];

    // Opcional: especifica que campos se deben convertir a un tipo específico
    protected $casts = [
        'fechaNacimiento' => 'date',
        'fechaCertificado' => 'date',
        'fechaDePago' => 'date',
        'montoDePago' => 'decimal:2', // dos decimales para monto de pago
    ];
}
