import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

const GestionGrupos = ({ grupos, ciclos, docentes }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        modalidad: '',
        nroEstudiantes: '',
        horario: '',
        id_Ciclo: '',
        id_Docente: '',
    });

    const [editing, setEditing] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (editing && selectedGrupo) {
            router.put(`/grupo/${selectedGrupo.id}`, data, {
                onSuccess: () => {
                    // Limpiar el formulario y estado
                    reset();
                    setEditing(false);
                    setSelectedGrupo(null);
                    // Recargar la página actual
                    router.reload();
                },
                preserveScroll: true,
            });
        } else {
            router.post('/grupo', data, {
                onSuccess: () => {
                    // Limpiar el formulario
                    reset();
                    // Recargar la página actual
                    router.reload();
                },
                preserveScroll: true,
            });
        }
    };

    const handleEdit = (grupo) => {
        setSelectedGrupo(grupo);
        setData({
            modalidad: grupo.modalidad,
            nroEstudiantes: grupo.nroEstudiantes,
            horario: grupo.horario,
            id_Ciclo: grupo.id_Ciclo,
            id_Docente: grupo.id_Docente,
        });
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        reset();
        setSelectedGrupo(null);
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold">Gestión de Grupos</h1>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="mt-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="modalidad">
                        Modalidad
                    </label>
                    <input
                        type="text"
                        id="modalidad"
                        name="modalidad"
                        value={data.modalidad}
                        onChange={handleChange}
                        className="input w-full rounded-md border-gray-300"
                    />
                    {errors.modalidad && (
                        <div className="text-red-500 text-sm">{errors.modalidad}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="nroEstudiantes">
                        Número de Estudiantes
                    </label>
                    <input
                        type="number"
                        id="nroEstudiantes"
                        name="nroEstudiantes"
                        value={data.nroEstudiantes}
                        onChange={handleChange}
                        className="input w-full rounded-md border-gray-300"
                    />
                    {errors.nroEstudiantes && (
                        <div className="text-red-500 text-sm">{errors.nroEstudiantes}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="horario">
                        Horario
                    </label>
                    <input
                        type="text"
                        id="horario"
                        name="horario"
                        value={data.horario}
                        onChange={handleChange}
                        className="input w-full rounded-md border-gray-300"
                    />
                    {errors.horario && (
                        <div className="text-red-500 text-sm">{errors.horario}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="id_Ciclo">
                        Ciclo
                    </label>
                    <select
                        id="id_Ciclo"
                        name="id_Ciclo"
                        value={data.id_Ciclo}
                        onChange={handleChange}
                        className="input w-full rounded-md border-gray-300"
                    >
                        <option value="">Seleccione un ciclo</option>
                        {ciclos.map((ciclo) => (
                            <option key={ciclo.id} value={ciclo.id}>
                                {ciclo.nombre}
                            </option>
                        ))}
                    </select>
                    {errors.id_Ciclo && (
                        <div className="text-red-500 text-sm">{errors.id_Ciclo}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium" htmlFor="id_Docente">
                        Docente
                    </label>
                    <select
                        id="id_Docente"
                        name="id_Docente"
                        value={data.id_Docente}
                        onChange={handleChange}
                        className="input w-full rounded-md border-gray-300"
                    >
                        <option value="">Seleccione un docente</option>
                        {docentes.map((docente) => (
                            <option key={docente.id} value={docente.id}>
                                {docente.nombres}
                            </option>
                        ))}
                    </select>
                    {errors.id_Docente && (
                        <div className="text-red-500 text-sm">{errors.id_Docente}</div>
                    )}
                </div>

                <div className="flex justify-end gap-4">
                    {editing && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                            disabled={processing}
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        disabled={processing}
                    >
                        {editing ? 'Actualizar Grupo' : 'Crear Grupo'}
                    </button>
                </div>
            </form>

            {/* Tabla de Grupos */}
            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Modalidad
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estudiantes
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Horario
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ciclo
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Docente
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {grupos.data.map((grupo) => (
                            <tr key={grupo.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{grupo.modalidad}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{grupo.nroEstudiantes}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{grupo.horario}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{grupo.ciclo.nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {grupo.docente ? grupo.docente.nombres + ' ' + grupo.docente.aPaterno + ' ' + grupo.docente.aMaterno : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(grupo)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                    >
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionGrupos;