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
        Schema::create('formulario_matriculas', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->string('cicloIngles');
            $table->string('horarioIngles');
            $table->date('fechaPago');
            $table->string('nroComprobante');
            $table->integer('monto');
            $table->string('medioPago');
            $table->String('imgComprobante');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formulario_matriculas');
    }
};