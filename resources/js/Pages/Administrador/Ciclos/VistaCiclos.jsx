import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';


const VistaCiclos = ({ ciclos = [], idiomas = [] }) => {
    const [selectedCycle, setSelectedCycle] = useState(null); // Ciclo seleccionado para edición

    const { data, setData, post, put, processing, errors } = useForm({
        nombre: '',
        periodo: '',
        nivel: 1,
        idioma_id: '',
    });

    // Opciones de idiomas y periodos
    const languagesOptions = idiomas;
    const periodOptions = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Manejar el envío del formulario para registrar o editar un ciclo
    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedCycle) {
            // Editar ciclo
            put(route('ciclo.update', selectedCycle));
            setSelectedCycle(null); // Limpiar selección de ciclo
        } else {
            // Crear nuevo ciclo
            post(route('ciclo.store'));
        }

        // Limpiar el formulario
        setData({
            nombre: '',
            periodo: '',
            nivel: 1,
            idioma_id: '',
        });
    };

    // Manejar la edición de un ciclo
    const handleEdit = (cycle) => {
        setSelectedCycle(cycle.id);
        setData({
            nombre: cycle.nombre,
            periodo: cycle.periodo,
            nivel: cycle.nivel,
            idioma_id: cycle.idioma_id,
        });
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 font-sans bg-blue-200 min-h-screen">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-6" style={{ color: '#74111e' }}>
                Interfaz de Gestión de Ciclos
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                {/* Formulario para agregar o editar un ciclo */}
                <div className="w-full md:w-1/2 lg:w-2/5">
                    <h3 className="text-xl font-semibold mb-4 text-center md:text-left">Registro de Ciclo</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <select
                                value={data.idioma_id}
                                onChange={(e) => setData('idioma_id', e.target.value)}
                                required
                                className="p-2 border border-gray-300 rounded w-full"
                            >
                                <option value="" disabled>Selecciona un Idioma</option>
                                {languagesOptions.map((lang) => (
                                    <option key={lang.id} value={lang.id}>{lang.nombre}</option>
                                ))}
                            </select>

                            <input
                                type="text"
                                value={data.nombre}
                                onChange={(e) => setData('nombre', e.target.value)}
                                placeholder="Nombre del Ciclo"
                                required
                                className="p-2 border border-gray-300 rounded w-full"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="number"
                                value={data.nivel}
                                onChange={(e) => setData('nivel', Number(e.target.value))}
                                min="1"
                                required
                                className="p-2 border border-gray-300 rounded w-full"
                                placeholder="Nivel"
                            />

                            <select
                                value={data.periodo}
                                onChange={(e) => setData('periodo', e.target.value)}
                                required
                                className="p-2 border border-gray-300 rounded w-full"
                            >
                                <option value="" disabled>Selecciona un Período</option>
                                {periodOptions.map((month, index) => (
                                    <option key={index} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className={`bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto ${selectedCycle ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-600`}
                            >
                                {selectedCycle ? 'Modificar' : 'Agregar'}
                            </button>

                            {selectedCycle && (
                                <button
                                    onClick={() => setSelectedCycle(null)}
                                    className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-red-600"
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Tabla de ciclos */}
            <div className="overflow-x-auto mt-6">
                <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Idioma</th>
                            <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Nombre del Ciclo</th>
                            <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Nivel</th>
                            <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Período</th>
                            <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ciclos && ciclos.data && ciclos.data.length > 0 ? (
                            ciclos.data.map((cycle) => (
                                <tr key={cycle.id}>
                                    <td className="border-b border-gray-300 px-4 py-2">{cycle.idioma.nombre}</td>
                                    <td className="border-b border-gray-300 px-4 py-2">{cycle.nombre}</td>
                                    <td className="border-b border-gray-300 px-4 py-2">{cycle.nivel}</td>
                                    <td className="border-b border-gray-300 px-4 py-2">{cycle.periodo}</td>
                                    <td className="border-b border-gray-300 px-4 py-2">
                                        <button
                                            onClick={() => handleEdit(cycle)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full md:w-auto"
                                        >
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="border-b border-gray-300 px-4 py-2 text-center">
                                    No hay registros
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Paginación */}
                <div className="mt-4">
                    {ciclos.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-1 mx-1 border rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </div>
         
    );
};

export default VistaCiclos;
