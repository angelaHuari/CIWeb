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
        'apellidos',
        'dni',
        'sexo',
        'celular',
        'fechaNacimiento',
        'afiliacion',
        'programadeEstudios',
        'semestre',
        'correoInstitucional',
        'institucionProveniente',
        'medioPublicitario',
        'ciclo',
        'horario',
        'tienecertificadoIngles',
        'infoCertificado',
        'fechaCertificado',
        'medioDePago',
        'fechaDePago',
        'montoDePago',
        'nroComprobante',
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
