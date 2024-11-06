<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DocenteController extends Controller
{
    public function index(Request $request)
    {
        $query = Docente::query();


        return Inertia::render('Administrador/Docentes/FormularioDocentes', [
            'docentes' => $query->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Administrador/Docentes/FormularioDocentes');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombres' => 'required|string|max:255',
            'aPaterno' => 'required|string|max:255',
            'aMaterno' => 'required|string|max:255',
            'sexo' => 'required|in:MASCULINO,FEMENINO',
            'dni' => 'required|string|size:8|unique:docentes,dni',
            'celular' => 'required|string|size:9',
            'fechaNacimiento' => 'required|date',
            'emailInstitucional' => 'required|email|unique:docentes,emailInstitucional',
            'fotoDocente' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        try {
            if ($request->hasFile('fotoDocente')) {
                $path = $request->file('fotoDocente')->store('images', 'public');
                $validated['fotoDocente'] = Storage::url($path);
            }

            Docente::create($validated);

            return redirect()->route('docente.index')->with('message', 'Docente creado exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al guardar el docente: ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        return Inertia::render('Administrador/Docentes/FormularioDocentes', [
            'docente' => Docente::findOrFail($id),
        ]);
    }

    public function update(Request $request, $id)
    {
        $docente = Docente::findOrFail($id);

        $validated = $request->validate([
            'nombres' => 'required|string|max:255',
            'aPaterno' => 'required|string|max:255',
            'aMaterno' => 'required|string|max:255',
            'sexo' => 'required|in:MASCULINO,FEMENINO',
            'dni' => 'required|string|size:8|unique:docentes,dni,' . $id,
            'celular' => 'required|string|size:9',
            'fechaNacimiento' => 'required|date',
            'emailInstitucional' => 'required|email|unique:docentes,emailInstitucional,' . $id,
            'fotoDocente' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        try {
            if ($request->hasFile('fotoDocente')) {
                if ($docente->fotoDocente) {
                    $oldPath = str_replace('/storage/', '', parse_url($docente->fotoDocente, PHP_URL_PATH));
                    Storage::disk('public')->delete($oldPath);
                }

                $path = $request->file('fotoDocente')->store('images', 'public');
                $validated['fotoDocente'] = Storage::url($path);
            }

            $docente->update($validated);

            return redirect()->route('docente.index')->with('message', 'Docente actualizado exitosamente');
        } catch (\Exception $e) {
            return redirect()->back()->withInput()->with('error', 'Error al actualizar el docente: ' . $e->getMessage());
        }
    }
}
