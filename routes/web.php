<?php

use App\Http\Controllers\CicloController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\FormularioController;
use App\Http\Controllers\FuncionEstudianteController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\IdiomaController;
use App\Http\Controllers\MatriculaController;
use App\Http\Controllers\ProfileController;
use App\Models\Ciclo;
use App\Models\Grupo;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Pagina de Inicio
Route::get('/', function () {
    // Obtener los grupos cuyo ciclo tenga periodo 'enero'
    $grupos = Grupo::whereHas('ciclo', function ($query) {
        $query->where('periodo', 'Enero'); // Filtrar ciclos con periodo 'enero'
    })
        ->with(['ciclo', 'docente']) // Incluir las relaciones ciclo y docente
        ->get(); // Obtener todos los grupos que cumplen con la condición

    // Obtener todos los ciclos con periodo 'enero'
    $ciclos = Ciclo::where('periodo', 'Enero') // Filtrar ciclos con periodo 'enero'
        ->with('idioma') // Incluir la relación con idioma
        ->get(); // Obtener todos los ciclos que cumplen con la condición
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'ListaGrupos' => $grupos ?: [],
        'ListaCiclos' => $ciclos ?: [],
    ]);
});

//Para Todos los Usuarios
//verifica que sea un usuario
Route::get('/inicio', function () {
    return Inertia::render('Auth/Login');
})->middleware(['auth', 'verified', 'InterfazUsuario'])->name('dashboard');
//verifica el tipo de usuario
Route::get('/dashboard', function () {
    $rol = Auth::user()->tipoUsuario;
    if ($rol === 'admin') {
        return Inertia::render('Administrador/Dashboard');
    } elseif ($rol === 'est') {
        return Inertia::render('Estudiante/Dashboard');
    } elseif ($rol === 'doc') {
        return Inertia::render('Docente/Dashboard');
    }
})->middleware(['auth', 'verified'])->name('DUsuario');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//Para Administrador
Route::middleware('EsAdmin')->group(function () {

    Route::resource('idioma', IdiomaController::class);
    Route::resource('ciclo', CicloController::class);
    Route::resource('docente', DocenteController::class);
    Route::resource('matricula', MatriculaController::class);
    Route::resource('grupo', GrupoController::class);
});

Route::resource('formulario', FormularioController::class);



//Para Estudiante
Route::middleware('EsEstudiante')->group(function () {
    Route::get('estudiante', [FuncionEstudianteController::class, 'registrar'])->name('estudiante.registrar');
    Route::get('estudiante/ver', [FuncionEstudianteController::class, 'ver'])->name('estudiante.ver');
});


//Para Docente


require __DIR__ . '/auth.php';
