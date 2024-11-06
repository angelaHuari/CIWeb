<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    /** @use HasFactory<\Database\Factories\GrupoFactory> */
    use HasFactory;

    protected $fillable = [
        'modalidad',
        'nroEstudiantes',
        'horario',
        'id_Ciclo',
        'id_Docente',
    ];

    public function ciclo()
    {
        return $this->belongsTo(Ciclo::class, 'id_Ciclo');
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class, 'id_Docente');
    }
}
