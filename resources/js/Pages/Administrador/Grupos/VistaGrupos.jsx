import { Head, Link } from '@inertiajs/react';
import { FaUsers, FaLayerGroup } from 'react-icons/fa';
import React, { useState } from 'react';
import GestionGrupos from './GestionGrupos';

export const VistaGrupos = ({grupos,ciclos,docentes}) => {
    
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState(false);
    
    
    const handleShowModal = (grupo) => {
        if (!grupo) return;
        setSelectedGrupo(grupo);
        setShowModalEdit(true);
    };

    const handleCloseModal = () => {
        setShowModalEdit(false);
        setSelectedGrupo(null);
    };
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Grupos Registrados</h2>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Periodo</th>
                        <th className="border border-gray-300 p-2">Modalidad</th>
                        <th className="border border-gray-300 p-2">Nº de Estudiantes</th>
                        <th className="border border-gray-300 p-2">Nº de Vacantes</th>
                        <th className="border border-gray-300 p-2">Ciclo</th>
                        <th className="border border-gray-300 p-2">Horario</th>
                        <th className="border border-gray-300 p-2">Docente</th>
                        <th className="border border-gray-300 p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {grupos.data?.map((grupo) => (
                        <tr key={grupo.id}>
                            <td className="border border-gray-300 p-2">{grupo.periodo}</td>
                            <td className="border border-gray-300 p-2">{grupo.modalidad}</td>
                            <td className="border border-gray-300 p-2">{grupo.nroEstudiantes}</td>
                            <td className="border border-gray-300 p-2">{grupo.nroVacantes}</td>
                            <td className="border border-gray-300 p-2">{grupo.ciclo.idioma.nombre} {grupo.ciclo.nombre} {grupo.ciclo.nivel}</td>
                            <td className="border border-gray-300 p-2">{grupo.horario}</td>
                            <td className="border border-gray-300 p-2">
                                {grupo.docente ? `${grupo.docente.nombres} ${grupo.docente.aPaterno}` : 'N/A'}
                            </td>
                            <td className="border border-gray-300 p-2">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleShowModal(grupo)}
                                        className="text-[#800020] hover:text-[#6A4E3C] mr-2"
                                    >
                                        <img src="/imagenes/editar.png" alt="Editar" className="h-5 w-5" />
                                    </button>
                                    <Link
                                        href={`/gestionestudiantesgrupo?grupo=${grupo.id}`}
                                        className="text-green-600 hover:text-green-900 transition-colors flex items-center"
                                    >
                                        <img
                                            src="/imagenes/ojo.png"
                                            alt="Ver Estudiantes"
                                            className="mr-2 w-5 h-5"
                                        />
                                    </Link>
                                </div>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            {showModalEdit && selectedGrupo && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] border-2 border-gray-300">
                         <GestionGrupos selectGrupo={selectedGrupo} ciclos={ciclos} docentes={docentes}></GestionGrupos>
                        <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cerrar 
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

