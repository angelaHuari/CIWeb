<?php

use App\Http\Controllers\CicloController;
use App\Http\Controllers\DocenteController;
use App\Http\Controllers\GrupoController;
use App\Http\Controllers\IdiomaController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/inicio', function () {
    return Inertia::render('Auth/Login');
})->middleware(['auth', 'verified', 'InterfazUsuario'])->name('dashboard');

Route::get('/dashboard', function () {
    $rol = Auth::user()->tipoUsuario;
    return match ($rol) {
        'admin' => Inertia::render('Administrador/Dashboard'),
        'est' => Inertia::render('Estudiante/Dashboard'),
        'doc' => Inertia::render('Docente/Dashboard'),
        default => abort(403),
    };
})->middleware(['auth', 'verified'])->name('DUsuario');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('EsAdmin')->group(function () {
    Route::get('/formulario', fn() => Inertia::render('Administrador/Formulario/ListaFormulario'))->name('formulario');
    Route::resource('idioma', IdiomaController::class);
    Route::resource('docente', DocenteController::class);
    Route::resource('grupo', GrupoController::class);
    Route::resource('ciclo',CicloController::class);
});

require __DIR__ . '/auth.php';
