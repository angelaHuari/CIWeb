<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificado extends Model
{
    protected $fillable=[
        'nombre',
        'codigo',
        'estudiante_id',
    ];
    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class);
    }
}
