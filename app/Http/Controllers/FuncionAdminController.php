<?php

namespace App\Http\Controllers;

use App\Models\FormularioMatricula;
use App\Models\Grupo;
use App\Models\Matricula;
use App\Models\Pago;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class FuncionAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Administrador/Usuarios/Index');
    }

   
    public function create()
    {
        //
    }
    
    public function aprobar(Request $request)
    {
        try {
            $formulario = FormularioMatricula::findOrFail($request->id);

            // Buscar el grupo correspondiente
            $grupo = Grupo::where('horario', $formulario->horarioIngles)
                ->whereHas('ciclo', function ($query) use ($formulario) {
                    $query->whereRaw("CONCAT(nombre, ' - ', (SELECT nombre FROM idiomas WHERE id = ciclos.idioma_id), ' - ' ,nivel) = ?", [$formulario->cicloIngles]);
                })
                ->first();

            if (!$grupo) {
                throw new \Exception('No se encontró el grupo correspondiente');
            }
            // Create payment record
            $pago = Pago::create([
                'fecha' => $formulario->fechaPago,
                'monto' => $formulario->montoPago,
                'medioPago' => $formulario->medioPago,
                'nroComprobante' => $formulario->nroComprobante,
                'imgComprobante' => $formulario->imgComprobante
            ]);

            // Crear matrícula
            $matricula = Matricula::create([
                'fecha' => Carbon::now(),
                'nota' => 0,
                'estado' => 'vigente',
                'estudiante_id' => $formulario->estudiante_id,
                'grupo_id' => $grupo->id,
                'pago_id' => $pago->id
            ]);


            // Actualizar el estado del formulario_matricula
            $formulario->estado = 'aceptado';
            $formulario->save();

            return redirect()->back()->with([
                'message' => 'Estudiante, matrícula y pago registrados correctamente',
                'formularioId' => $formulario->id
            ]);
        } catch (\Exception $e) {
            Log::error('Error al registrar matrícula y pago: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al procesar la solicitud: ' . $e->getMessage());
        }
    }

}
