import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUsers, FaLayerGroup } from 'react-icons/fa';
import React, { useState } from 'react';
import GestionGrupos from './GestionGrupos';
import CiclosIndex from '../Ciclos/Index';  // Renombramos el componente importado

export default function Index({ auth, grupos, ciclos, docentes }) {
    const [view, setView] = useState(null); // Estado para controlar qué vista se muestra

    // Función para manejar clics en las tarjetas y cambiar de vista
    const handleCardClick = (value) => {
        setView(value); // Establece la vista de la tarjeta que fue clickeada
    };

    const renderContent = () => {
        // Verifica qué vista está seleccionada
        if (view === 'formulario') {
            return (
                <>
                    <GestionGrupos
                        grupos={grupos}
                        ciclos={ciclos}
                        docentes={docentes}
                    />
                </>

            );
        } else if (view === 'lista') {
            return (
                <>

                </>
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
        </AuthenticatedLayout>
    );
}
