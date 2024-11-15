<?php

namespace App\Http\Controllers;

use App\Models\FormularioMatricula;
use App\Models\Grupo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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

    public function enviar(Request $request )
    {
        $data = $request->validate([
            'estudiante_id'=>'required|exists:estudiantes,id',
            'cicloIngles' => 'required|exists:ciclos,id',
            'horarioIngles' => 'required|exists:grupos,id',
            'medioPago' => 'required|string',
            'fechaPago' => 'required|date',
            'montoPago' => 'required|numeric',
            'nroComprobante' => 'required|string',
            'imgComprobante' => 'nullable|image|max:2048', // Valida que sea una imagen
        ]);

        try {
            // Antes de crear el formulario, obtén los datos adicionales necesarios
            $grupo = Grupo::with(['ciclo.idioma'])->find($data['horarioIngles']);
            if ($grupo) {
                $data['cicloIngles'] = $grupo->ciclo->nombre . ' - ' . $grupo->ciclo->idioma->nombre;
                $data['horarioIngles'] = $grupo->horario;
            }

            if ($request->hasFile('imgComprobante')) {
                $path = $request->file('imgComprobante')->store('images', 'public');
                $data['imgComprobante'] = Storage::url($path);
            }
            //dd($data);
            FormularioMatricula::create($data);
            return redirect('/')->with('message', 'Formulario registrado correctamente');
        } catch (\Exception $e) {
            // Esto te ayudará a capturar el error
            Log::error('Error al guardar el formulario: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al guardar el formulario: ' . $e->getMessage());
        }
    }

}
