<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FuncionEstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function registrar()
    {
        return Inertia::render('Estudiante/RegistrarMatricula');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function ver()
    {
        return Inertia::render('Estudiante/VerMatriculas');
    }

}
