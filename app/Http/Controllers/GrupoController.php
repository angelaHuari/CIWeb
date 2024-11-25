<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use App\Models\Docente;
use App\Models\Grupo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GrupoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grupos = Grupo::with(['ciclo.idioma', 'docente'])->paginate(10);
        $ciclos = Ciclo::with('idioma')->get(); // Cargar el idioma junto con el ciclo
        $docentes = Docente::all();

        return Inertia::render('Administrador/Grupos/Index', [
            'grupos' => $grupos,
            'ciclos' => $ciclos,
            'docentes' => $docentes,
        ]);
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
        $request->validate([
            'periodo' => 'required|string',
            'modalidad' => 'required|string',
            'nroEstudiantes' => 'required|integer',
            'nroVacantes' => 'required|integer',
            'horario' => 'required|string',
            'docente_id' => 'required|exists:docentes,id',
            'ciclo_id' => 'required|exists:ciclos,id',
        ]);

        Grupo::create($request->all());

        return redirect()->route('grupo.index')
            ->with('success', 'Grupo creado exitosamente.');
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
    public function update(Request $request, Grupo $grupo)
    {
        $request->validate([
            'modalidad' => 'required|string',
            'nroEstudiantes' => 'required|integer',
            'nroVacantes' => 'required|integer',
            'horario' => 'required|string',
            'docente_id' => 'required|exists:docentes,id',
            'ciclo_id' => 'required|exists:ciclos,id',
        ]);

        $grupo->update($request->all());

        return redirect()->route('grupo.index')
            ->with('success', 'Grupo actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}