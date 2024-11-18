<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Docente;
use App\Models\Grupo;
use App\Models\Matricula;
use Illuminate\Support\Facades\Auth;

class FuncionDocenteController extends Controller
{
    public function verGrupos()
    {
        try {
            // Load the docente with user and grupos relationship
            $docente = Docente::with(['user', 'grupos.ciclo', 'grupos.estudiantes', 'grupos.matriculas'])
                ->where('user_id', Auth::id())
                ->first();

            if (!$docente) {
                return Inertia::render('Docente/VerGrupos', [
                    'error' => 'No se encontraron datos del docente'
                ]);
            }

            return Inertia::render('Docente/VerGrupos', [
                'docente' => $docente,
                'grupos' => $docente->grupos
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Docente/VerGrupos', [
                'error' => 'Error al cargar los datos del docente: ' . $e->getMessage()
            ]);
        }
    }

    public function guardarNota(Request $request)
    {
        try {
            $request->validate([
                'matricula_id' => 'required|exists:matriculas,id',
                'nota' => 'required|numeric|min:0|max:20',
            ]);

            $matricula = Matricula::findOrFail($request->matricula_id);
            $matricula->nota = $request->nota;
            $matricula->save();

            return back()->with('success', 'Nota guardada correctamente')->with('matricula', $matricula);
        } catch (\Exception $e) {
            return back()->with('error', 'Error al guardar la nota: ' . $e->getMessage());
        }
    }
}
