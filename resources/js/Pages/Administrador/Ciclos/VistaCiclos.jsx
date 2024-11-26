import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';


const VistaCiclos = ({ ciclos = [], idiomas = [] }) => {
    const [selectedCycle, setSelectedCycle] = useState(null); // Ciclo seleccionado para edición

    const { data, setData, post, put, processing, errors,reset } = useForm({
        nombre: '',
        nivel: 1,
        idioma_id: '',
    });

    // Opciones de idiomas y periodos
    const languagesOptions = idiomas;


    // Manejar el envío del formulario para registrar o editar un ciclo
    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(data);

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
            nivel: 1,
            idioma_id: '',
        });
    };

    // Manejar la edición de un ciclo
    const handleEdit = (cycle) => {
        setSelectedCycle(cycle.id);
        setData({
            nombre: cycle.nombre,
            nivel: cycle.nivel,
            idioma_id: cycle.idioma_id,
        });
    };
    // Cancelar la edición de un ciclo
    const handleCancel = () => {
        setSelectedCycle(null);
        reset();
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#800020] to-[#F5D0A9] py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                    {/* Formulario para agregar o editar un ciclo */}
                    <div className="w-full max-w-full mx-auto">
                        <h3 className="text-xl font-semibold mb-4 text-center md:text-left">Registro de Ciclo</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 items-center">
                                {/* Columna 1: Nombre */}
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                                        Nombre
                                    </label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value.toUpperCase())}
                                        placeholder="Nombre del Ciclo"
                                        required
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                </div>

                                {/* Columna 2: Nivel */}
                                <div>
                                    <label htmlFor="nivel" className="block text-sm font-medium text-gray-700">
                                        Nivel
                                    </label>
                                    <input
                                        id="nivel"
                                        type="number"
                                        value={data.nivel}
                                        onChange={(e) => setData('nivel', Number(e.target.value))}
                                        min="1"
                                        required
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                        placeholder="Nivel"
                                    />
                                </div>
                                {errors.nivel && <span className="text-red-500 text-sm">{errors.nivel}</span>}

                                {/* Columna 3: Idioma */}
                                <div>
                                    <label htmlFor="idioma_id" className="block text-sm font-medium text-gray-700">
                                        Idioma
                                    </label>
                                    <select
                                        id="idioma_id"
                                        value={data.idioma_id}
                                        onChange={(e) => setData('idioma_id', e.target.value.toUpperCase())}
                                        required
                                        disabled={selectedCycle !== null}
                                        className="mt-1 p-2 border border-gray-300 rounded w-full uppercase"
                                    >
                                        <option value="" disabled>Selecciona un Idioma</option>
                                        {languagesOptions.map((lang) => (
                                            <option key={lang.id} value={lang.id}>{lang.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre}</span>}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className={`bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto ${selectedCycle ? 'bg-green-500' : 'bg-blue-500'} hover:bg-blue-600`}
                                >
                                    {selectedCycle ? 'Modificar' : 'Agregar'}
                                </button>

                                {selectedCycle && (
                                    <button
                                        onClick={() => handleCancel()}
                                        className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-red-600"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Tabla de ciclos */}
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                        <thead className="bg-[#800020] text-white">
                            <tr>
                                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Idioma</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Nombre del Ciclo</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Nivel</th>
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
                                        <td className="border-b border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => handleEdit(cycle)}
                                                className="bg-black text-white px-3 py-1 rounded hover:bg-green-600 w-full md:w-auto"
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
                                className={`px-3 py-1 mx-1 border rounded ${link.active ? 'bg-black text-white' : 'bg-white text-gray'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default VistaCiclos;
