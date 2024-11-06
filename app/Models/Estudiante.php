<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    /** @use HasFactory<\Database\Factories\EstudianteFactory> */
    use HasFactory;
    protected $fillable=[
        'nombres',
        'aPaterno',
        'aMaterno',
        'dni',
        'sexo',
        'celular',
        'email',
        'emailInstitucional',
        'programaEstudios',
    ];
}
