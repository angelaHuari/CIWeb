<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Formulario;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
      //  Formulario::factory(2000)->create();
        
        // User::factory(10)->create();

       User::factory()->create([
           // para admin
           'name' => 'Cuenta Administrador',
           'email' => 'admin@gmail.com',
            'tipoUsuario' => 'admin',
            //para estudiante
            /*'name' => 'Cuenta Estudiante',
            'email' => 'estudiante@gmail.com',
            'tipoUsuario' => 'est',*/
            //para docente
            /*'name' => 'Cuenta Docente',
            'email' => 'docente@gmail.com',
            'tipoUsuario' => 'doc',*/
       ]);

        
       
    }
}
