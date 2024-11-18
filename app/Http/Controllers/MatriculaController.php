<?php

namespace App\Http\Controllers;

use App\Models\FormularioMatricula;
use App\Models\Matricula;
use App\Models\Pago;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MatriculaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pagos= Pago::with(['matricula.grupo.ciclo','matricula.estudiante'])->paginate(15);
        $matriculas = Matricula::with(['grupo.ciclo','estudiante'])->paginate(15);
        $formMatriculas = FormularioMatricula::with('estudiante')->paginate(15);
        return Inertia::render('Administrador/Matricula/Index',['ListaMatriculas'=>$pagos,'ListaFormulariosMatricula'=>$formMatriculas]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
