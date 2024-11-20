<?php

namespace App\Http\Controllers;

use App\Models\FormularioMatricula;
use App\Models\Grupo;
use App\Models\Matricula;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $user = Auth::user();
        $estudiante = $user->estudiante;
        $estudianteId = $estudiante ? $estudiante->id : null;
        $grupos = Grupo::with(['ciclo.idioma'])->get();
        return Inertia::render('Estudiante/RegistrarMatricula', ['ListaGrupos' => $grupos, 'est' => $estudianteId]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function ver()
    {
        $user = Auth::user();
        $estudiante = $user->estudiante;
        $estudianteId = $estudiante ? $estudiante->id : null;


        // Obtiene las matrículas del estudiante, paginadas
        $matriculas = Matricula::with(['estudiante', 'grupo.ciclo.idioma', 'pago'])
            ->where('estudiante_id', $estudianteId)
            ->paginate(10); // Ajusta el número de elementos por página según lo necesario


        return Inertia::render('Estudiante/VerMatriculas', [
            'ListaMatriculas' => $matriculas
        ]);
    }

    public function enviar(Request $request)
    {
        $user = Auth::user();
        $estudiante = $user->estudiante;
        $estudianteId = $estudiante ? $estudiante->id : null;

        // Validación de los datos
        $data = $request->validate([
            'fechaMatricula' => 'required|date',
            'cicloIngles' => 'required|exists:ciclos,id',
            'horarioIngles' => 'required|exists:grupos,id',
            'medioPago' => 'required|string',
            'fechaPago' => 'required|date',
            'montoPago' => 'required|numeric',
            'nroComprobante' => 'required|string',
            'imgComprobante' => 'nullable|image|max:2048',
        ]);
        

        try {
            // Asocia el estudiante ID
            $data['estudiante_id'] = $estudianteId;
            $grupo = Grupo::with(['ciclo.idioma'])->find($data['horarioIngles']);
            if ($grupo) {
                $data['cicloIngles'] = $grupo->ciclo->nombre . ' - ' . $grupo->ciclo->idioma->nombre . ' - ' . $grupo->ciclo->nivel;
                $data['horarioIngles'] = $grupo->horario;
            }

            // Manejo de imagen
            if ($request->hasFile('imgComprobante')) {
                $path = $request->file('imgComprobante')->store('images', 'public');
                $data['imgComprobante'] = Storage::url($path);
            }

            // Registro en la base de datos
            FormularioMatricula::create($data);

            return redirect()->route('estudiante.registrar')->with('message', 'Matrícula enviada correctamente');
        } catch (\Exception $e) {
            Log::error('Error al enviar el formulario: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al enviar el formulario: ' . $e->getMessage());
        }
    }
}
