import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

const GestionGrupos = ({ grupos, ciclos, docentes }) => {
    const { data, setData, processing, errors, reset } = useForm({
        periodo: '',
        modalidad: '',
        nroEstudiantes: '',
        nroVacantes: '',
        horario: '',
        docente_id: '',
        ciclo_id: '',
    });
    const periodOptions = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const [editing, setEditing] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState(null);
    const [modalidadError, setModalidadError] = useState(''); // Estado para el error de modalidad
    const [cicloError, setCicloError] = useState('');
    const [docenteError, setDocenteError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);

        // Limpiar los errores al seleccionar una opción válida
        if (name === 'modalidad' && value !== '') setModalidadError('');
        if (name === 'ciclo_id' && value !== '') setCicloError('');
        if (name === 'docente_id' && value !== '') setDocenteError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones para campos de selección
        let isValid = true;
        if (!data.modalidad) {
            setModalidadError('Por favor, seleccione una modalidad válida.');
            isValid = false;
        }
        if (!data.ciclo_id) {
            setCicloError('Por favor, seleccione un ciclo válido.');
            isValid = false;
        }
        if (!data.docente_id) {
            setDocenteError('Por favor, seleccione un docente válido.');
            isValid = false;
        }

        // Si alguna validación falla, no enviar el formulario
        if (!isValid) return;

        if (editing && selectedGrupo) {
            router.put(`/grupo/${selectedGrupo.id}`, data, {
                onSuccess: () => {
                    reset();
                    setEditing(false);
                    setSelectedGrupo(null);
                },
                preserveScroll: true,
            });
        } else {
            router.post('/grupo', data, {
                onSuccess: () => {
                    reset();
                },
                preserveScroll: true,
            });
        }
    };

    const handleEdit = (grupo) => {
        setSelectedGrupo(grupo);
        setData({
            modalidad: grupo.modalidad || '',
            nroEstudiantes: grupo.nroEstudiantes || '',
            nroVacantes: grupo.nroVacantes || '',
            horario: grupo.horario || '',
            docente_id: grupo.docente_id || '',
            ciclo_id: grupo.ciclo_id || '',
        });
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
        reset();
        setSelectedGrupo(null);
        setModalidadError(''); // Limpiar el error al cancelar la edición
        setCicloError(''); // Limpiar el error al cancelar la edición
        setDocenteError(''); // Limpiar el error al cancelar la edición
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Gestión de Grupos</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="periodo">
                            Periodo
                        </label>
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

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="modalidad">
                            Modalidad
                        </label>
                        <select
                            id="modalidad"
                            name="modalidad"
                            value={data.modalidad}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Seleccione una modalidad</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Virtual">Virtual</option>
                        </select>
                        {modalidadError && (
                            <div className="text-red-500 text-sm mt-1">{modalidadError}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="nroEstudiantes">
                            Número de Estudiantes
                        </label>
                        <input
                            type="number"
                            id="nroEstudiantes"
                            name="nroEstudiantes"
                            value={data.nroEstudiantes}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.nroEstudiantes && (
                            <div className="text-red-500 text-sm mt-1">{errors.nroEstudiantes}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="nroVacantes">
                            Número de Vacantes
                        </label>
                        <input
                            type="number"
                            id="nroVacantes"
                            name="nroVacantes"
                            value={data.nroVacantes}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.nroVacantes && (
                            <div className="text-red-500 text-sm mt-1">{errors.nroVacantes}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="horario">
                            Horario
                        </label>
                        <input
                            type="text"
                            id="horario"
                            name="horario"
                            value={data.horario}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.horario && (
                            <div className="text-red-500 text-sm mt-1">{errors.horario}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="ciclo_id">
                            Ciclo
                        </label>
                        <select
                            id="ciclo_id"
                            name="ciclo_id"
                            value={data.ciclo_id}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Seleccione un ciclo</option>
                            {ciclos?.map((ciclo) => (
                                <option key={ciclo.id} value={ciclo.id}>
                                    {`${ciclo.idioma.nombre} - ${ciclo.nombre}`} {/* Combina idioma y ciclo */}
                                </option>
                            ))}
                        </select>
                        {cicloError && (
                            <div className="text-red-500 text-sm mt-1">{cicloError}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="docente_id">
                            Docente
                        </label>
                        <select
                            id="docente_id"
                            name="docente_id"
                            value={data.docente_id}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Seleccione un docente</option>
                            {docentes?.map((docente) => (
                                <option key={docente.id} value={docente.id}>
                                    {`${docente.nombres} ${docente.aPaterno} ${docente.aMaterno}`}
                                </option>
                            ))}
                        </select>
                        {docenteError && (
                            <div className="text-red-500 text-sm mt-1">{docenteError}</div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    {editing && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                            disabled={processing}
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        disabled={processing}
                    >
                        {editing ? 'Actualizar Grupo' : 'Crear Grupo'}
                    </button>
                </div>
            </form>

            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Periodo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Modalidad
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estudiantes
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vacantes
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Horario
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ciclo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Docente
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {grupos.data?.map((grupo) => (
                            <tr key={grupo.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">{grupo.periodo}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{grupo.modalidad}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{grupo.nroEstudiantes}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{grupo.nroVacantes}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{grupo.horario}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {grupo.ciclo?.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {grupo.docente
                                        ? `${grupo.docente.nombres} ${grupo.docente.aPaterno} ${grupo.docente.aMaterno}`
                                        : 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleEdit(grupo)}
                                        className="text-indigo-600 hover:text-indigo-900 transition-colors"
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