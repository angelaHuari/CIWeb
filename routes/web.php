<?php

use App\Http\Controllers\CicloController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\FormularioController;
use App\Http\Controllers\IdiomaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//Pagina de Inicio
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
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
    Route::get('/formulario', function () {
        return Inertia::render('Administrador/Formulario/ListaFormulario');
    })->name('formulario');
    Route::resource('idioma',IdiomaController::class);
    Route::resource('ciclo',CicloController::class);
    Route::resource('docente',DocenteController::class);
    
    
});
Route::middleware('EsAdmin')->group(function () {
    // Ruta para el formulario de matrículas
    Route::get('/matricula', function () {
        return Inertia::render('Administrador/Matricula/ListadeVista');
    })->name('matricula');
});
Route::resource('formulario',FormularioController::class);




//Para Estudiante

//Para Docente


require __DIR__ . '/auth.php';
