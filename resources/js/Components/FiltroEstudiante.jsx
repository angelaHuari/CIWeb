import React, { useState } from 'react';

const FiltroEstudiantes = ({ onFilter }) => {
    const [ciclo, setCiclo] = useState('');
    const [nivel, setNivel] = useState('');
    const [modalidad, setModalidad] = useState('');
    const [horario, setHorario] = useState('');

    const handleFilterChange = () => {
        // Pasar los valores del filtro a la función onFilter que manejará la lógica del Dashboard
        onFilter({ ciclo, nivel, modalidad, horario });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold text-[#9b1c31] mb-4">Filtrar Grupo de Estudiantes</h3>
            <div className="flex space-x-4">
                {/* Filtro por Ciclo */}
                <div className="flex-1">
                    <label htmlFor="ciclo" className="block text-sm font-medium text-gray-700">
                        Ciclo
                    </label>
                    <select
                        id="ciclo"
                        value={ciclo}
                        onChange={(e) => setCiclo(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    >
                        <option value="">Seleccionar</option>
                        <option value="Básico">Básico</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>
                </div>

                {/* Filtro por Nivel */}
                <div className="flex-1">
                    <label htmlFor="nivel" className="block text-sm font-medium text-gray-700">
                        Nivel
                    </label>
                    <select
                        id="nivel"
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    >
                        <option value="">Seleccionar</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                {/* Filtro por Modalidad */}
                <div className="flex-1">
                    <label htmlFor="modalidad" className="block text-sm font-medium text-gray-700">
                        Modalidad
                    </label>
                    <select
                        id="modalidad"
                        value={modalidad}
                        onChange={(e) => setModalidad(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    >
                        <option value="">Seleccionar</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual">Virtual</option>
                    </select>
                </div>

                {/* Filtro por Horario */}
                <div className="flex-1">
                    <label htmlFor="horario" className="block text-sm font-medium text-gray-700">
                        Horario
                    </label>
                    <select
                        id="horario"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md"
                    >
                        <option value="">Seleccionar</option>
                        <option value="Mañana">Mañana</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noche">Noche</option>
                    </select>
                </div>
            </div>

            {/* Botón para aplicar filtro */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={handleFilterChange}
                    className="bg-[#9b1c31] text-white py-2 px-4 rounded-lg hover:bg-[#8e735b] transition-all"
                >
                    Aplicar Filtro
                </button>
            </div>
        </div>
    );
};

export default FiltroEstudiantes;
