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
        Schema::create('formularios', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('dni');
            $table->string('sexo');
            $table->string('celular');
            $table->date('fechaNacimiento');
            $table->string('afiliacion');
            $table->string('programadeEstudios')->nullable();
            $table->string('semestre')->nullable();
            $table->string('correoInstitucional')->nullable();
            $table->string('institucionProveniente')->nullable();
            $table->string('medioPublicitario')->nullable();
            $table->string('ciclo');
            $table->string('horario');
            $table->string('tienecertificadoIngles')->nullable();
            $table->string('infoCertificado')->nullable();
            $table->string('fechaCertificado')->nullable();
            $table->string('medioDePago');
            $table->date('fechaDePago');
            $table->decimal('montoDePago');
            $table->string('nroComprobante');
            $table->string('imgComprobante')->nullable();
            $table->timestamps();
        });
    }

    /**
     * 																
     * 
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formularios');
    }
};
