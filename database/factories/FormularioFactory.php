<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Formulario>
 */
class FormularioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
           
  'nombres' => $this->faker->firstName . ' ' . $this->faker->lastName,
'aPaterno' => $this->faker->lastName,
'aMaterno' => $this->faker->lastName,
'dni' => $this->faker->unique()->numerify('########'),
'sexo' => $this->faker->randomElement(['Masculino', 'Femenino']),
'celular' => $this->faker->phoneNumber(),  // El teléfono lo generamos sin formato específico
'fechaNacimiento' => $this->faker->date('Y-m-d', '2000-01-01'),
'tipoAlumno' => $this->faker->randomElement(['egresado', 'no_alumno', 'alumno']),
'programaEstudios' => $this->faker->randomElement(['DSi', 'T.E', 'Electronica E', 'Contabilidad', 'Turismo', 'Mecanica', 'Mecatronica']),
'semestre' => $this->faker->randomElement(['I', 'II', 'III', 'IV', 'V', 'VI']),
'correoInstitucional' => strtolower($this->faker->firstName . '.' . $this->faker->lastName) . '@istta.edu.pe',  // Aseguramos que esté en minúsculas
'email' => $this->faker->unique()->safeEmail,
'anioEgreso' => $this->faker->year('now'),  // Año de egreso será el año actual
'institucionProviene' => $this->faker->company,
'medioPublicitario' => $this->faker->randomElement(['facebook', 'folletos', 'amigos', 'familiares', 'anuncios', 'pagina_web']),
'cicloIngles' => $this->faker->randomElement(['BASICO - QUECHUA-1']),
'horarioIngles' => $this->faker->randomElement(['12:00PM - 1:00PM']),
'tieneCertificadoIngles' => $this->faker->boolean,
'realizoInglesBasico' => $this->faker->boolean,
'realizoInglesIntermedio' => $this->faker->boolean,
'nroComprobante' => $this->faker->unique()->numerify('COM#####'),
'fechaPago' => $this->faker->date('Y-m-d', 'now'),  // Fecha de pago será actual
'montoPago' => $this->faker->randomFloat(2, 100, 500),  // Aseguramos que el monto sea un número válido con decimales
'medioPago' => $this->faker->randomElement(['BancoNacion', 'CajaInstitucinal']),
'imgComprobante' => $this->faker->imageUrl(640, 480, 'business'),
'estado' => $this->faker->randomElement(['Pendiente']),
'created_at' => $this->faker->dateTimeBetween('2020-01-01', '2024-12-31'),
'updated_at' => $this->faker->dateTimeBetween('2020-01-01', '2024-12-31'),

        ];
    }
}
