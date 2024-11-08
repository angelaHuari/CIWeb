<?php

namespace App\Http\Controllers;

use App\Models\Formulario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FormularioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $formularios = Formulario::paginate(10);
        return Inertia::render('Administrador/Formulario/Index', ['ListaFormularios' => $formularios]);
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
        $data = $request->validate([
            'nombres' => 'required|string',
            'aPaterno' => 'required|string',
            'aMaterno' => 'required|string',
            'dni' => 'required|string',
            'sexo' => 'required|string',
            'celular' => 'required|string',
            'fechaNacimiento' => 'required|date',
            'tipoAlumno' => 'required|string',
            'programaEstudios' => 'nullable|string',
            'semestre' => 'nullable|string',
            'correoInstitucional' => 'nullable|email',
            'email' => 'nullable|email',
            'anioEgreso' => 'nullable|string',
            'institucionProviene' => 'nullable|string',
            'medioPublicitario' => 'nullable|string',
            'cicloIngles' => 'required|string',
            'horarioIngles' => 'required|string',
            'realizoInglesBasico' => 'nullable|string',
            'realizoInglesIntermedio' => 'nullable|string',
            'tienecertificadoIngles' => 'nullable|string',
            'medioPago' => 'required|string',
            'fechaPago' => 'required|date',
            'montoPago' => 'required|numeric',
            'nroComprobante' => 'required|string',
            'imgComprobante' => 'nullable|image|max:2048', // Valida que sea una imagen
        ]);
        try {
            if ($request->hasFile('imgComprobante')) {
                $path = $request->file('imgComprobante')->store('images', 'public');
                $data['imgComprobante'] = Storage::url($path);
            }
            //dd($data);
            Formulario::create($data);
            return redirect('/')->with('message', 'Formulario registrado correctamente');
        } catch (\Exception $e) {
            // Esto te ayudará a capturar el error
            Log::error('Error al guardar el formulario: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al guardar el formulario: ' . $e->getMessage());
        }
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
