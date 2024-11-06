<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Grupo;
use App\Models\Ciclo;
use App\Models\Docente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GrupoController extends Controller
{
    public function index()
    {
        $grupos = Grupo::with(['ciclo', 'docente'])->paginate(10);
        $ciclos = Ciclo::all();
        $docentes = Docente::all();

        return Inertia::render('Administrador/Grupos/Index', [
            'ListaGrupos' => $grupos,
            'ListaCiclos' => $ciclos,
            'ListaDocentes' => $docentes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'modalidad' => 'required|string',
            'nroEstudiantes' => 'required|integer',
            'horario' => 'required|string',
            'id_Ciclo' => 'required|exists:ciclos,id',
            'id_Docente' => 'required|exists:docentes,id',
        ]);

        Grupo::create($request->all());

        return redirect()->route('grupo.index')
            ->with('success', 'Grupo creado exitosamente.');
    }

    public function update(Request $request, Grupo $grupo)
    {
        $request->validate([
            'modalidad' => 'required|string',
            'nroEstudiantes' => 'required|integer',
            'horario' => 'required|string',
            'id_Ciclo' => 'required|exists:ciclos,id',
            'id_Docente' => 'required|exists:docentes,id',
        ]);

        $grupo->update($request->all());

        return redirect()->route('grupo.index')
            ->with('success', 'Grupo actualizado exitosamente.');
    }
}
