<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    /** @use HasFactory<\Database\Factories\GrupoFactory> */
    use HasFactory;
    protected $fillable = [
        'periodo',
        'modalidad',
        'nroEstudiantes',
        'nroVacantes',
        'horario',
        'docente_id',
        'ciclo_id',
    ];
    public function docente()
    {
        return $this->belongsTo(Docente::class);
    }
    public function ciclo()
    {
        return $this->belongsTo(Ciclo::class);
    }
    public function estudiantes()
    {
        return $this->belongsToMany(Estudiante::class, 'matriculas', 'grupo_id', 'estudiante_id');
    }
    public function matriculas()
    {
        return $this->hasMany(Matricula::class, 'grupo_id');
    }
}
