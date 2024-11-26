import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUsers, FaLayerGroup } from 'react-icons/fa';
import React, { useState } from 'react';
import GestionGrupos from './GestionGrupos';
import CiclosIndex from '../Ciclos/Index';  // Renombramos el componente importado
import GestionEstudiantesGrupo from './GestionEstudiantesGrupo';

export default function Index({ auth, grupos, ciclos, docentes }) {
    const [view, setView] = useState(null); // Estado para controlar qué vista se muestra
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState(null);
    const [isEstudiantesModalOpen, setIsEstudiantesModalOpen] = useState(false);
    const [selectedGrupoEstudiantes, setSelectedGrupoEstudiantes] = useState(null);

    // Función para manejar clics en las tarjetas y cambiar de vista
    const handleCardClick = (value) => {
        setView(value); // Establece la vista de la tarjeta que fue clickeada
    };

    const handleEdit = (grupo) => {
        setSelectedGrupo(grupo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGrupo(null);
    };

    const handleVerEstudiantes = (grupo) => {
        console.log('Grupo seleccionado:', grupo); // Para depuración
        setSelectedGrupoEstudiantes(grupo);
        setIsEstudiantesModalOpen(true);
    };

    const handleCloseEstudiantesModal = () => {
        setIsEstudiantesModalOpen(false);
        setSelectedGrupoEstudiantes(null);
    };

    const renderContent = () => {
        if (view === 'formulario') {
            return <GestionGrupos grupos={grupos} ciclos={ciclos} docentes={docentes} />;
        } else if (view === 'lista') {
            return (
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Lista de Grupos</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto whitespace-nowrap">
                            <thead className="bg-[#800020] text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '120px' }}>Periodo</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '120px' }}>Modalidad</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '180px' }}>Número de Estudiantes</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '160px' }}>Número de Vacantes</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '160px' }}>Horario</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '200px' }}>Docente</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '100px' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grupos.data?.map((grupo) => (
                                    <tr key={grupo.id} className="border-b hover:bg-[#F4D6C5] cursor-pointer">
                                        <td className="px-6 py-3">{grupo.periodo || 'No disponible'}</td>
                                        <td className="px-6 py-3">{grupo.modalidad || 'No disponible'}</td>
                                        <td className="px-6 py-3">{grupo.nroEstudiantes || 'No disponible'}</td>
                                        <td className="px-6 py-3">{grupo.nroVacantes || 'No disponible'}</td>
                                        <td className="px-6 py-3">{grupo.horario || 'No disponible'}</td>
                                        <td className="px-6 py-3">
                                            {grupo.docente ? `${grupo.docente.nombres} ${grupo.docente.aPaterno}` : 'N/A'}
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleEdit(grupo)}
                                                    className="text-[#800020] hover:text-[#6A4E3C] mr-2"
                                                >
                                                    <img src="/imagenes/editar.png" alt="Editar" className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleVerEstudiantes(grupo)}
                                                    className="text-green-600 hover:text-green-900 transition-colors flex items-center"
                                                >
                                                    <img src="/imagenes/ojo.png" alt="Ver Estudiantes" className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="text-center p-6">
                    <h3 className="text-2xl text-[#800020]">Selecciona una opción para ver más detalles.</h3>
                </div>
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold leading-tight text-white">
                        Gestión de Grupos
                    </h2>
                    <Link
                        href={route('ciclo.index')} // Reemplaza con tu ruta
                        className="bg-white text-[#800020] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
                    >
                        Ciclos e Idiomas
                    </Link>
                </div>
            }
        >
            <Head title="SGMCI - Gestión de Grupos" />

            <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen flex items-center justify-center">
                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    {/* Card Principal - Bienvenida */}
                    <div className="overflow-hidden bg-amber-50 shadow-xl sm:rounded-lg mb-10">
                        <div className="p-8 text-gray-800 text-center">
                            {/* Cards Section - Centrado */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center mx-auto">
                                {/* Card Gestión de Grupos */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                                    onClick={() => handleCardClick('formulario')}
                                    aria-label="Gestión de Grupos"
                                    tabIndex="0"
                                >
                                    <FaUsers className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Formulario de Grupos</h4>
                                    <p className="text-[#F5D0A9] text-sm">Gestiona los grupos, ciclos e idiomas asociados para los estudiantes.</p>
                                </div>

                                {/* Card Ciclos e Idiomas */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                                    onClick={() => handleCardClick('lista')}
                                    aria-label="Ciclos e Idiomas"
                                    tabIndex="0"
                                >
                                    <FaLayerGroup className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Lista de Grupos</h4>
                                    <p className="text-[#F5D0A9] text-sm">Lista los grupos disponibles en tu sistema.</p>
                                </div>
                            </div>

                            {/* Mostrar el contenido dependiendo de la vista seleccionada */}
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
                    <div className="relative p-8 bg-white w-full max-w-4xl m-auto rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-[#800020]">Editar Grupo</h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <GestionGrupos
                            grupos={grupos}
                            ciclos={ciclos}
                            docentes={docentes}
                            editingGrupo={selectedGrupo}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            )}

            {/* Estudiantes Modal */}
            {isEstudiantesModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex">
                    <div className="relative p-8 bg-white w-full max-w-6xl m-auto rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-[#800020]">
                                Lista de Estudiantes - {selectedGrupoEstudiantes?.periodo} {selectedGrupoEstudiantes?.modalidad}
                            </h2>
                            <button
                                onClick={handleCloseEstudiantesModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <GestionEstudiantesGrupo
                            auth={auth}
                            grupos={selectedGrupoEstudiantes ? [selectedGrupoEstudiantes] : []}
                            isModal={true}
                        />
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
