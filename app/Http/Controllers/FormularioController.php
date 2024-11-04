<?php

namespace App\Http\Controllers;

use App\Models\Formulario;
use Illuminate\Http\Request;

class FormularioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'email' => 'required|email',
            'nombres' => 'required|string',
            'apellidos' => 'required|string',
            'dni' => 'required|string',
            'sexo' => 'required|string',
            'celular' => 'required|string',
            'fechaNacimiento' => 'required|date',
            'afiliacion' => 'required|string',
            'programadeEstudios' => 'nullable|string',
            'semestre' => 'nullable|string',
            'correoInstitucional' => 'nullable|string',
            'institucionProveniente' => 'nullable|string',
            'medioPublicitario' => 'nullable|string',
            'ciclo' => 'required|string',
            'horario' => 'required|string',
            'tienecertificadoIngles' => 'nullable|string',
            'infoCertificado' => 'nullable|string',
            'fechaCertificado' => 'nullable|date',
            'medioDePago' => 'required|string',
            'fechaDePago' => 'required|date',
            'montoDePago' => 'required|numeric',
            'nroComprobante' => 'required|string',
            'imgComprobante' => 'nullable|image|max:2048', // Valida que sea una imagen
        ]);
    
        // Maneja el archivo imgComprobante si está presente
        if ($request->hasFile('imgComprobante')) {
            $data['imgComprobante'] = $request->file('imgComprobante')->store('comprobantes', 'public');
        }
    
        Formulario::create($data);
    
        return response()->json(['message' => 'Formulario registrado exitosamente']);
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
