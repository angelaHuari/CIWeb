
import React, { useState } from 'react';
import AuthenticatedLayoutDoc from '@/Layouts/AuthenticatedLayoutDoc';
import { Head, useForm } from '@inertiajs/react';

export default function VerGrupos({ docente = {}, grupos = [], error }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState(null);
    const [editingStudentId, setEditingStudentId] = useState(null);
    const { data, setData, post, processing, reset } = useForm({
        matricula_id: '',
        nota: '',
    });

    const handleOpenModal = (grupo) => {
        setSelectedGrupo(grupo);
        setIsModalOpen(true);
    };

    const handleEditarNota = (matriculaId, estudianteId) => {
        setEditingStudentId(estudianteId);
        setData('matricula_id', matriculaId);
    };

    const handleGuardarNota = () => {
        post(route('docente.guardar-nota'), {
            onSuccess: () => {
                setSelectedGrupo(prevGrupo => ({
                    ...prevGrupo,
                    matriculas: prevGrupo.matriculas.map(m => {
                        if (m.id === data.matricula_id) {
                            return { ...m, nota: data.nota };
                        }
                        return m;
                    })
                }));
                reset();
                setEditingStudentId(null);
            },
            preserveScroll: true,
        });
    };

    const nombreCompleto = docente?.nombres && docente?.aPaterno && docente?.aMaterno
        ? `${docente.nombres} ${docente.aPaterno} ${docente.aMaterno}`
        : 'Docente no encontrado';

    return (
        <AuthenticatedLayoutDoc
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-[#6A1C1C] p-6 rounded-lg shadow-xl text-center">
                    Panel de Control - Docente
                </h2>
            }
        >
            <Head title="Dashboard - Docente" />

            {/* Información del Docente */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#6A1C1C]  shadow-sm sm:rounded-lg p-6 mb-6">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Información Personal
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-white"><span className="font-semibold">Nombre completo:</span> {nombreCompleto}</p>
                                <p className="text-white"><span className="font-semibold">DNI:</span> {docente.dni}</p>
                                <p className="text-white"><span className="font-semibold">Sexo:</span> {docente.sexo}</p>
                                <p className="text-white"><span className="font-semibold">Fecha de nacimiento:</span> {docente.fechaNacimiento}</p>
                            </div>
                            <div>
                                <p className="text-white"><span className="font-semibold">Email institucional:</span> {docente.emailInstitucional}</p>
                                <p className="text-white"><span className="font-semibold">Celular:</span> {docente.celular}</p>
                                {docente.fotoDocente && (
                                    <div className="mt-4">
                                        <img 
                                            src={docente.fotoDocente} 
                                            alt="Foto del docente"
                                            className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grupos del Docente */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#6A1C1C] shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Mis Grupos Asignados
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-[#6A1C1C]">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Periodo</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Modalidad</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Horario</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Estudiantes</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Vacantes</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Ciclo</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {grupos.map((grupo) => (
                                        <tr key={grupo.id} className="hover:bg-[#6A4E3C]">
                                            <td className="px-6 py-4 whitespace-nowrap">{grupo.periodo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{grupo.modalidad}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{grupo.horario}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{grupo.nroEstudiantes}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{grupo.nroVacantes}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{grupo.ciclo?.nombre}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleOpenModal(grupo)}
                                                    className="bg-[#F2C49B] hover:bg-[#6A4E3C] text-white font-bold py-2 px-4 rounded"
                                                >
                                                    Ver Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {grupos.length === 0 && (
                                <p className="text-center text-gray-500 py-4">No hay grupos asignados</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && selectedGrupo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Lista de Estudiantes - {selectedGrupo.periodo}</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-[#6A1C1C]">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-white">Nombres</th>
                                        <th className="px-4 py-2 text-left text-white">Apellidos</th>
                                        <th className="px-4 py-2 text-left text-white">Email Institucional</th>
                                        <th className="px-4 py-2 text-left text-white">Nota</th>
                                        <th className="px-4 py-2 text-left text-white">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedGrupo.estudiantes?.map((estudiante) => {
                                        const matricula = selectedGrupo.matriculas?.find(
                                            m => m.estudiante_id === estudiante.id
                                        );
                                        const isEditing = editingStudentId === estudiante.id;

                                        return (
                                            <tr key={estudiante.id} className="border-b">
                                                <td className="px-4 py-2">{estudiante.nombres}</td>
                                                <td className="px-4 py-2">{`${estudiante.aPaterno} ${estudiante.aMaterno}`}</td>
                                                <td className="px-4 py-2">{estudiante.emailInstitucional}</td>
                                                <td className="px-4 py-2">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="20"
                                                            className="border rounded px-2 py-1 w-20"
                                                            defaultValue={matricula?.nota || ''}
                                                            onChange={(e) => setData('nota', e.target.value)}
                                                        />
                                                    ) : (
                                                        <span>{matricula?.nota || '-'}</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {isEditing ? (
                                                        <button
                                                            onClick={handleGuardarNota}
                                                            className="bg-[#F2C49B] hover:bg-[#6A4E3C] text-white font-bold py-1 px-3 rounded text-sm"
                                                            disabled={processing}
                                                        >
                                                            Guardar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleEditarNota(matricula?.id, estudiante.id)}
                                                            className="bg-[#F2C49B] hover:bg-[#6A4E3C] text-white font-bold py-1 px-3 rounded text-sm"
                                                        >
                                                            Ingresar Nota
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mostrar error si existe */}
            {error && (
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-6">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            )}
        </AuthenticatedLayoutDoc>
    );
};



