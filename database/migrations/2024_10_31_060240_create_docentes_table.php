<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('docentes', function (Blueprint $table) {
            $table->id();
            $table->string('nombres'); // Nombres del docente
            $table->string('aPaterno'); // Apellido paterno
            $table->string('aMaterno'); // Apellido materno
            $table->enum('sexo', ['MASCULINO', 'FEMENINO']); // Sexo del docente
            $table->string('dni')->unique(); // DNI del docente
            $table->string('celular')->nullable(); // Celular del docente
            $table->date('fechaNacimiento'); // Fecha de nacimiento
            $table->string('emailInstitucional')->unique(); // Correo electrónico
            $table->string('fotoDocente')->nullable(); // URL de la foto del docente
            $table->timestamps(); // Campos created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('docentes');
    }
};
