<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
class DocenteController extends Controller
{
    public function index()
    {
        $query = Docente::query();


        return Inertia::render('Administrador/Docentes/Index', [
            'ListaDocentes' => $query->get(),
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
                $path = $request->file('fotoDocente')->store('docentes', 'public');
                $validated['fotoDocente'] = Storage::url($path);
            }

            Docente::create($validated);

            return redirect()->route('docente.index')->with('message', 'Docente creado exitosamente');
        } catch (\Exception $e) {
            return Inertia::render('Administrador/Docentes/FormularioDocentes', [
                'errors' => $e->getMessage(), // Enviar el error al componente
                'docentes' => Docente::all(), // Enviar los docentes si es necesario
            ]);
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

        $request->merge([
            'nombres' => strtoupper($request->input('nombres')),
            'aPaterno' => strtoupper($request->input('aPaterno')),
            'aMaterno' => strtoupper($request->input('aMaterno')),
            'sexo' => strtoupper($request->input('sexo')),
        ]);

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
                // Borrar la imagen anterior si existe
                if ($docente->fotoDocente) {
                    $oldPath = str_replace('/storage/', '', parse_url($docente->fotoDocente, PHP_URL_PATH));
                    Storage::disk('public')->delete($oldPath);
                }

                // Guardar la nueva imagen
                $path = $request->file('fotoDocente')->store('docentes', 'public');
                $validated['fotoDocente'] = Storage::url($path);
            } else {
                // Si no se sube una nueva imagen, mantener la imagen actual
                $validated['fotoDocente'] = $docente->fotoDocente;
            }

            // Actualizar el docente
            $docente->update($validated);

            return redirect()->route('docente.index')->with('message', 'Docente actualizado exitosamente');
        } catch (\Exception $e) {
            return Inertia::render('Administrador/Docentes/FormularioDocentes', [
                'errors' => $e->getMessage(), // Enviar el error al componente
                'docentes' => Docente::all(), // Enviar los docentes si es necesario
            ]);
        }
    }
}