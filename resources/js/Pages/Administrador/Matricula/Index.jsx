import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaUserGraduate, FaCreditCard, FaSearch } from 'react-icons/fa';
import React, { useState } from 'react';
import VistaMatriculas from './VistaMatriculas';
import VistaPagos from './VistaPagos';

export default function Index({ ListaMatriculas }) {
    // Estado para controlar qué vista se muestra
    const [view, setView] = useState(null);

    // Estado para el buscador de matrículas
    const [searchMatriculas, setSearchMatriculas] = useState('');

    // Estado para el buscador de pagos
    const [searchPagos, setSearchPagos] = useState('');


    // Función para manejar clics en las tarjetas y cambiar de vista
    const handleCardClick = (value) => {
        setView(value); // Establece la vista de la tarjeta que fue clickeada
    };

    const renderContent = () => {
        if (view === 'Matriculas') {
            return (
                <div className="flex flex-col justify-center mt-10 space-y-4">
                    {/* Buscador de Matrículas */}
                    <div className="flex justify-center mb-4">
                        <div className="relative max-w-sm w-full">
                            <input
                                type="text"
                                placeholder="Buscar por nombre de estudiante o matrícula"
                                className="px-4 py-2 w-96 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-[#800020]"
                                value={searchMatriculas}
                                onChange={(e) => setSearchMatriculas(e.target.value)}
                            />
                            <FaSearch className="absolute right-3 top-2 text-gray-500" />
                        </div>
                    </div>

                    <VistaMatriculas matriculas={ListaMatriculas} search={searchMatriculas} />
                </div>
            );
            
        } else if (view === 'Pagos') {
            return (
                <>
                    <VistaPagos ></VistaPagos>
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
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg text-center">
                    Panel de Control - Matrículas y Pagos
                </h2>
            }
        >
            <Head title="Panel de Control - Centro de Idiomas" />

            {/* Fondo con gradiente suave de granate a color piel */}
            <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Card Principal - Bienvenida */}
                    <div className="overflow-hidden bg-amber-50 shadow-xl sm:rounded-lg mb-10">
                        <div className="p-8 text-gray-800 text-center">


                            {/* Cards Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

                                {/* Card Matrículas */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer"
                                    onClick={() => handleCardClick('Matriculas')}
                                    aria-label="Matrículas"
                                    tabIndex="0"
                                >
                                    <FaUserGraduate className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Matrículas</h4>
                                    <p className="text-[#F5D0A9] text-sm">Gestiona y visualiza las matrículas de los estudiantes.</p>
                                </div>

                                {/* Card Pagos */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer"
                                    onClick={() => handleCardClick('Pagos')}
                                    aria-label="Pagos"
                                    tabIndex="0"
                                >
                                    <FaCreditCard className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Pagos</h4>
                                    <p className="text-[#F5D0A9] text-sm">Administra y revisa los pagos realizados por los estudiantes.</p>
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
