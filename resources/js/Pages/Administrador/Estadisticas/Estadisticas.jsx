import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaUserGraduate, FaBullhorn } from 'react-icons/fa';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Registro de los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const Estadisticas = ({ datos = [], tiposAlumnos = [], medioPublicitario = [] }) => {
  const [dataTiposAlumnos, setDataTiposAlumnos] = useState([]);
  const [datamedioPublicitario, setDataMedioPublicitario] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState('pie');

  const handleFilterChange = async () => {
    if (!month || !year) {
      setError('Por favor, selecciona un mes y un año válidos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (selectedCard === 'tiposAlumnos') {
        setDataTiposAlumnos(tiposAlumnos || []);
      } else if (selectedCard === 'medioPublicitario') {
        setDataMedioPublicitario(medioPublicitario || []);
      } else {
        setError('Error al obtener los datos.');
      }
    } catch (error) {
      setError('Error al obtener los datos.');
    } finally {
      setLoading(false);
    }
  };

  const tiposAlumnosData = {
    labels: dataTiposAlumnos.map((item) => item.tipoAlumno),
    datasets: [
      {
        data: dataTiposAlumnos.map((item) => Math.round(item.cantidad)),
        backgroundColor: ['#6D9DC5', '#FFB81C', '#34A853'], // Colores más claros
      },
    ],
  };

  const tiposAlumnosOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, value) => acc + value, 0);
            const percentage = Math.round((tooltipItem.raw / total) * 100);
            return `${tooltipItem.label}: ${Math.round(tooltipItem.raw)} (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  const medioPublicitarioData = {
    labels: datamedioPublicitario.map((item) => item.medioPublicitario),
    datasets: [
      {
        label: 'Medios Publicitarios',
        data: datamedioPublicitario.map((item) => Math.round(item.cantidad)),
        backgroundColor: ['#FF6F61', '#6B7F0E', '#1D9BF0', '#F39C12'], // Colores más suaves
      },
    ],
  };

  const medioPublicitarioOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${Math.round(tooltipItem.raw)}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  useEffect(() => {
    if (selectedCard) {
      handleFilterChange();
    }
  }, [month, year, selectedCard]);

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  const renderTitle = () => {
    switch (selectedCard) {
      case 'tiposAlumnos':
        return 'Estadísticas de los Tipos de Estudiantes';
      case 'medioPublicitario':
        return 'Estadísticas de los Medios Publicitarios';
      default:
        return '';
    }
  };

  const handleGraphChange = (graphType) => {
    setSelectedGraph(graphType);
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
      <div className="py-8 bg-[#FFFBF0]">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-center">
            <div
              className="bg-gradient-to-r from-[#5A0B0F] via-[#6B0F00] to-[#4B0C00] p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer text-center"
              onClick={() => handleCardClick('tiposAlumnos')}
            >
              <div className="flex justify-center items-center mb-4">
                <FaUserGraduate className="text-white text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Tipos de Estudiante</h3>
              <p className="mt-4 text-white">Información sobre los diferentes tipos de estudiantes en el sistema.</p>
            </div>

            <div
              className="bg-gradient-to-r from-[#5A0B0F] via-[#3B0906] to-[#4B0C00] p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out cursor-pointer text-center"
              onClick={() => handleCardClick('medioPublicitario')}
            >
              <div className="flex justify-center items-center mb-4">
                <FaBullhorn className="text-white text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Publicidad</h3>
              <p className="mt-4 text-white">Estadísticas sobre las campañas publicitarias y su rendimiento.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <h3 className="text-3xl font-semibold text-white bg-gradient-to-r from-[#3E0B10] to-[#6B0F00] p-3 rounded-lg shadow-md">
              {renderTitle()}
            </h3>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 mb-6 justify-center items-center sm:items-start">
            <div className="text-center sm:text-left mb-6 sm:mb-0 w-full">
              <h2 className="text-2xl font-semibold text-[#333333]">Filtrar por mes y año</h2>
              <p className="text-sm text-gray-500 mt-2">Selecciona el mes y el año para filtrar los resultados.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center sm:items-start w-full">
              <div className="w-full sm:w-auto">
                <label htmlFor="month" className="block text-sm font-medium text-[#333333]">Mes</label>
                <input
                  id="month"
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="mt-1 px-4 py-3 bg-white text-black rounded-md w-full sm:w-56 border border-gray-300 focus:ring-2 focus:ring-[#3E0B10]"
                  aria-label="Mes de filtro"
                />
              </div>
              <div className="w-full sm:w-auto">
                <label htmlFor="year" className="block text-sm font-medium text-[#333333]">Año</label>
                <input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="mt-1 px-4 py-3 bg-white text-black rounded-md w-full sm:w-56 border border-gray-300 focus:ring-2 focus:ring-[#3E0B10]"
                  aria-label="Año de filtro"
                />
              </div>
              <div className="w-full sm:w-auto">
                <button
                  onClick={handleFilterChange}
                  disabled={loading}
                  className={`px-6 py-3 text-lg ${loading ? 'bg-gray-400' : 'bg-[#3E0B10] hover:bg-[#2D080C]'} text-white rounded-md w-full sm:w-auto mt-4 sm:mt-0 focus:outline-none focus:ring-2 focus:ring-[#3E0B10] transition duration-300 ease-in-out`}
                  aria-label="Aplicar filtro"
                >
                  {loading ? 'Cargando...' : 'Filtrar'}
                </button>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          {selectedCard && (
            <div className="mt-10">
              <div className="flex justify-center mb-6 gap-4">
                <button
                  onClick={() => handleGraphChange('pie')}
                  className={`px-6 py-2 text-md rounded-md ${selectedGraph === 'pie' ? 'bg-[#3E0B10] text-white' : 'bg-gray-200 text-black'}`}
                >
                  Gráfico de Torta o Circular
                </button>
                <button
                  onClick={() => handleGraphChange('bar')}
                  className={`px-6 py-2 text-md rounded-md ${selectedGraph === 'bar' ? 'bg-[#3E0B10] text-white' : 'bg-gray-200 text-black'}`}
                >
                  Gráfico de Barras
                </button>
                <button
                  onClick={() => handleGraphChange('line')}
                  className={`px-6 py-2 text-md rounded-md ${selectedGraph === 'line' ? 'bg-[#3E0B10] text-white' : 'bg-gray-200 text-black'}`}
                >
                  Gráfico de Líneas
                </button>
              </div>

              <div className="flex w-75 h-75 mx-auto"> {/* Tamaño moderado */}        
                {selectedGraph === 'pie' && (
                  <Pie data={selectedCard === 'tiposAlumnos' ? tiposAlumnosData : medioPublicitarioData} options={selectedCard === 'tiposAlumnos' ? tiposAlumnosOptions : medioPublicitarioOptions} />
                )}
                {selectedGraph === 'bar' && (
                  <Bar data={selectedCard === 'tiposAlumnos' ? tiposAlumnosData : medioPublicitarioData} options={selectedCard === 'tiposAlumnos' ? tiposAlumnosOptions : medioPublicitarioOptions} />
                )}
                {selectedGraph === 'line' && (
                  <Line data={selectedCard === 'tiposAlumnos' ? tiposAlumnosData : medioPublicitarioData} options={selectedCard === 'tiposAlumnos' ? tiposAlumnosOptions : medioPublicitarioOptions} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Estadisticas;