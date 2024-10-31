<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    /*return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);*/
    return Inertia::render('Auth/Login');
});
/*
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');*/

Route::get('/inicio', function () {
    return Inertia::render('Auth/Login');
})->middleware(['auth', 'verified','InterfazUsuario'])->name('dashboard');

Route::get('/dashboard', function () {
    $rol=Auth::user()->tipoUsuario;
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

require __DIR__.'/auth.php';
