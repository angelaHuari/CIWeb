<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    /** @use HasFactory<\Database\Factories\MatriculaFactory> */
    use HasFactory;

    protected $table = 'matriculas';
    
    protected $fillable = [
        'fecha',
        'nota',
        'estudiante_id',
        'grupo_id',
    ];

    protected $casts = [
        'nota' => 'float',
    ];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class);
    }
    public function grupo()
    {
        return $this->belongsTo(Grupo::class);
    }
    
}
