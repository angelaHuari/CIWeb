<?php

namespace App\Http\Controllers;

use App\Models\Docente;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DocenteController extends Controller
{
    public function index(Request $request)
    {
        $query = Docente::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->whereRaw("CONCAT(nombres, ' ', aPaterno, ' ', aMaterno) LIKE ?", ["%{$search}%"]);
        }

        $docentes = $query->get();

        return Inertia::render('Administrador/Docentes/FormularioDocentes', [
            'docentes' => $docentes,
            'search' => $request->input('search'),
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
            'sexo' => 'required',
            'dni' => 'required|string|size:8|',
            'celular' => 'required|string|max:9',
            'fechaNacimiento' => 'required|date',
            'emailInstitucional' => 'required|email',
            'fotoDocente' => 'nullable|max:2048',
        ]);
        $fotoDocentePath = null; // Variable para almacenar la URL de la imagen

        if ($request->hasFile('fotoDocente')) {
            // Verificamos que se haya subido un archivo
            $path = $request->file('fotoDocente')->store('images', 'public'); // Almacenamos la imagen
            $fotoDocentePath = Storage::url($path); // Obtenemos la URL pública de la imagen
        }

        try {
            // Aquí creamos el docente, agregamos la URL de la imagen si existe
            Docente::create([
                'nombres' => $validated['nombres'],
                'aPaterno' => $validated['aPaterno'],
                'aMaterno' => $validated['aMaterno'],
                'sexo' => $validated['sexo'],
                'dni' => $validated['dni'],
                'celular' => $validated['celular'],
                'fechaNacimiento' => $validated['fechaNacimiento'],
                'emailInstitucional' => $validated['emailInstitucional'],
                'fotoDocente' => $fotoDocentePath, // Asignamos la URL de la foto si se cargó
            ]);

            return redirect()->route('docente.index')
                ->with('message', 'Docente creado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error al guardar docente: ' . $e->getMessage());
            return redirect()->back()
                ->with('error', 'Error al guardar el docente: ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        $docente = Docente::findOrFail($id);

        return Inertia::render('Administrador/Docentes/FormularioDocentes', [
            'docente' => $docente,
        ]);
    }

    public function update(Request $request, $id)
    {
        $docente = Docente::findOrFail($id);

        // Validar los campos del formulario
        $validated = $request->validate([
            'nombres' => 'required|string|max:255',
            'aPaterno' => 'required|string|max:255',
            'aMaterno' => 'required|string|max:255',
            'sexo' => 'required|in:MASCULINO,FEMENINO',
            'dni' => 'required|string|size:8|unique:docentes,dni,' . $id,
            'celular' => 'required|string|max:9',
            'fechaNacimiento' => 'required|date',
            'emailInstitucional' => 'required|email|unique:docentes,emailInstitucional,' . $id,
            'fotoDocente' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        try {
            // Manejar la actualización de la imagen si se proporciona una nueva
            if ($request->hasFile('fotoDocente')) {
                // Eliminar la imagen anterior si existe
                if ($docente->fotoDocente) {
                    $oldPath = str_replace('/storage/', '', parse_url($docente->fotoDocente, PHP_URL_PATH));
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }

                // Guardar la nueva imagen
                $path = $request->file('fotoDocente')->store('images', 'public');
                $validated['fotoDocente'] = Storage::url($path);
            } else {
                // Si no se proporcionó una nueva imagen, mantener la existente
                unset($validated['fotoDocente']);
            }

            // Actualizar el docente
            $docente->update($validated);

            return redirect()->route('docentes.index')
                ->with('message', 'Docente actualizado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error al actualizar docente: ' . $e->getMessage());
            return redirect()->back()
                ->with('error', 'Error al actualizar el docente: ' . $e->getMessage());
        }
    }
}
