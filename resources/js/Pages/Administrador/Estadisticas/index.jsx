import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUserGraduate, FaBullhorn } from 'react-icons/fa';  // Iconos de Font Awesome
import { Pie, Bar } from 'react-chartjs-2';  // Para los gráficos
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';  // Importación de Chart.js

// Registro de los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Estadisticas = () => {
  const [tiposAlumnos, setTiposAlumnos] = useState([]);
  const [medioPublicitario, setMedioPublicitario] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para hacer la petición y obtener los datos filtrados
  const handleFilterChange = async () => {
    if (!month || !year) {
      setError('Por favor, selecciona un mes y un año válidos.');
      return;
    }

    setLoading(true); // Iniciar el estado de carga
    setError(null); // Resetear el error previo

    try {
      const response = await fetch(`/estadisticas/filtrar?month=${month}&year=${year}&type=${selectedCard}`);
      const data = await response.json();
      
      if (response.ok) {
        if (selectedCard === 'tiposAlumnos') {
          setTiposAlumnos(data.tiposAlumnos || []);
        } else if (selectedCard === 'medioPublicitario') {
          setMedioPublicitario(data.medioPublicitario || []);
        }
      } else {
        setError('Error al obtener los datos.');
      }
    } catch (error) {
      setError('Error al obtener los datos.');
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  // Datos para el gráfico de torta (Tipos de Alumnos)
  const tiposAlumnosData = {
    labels: tiposAlumnos.map((item) => item.tipoAlumno),
    datasets: [
      {
        data: tiposAlumnos.map((item) => item.cantidad),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colores personalizados
      },
    ],
  };

  // Datos para el gráfico de barras (Medios Publicitarios)
  const medioPublicitarioData = {
    labels: medioPublicitario.map((item) => item.medioPublicitario),
    datasets: [
      {
        label: 'Medios Publicitarios',
        data: medioPublicitario.map((item) => item.cantidad),
        backgroundColor: '#FF5733',
      },
    ],
  };

  useEffect(() => {
    if (selectedCard) {
      handleFilterChange(); // Llamamos a la función para obtener los datos según la tarjeta seleccionada
    }
  }, [month, year, selectedCard]); // Reactualizar cuando cambian los filtros

  // Manejador de clic en tarjeta para mostrar la sección correspondiente
  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#4B0C00] to-[#5A0B0F] p-4 rounded-lg shadow-lg text-center">
          Estadísticas
        </h2>
      }
    >
      <Head title="Estadísticas" />
      <div className="py-8 bg-gradient-to-b from-[#F5F5DC] via-[#F8F8F0] to-white">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Tarjeta 1: Tipos de Estudiante */}
            <div
              className="bg-gradient-to-r from-[#4B0C00] via-[#5A0B0F] to-[#3B0906] p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCardClick('tiposAlumnos')}
            >
              <div className="flex items-center space-x-4">
                <FaUserGraduate className="text-white text-4xl" />
                <h3 className="text-xl font-semibold text-white">Tipos de Estudiante</h3>
              </div>
              <p className="mt-4 text-white">
                Información sobre los diferentes tipos de estudiantes en el sistema.
              </p>
            </div>

            {/* Tarjeta 2: Publicidad */}
            <div
              className="bg-gradient-to-r from-[#5A0B0F] via-[#3B0906] to-[#4B0C00] p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
              onClick={() => handleCardClick('medioPublicitario')}
            >
              <div className="flex items-center space-x-4">
                <FaBullhorn className="text-white text-4xl" />
                <h3 className="text-xl font-semibold text-white">Publicidad</h3>
              </div>
              <p className="mt-4 text-white">
                Estadísticas sobre las campañas publicitarias y su rendimiento.
              </p>
            </div>
          </div>

          {/* Filtros: Mes y Año */}
          <div className="mt-6 flex gap-4 mb-6 justify-center">
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded-md"
            />
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-4 py-2 bg-gray-800 text-white rounded-md"
            />
            <button
              onClick={handleFilterChange}
              disabled={loading}  // Deshabilitar el botón mientras se carga
              className={`px-4 py-2 ${loading ? 'bg-gray-500' : 'bg-blue-600'} text-white rounded-md`}
            >
              {loading ? 'Cargando...' : 'Filtrar'}
            </button>
          </div>

          {/* Mostrar mensaje de error */}
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {/* Mostrar el gráfico de Tipos de Alumnos si se seleccionó la tarjeta */}
          {selectedCard === 'tiposAlumnos' && tiposAlumnos.length > 0 && (
            <div className="mt-6">
              <Pie data={tiposAlumnosData} />
            </div>
          )}

          {/* Mostrar el gráfico de Medios Publicitarios si se seleccionó la tarjeta */}
          {selectedCard === 'medioPublicitario' && medioPublicitario.length > 0 && (
            <div className="mt-6">
              <Bar data={medioPublicitarioData} />
            </div>
          )}

          {/* Mostrar mensaje cuando no hay datos */}
          {(selectedCard === 'tiposAlumnos' && tiposAlumnos.length === 0) || 
           (selectedCard === 'medioPublicitario' && medioPublicitario.length === 0) ? (
            <div className="text-center text-gray-500 mt-6">No hay datos disponibles para mostrar.</div>
          ) : null}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Estadisticas;
