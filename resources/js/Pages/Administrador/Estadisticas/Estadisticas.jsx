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
        <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg text-center">
          Estadísticas
        </h2>
      }
    >
      <Head title="Estadísticas" />
      <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9]">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-center">
            <div
              className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
              onClick={() => handleCardClick('tiposAlumnos')}
              aria-label="tiposAlumnos"
            >
              <div className="flex justify-center items-center mb-4">
                <FaUserGraduate className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
              </div>
              <h4 className="text-2xl text-center font-semibold text-[#F5D0A9]">Tipos de Estudiante</h4>
              <p className="text-[#F5D0A9]">Información sobre los diferentes tipos de estudiantes en el sistema.</p>
            </div>

            <div
              className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
              onClick={() => handleCardClick('medioPublicitario')}
              aria-label="medioPublicitario"
            >
              <div className="flex justify-center items-center mb-4">
                <FaBullhorn className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
              </div>
              <h4 className="text-2xl text-center font-semibold text-[#F5D0A9]">Medios Publicitarios</h4>
              <p className="text-[#F5D0A9]">Estadísticas sobre las campañas publicitarias y su rendimiento.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <h3 className="text-3xl font-semibold text-white bg-gradient-to-r from-[#3E0B10] to-[#6B0F00] p-3 rounded-lg shadow-md">
              {renderTitle()}
            </h3>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 mb-6 justify-center items-center sm:items-start">
            <div className="text-center sm:text-left mb-6 sm:mb-0 w-full">
              <h2 className="text-2xl font-semibold text-[#33333]">Filtrar por mes y año</h2>
              <p className="text-sm text-gray-50 mt-2">Selecciona el mes y el año para filtrar los resultados.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center sm:items-start w-full">
              <div className="w-full sm:w-auto">
                <label htmlFor="month" className="block text-sm font-medium text-[#3333332]">Mes</label>
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
                <label htmlFor="year" className="block text-sm font-medium text-[#3333331]">Año</label>
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
                  className="mt-4 sm:mt-0 inline-block px-6 py-3 text-white bg-[#800020] hover:bg-[#6A4E3C] rounded-md shadow-lg"
                >
                  Filtrar
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => handleGraphChange('pie')}
              className={`py-2 px-4 mr-4 rounded-lg ${selectedGraph === 'pie' ? 'bg-[#800020] text-white' : 'bg-white  text-gray-700'}`}
            >
             Gráfico de Torta  o Circular
            </button>
            <button
              onClick={() => handleGraphChange('bar')}
              className={`py-2 px-4 mr-4 rounded-lg ${selectedGraph === 'bar' ? 'bg-[#800020] text-white' : 'bg-white text-gray-700'}`}
            >
              Gráfico de Barras
            </button>
            <button
              onClick={() => handleGraphChange('line')}
              className={`py-2 px-4 rounded-lg ${selectedGraph === 'line' ? 'bg-[#800020] text-white' : 'bg-white text-gray-700'}`}
            >
              Gráfico de Linea
            </button>
          </div>

          {selectedCard === 'tiposAlumnos' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {loading && <div>Loading...</div>}
              {error && <div className="text-red-600">{error}</div>}
              {selectedGraph === 'pie' && (
                <Pie data={tiposAlumnosData} options={tiposAlumnosOptions} />
              )}
              {selectedGraph === 'bar' && (
                <Bar data={tiposAlumnosData} options={tiposAlumnosOptions} />
              )}
              {selectedGraph === 'line' && (
                <Line data={tiposAlumnosData} options={tiposAlumnosOptions} />
              )}
            </div>
          )}

          {selectedCard === 'medioPublicitario' && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {loading && <div>Loading...</div>}
              {error && <div className="text-red-600">{error}</div>}
              {selectedGraph === 'pie' && (
                <Pie data={medioPublicitarioData} options={medioPublicitarioOptions} />
              )}
              {selectedGraph === 'bar' && (
                <Bar data={medioPublicitarioData} options={medioPublicitarioOptions} />
              )}
              {selectedGraph === 'line' && (
                <Line data={medioPublicitarioData} options={medioPublicitarioOptions} />
              )}
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Estadisticas;
