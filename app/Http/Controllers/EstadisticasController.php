<?php

namespace App\Http\Controllers;

use App\Models\Formulario;  
use Inertia\Inertia;
use Illuminate\Http\Request;

class EstadisticasController extends Controller
{
    public function index()
    {
        $datos = Formulario::all();
        return Inertia::render('Administrador/Estadisticas/Estadisticas',['datos'=>$datos]);
    }

    public function filtrar(Request $request)
    {
        $month = $request->input('month'); // Mes (Formato: YYYY-MM)
        $year = $request->input('year');   // Año
        $type = $request->input('type');   // Tipo: 'tiposAlumnos' o 'medioPublicitario'
        
        // Verifica que los parámetros estén llegando correctamente
        // dd($month, $year, $type); // Descomenta esto si necesitas depurar
        
        // Filtrar según el tipo solicitado
        if ($type === 'tiposAlumnos') {
            // Obtener los datos de tipos de alumnos según el tipo_alumno
            $tiposAlumnos = Formulario::selectRaw('tipoAlumno, COUNT(*) as cantidad')
                ->whereMonth('created_at', $month)
                ->whereYear('created_at', $year)
                ->groupBy('tipoAlumno')  // Agrupamos por tipo_alumno
                ->get();
    
            // Depura los resultados
            dd($tiposAlumnos);
    
            return Inertia::render('Administrador/Estadisticas/Estadisticas',['tiposAlumnos' => $tiposAlumnos]);
        } else if ($type === 'medioPublicitario') {
            // Obtener las estadísticas de medios publicitarios
            $medioPublicitario = Formulario::selectRaw('medioPublicitario, COUNT(*) as cantidad')
                ->whereMonth('created_at', $month)
                ->whereYear('created_at', $year)
                ->groupBy('medioPublicitario')
                ->get();
    
            // Depura los resultados
            dd($medioPublicitario);
    
            return Inertia::render('Administrador/Estadisticas/Estadisticas',['medioPublicitario' => $medioPublicitario]);
        }
    
        return response()->json(['error' => 'Tipo no válido'], 400);
    }
}
