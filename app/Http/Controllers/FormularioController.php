<?php

namespace App\Http\Controllers;

use App\Models\Formulario;
use Illuminate\Http\Request;
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
        return Inertia::render('Administrador/Formulario/Index',['formularios'=>$formularios]);
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
            'email' => 'nullable|email',
            'nombres' => 'required|string',
            'aPaterno' => 'required|string',
            'aMaterno' => 'required|string',
            'dni' => 'required|string',
            'sexo' => 'required|string',
            'celular' => 'required|string',
            'fechaNacimiento' => 'required|date',
            'tipoAlumno' => 'required|string',
            'programadeEstudios' => 'nullable|string',
            'semestre' => 'nullable|string',
            'correoInstitucional' => 'nullable|string',
            'institucionProviene' => 'nullable|string',
            'medioPublicitario' => 'nullable|string',
            'cicloIngles' => 'required|string',
            'horarioIngles' => 'required|string',
            'tienecertificadoIngles' => 'nullable|string',
            'realizoInglesBasico' => 'nullable|string',
            'realizoInglesIntermedio' => 'nullable|date',
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

            Formulario::create($data);

            return redirect()->route('/')->with('message', 'Formulario registrado correctamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al guardar el formulario: ' . $e->getMessage());
        }
    
        // Maneja el archivo imgComprobante si está presente
        /*if ($request->hasFile('imgComprobante')) {
            $data['imgComprobante'] = $request->file('imgComprobante')->store('comprobantes', 'public');
        }*/
    
        
    
        /*return response()->json(['message' => 'Formulario registrado exitosamente']);*/
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
