<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
    
    public function aprobar(Request $rquest)
    {
        
    }

}
