import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaClipboardCheck, FaHandsHelping, FaLightbulb, FaComments, FaShieldAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function Dashboard() {
    const [info, setInfo] = useState('');

    // Función para manejar clics en los valores
    const handleCardClick = (value) => {
        if (value === 'Responsabilidad') {
            setInfo('La responsabilidad es clave para el éxito de cualquier organización.');
        } else if (value === 'Empatía') {
            setInfo('La empatía nos permite entender y conectar con los demás.');
        } else if (value === 'Creatividad') {
            setInfo('La creatividad es fundamental para encontrar soluciones innovadoras.');
        } else if (value === 'Comunicación') {
            setInfo('Una buena comunicación facilita la colaboración y el entendimiento.');
        } else if (value === 'Integridad') {
            setInfo('La integridad es la base de una ética sólida y relaciones de confianza.');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-red-700 to-red-900 p-4 rounded-lg shadow-lg text-center">
                    Panel de Control del Administrador
                </h2>
            }
        >
            <Head title="Panel de Control - Centro de Idiomas" />

            {/* Fondo con gradiente suave */}
            <div className="py-12 bg-gradient-to-b from-red-600 to-red-800 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Card Principal - Bienvenida */}
                    <div className="overflow-hidden bg-white shadow-lg sm:rounded-lg mb-10">
                        <div className="p-8 text-gray-800 text-center">
                            {/* Sección de imágenes */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                                {/* Imagen 1 - Logo */}
                                <div className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
                                    <img
                                        src="/imagenes/Ins.png" // Ruta de tu logo
                                        alt="Logo de la aplicación"
                                        className="w-full h-40 object-contain" // Ajustar el tamaño de la imagen
                                    />
                                </div>

                                {/* Imagen 2 - Idiomas */}
                                <div className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
                                    <img
                                        src="/imagenes/idiomaE.jpg" // Ruta de la tercera imagen
                                        alt="Idiomas"
                                        className="w-full h-40 object-contain" // Ajustar el tamaño de la imagen
                                    />
                                </div>

                                {/* Imagen 3 - Curso de Inglés */}
                                <div className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
                                    <img
                                        src="/imagenes/inglesCurso.jpg" // Ruta de la segunda imagen
                                        alt="Curso de Inglés"
                                        className="w-full h-40 object-contain" // Ajustar el tamaño de la imagen
                                    />
                                </div>
                            </div>

                            <h3 className="text-2xl font-semibold mb-4 text-red-700">
                                ¡Bienvenido al Panel de Control!
                            </h3>
                            <p className="mb-6 text-gray-600">
                                Aquí podrás gestionar todas las configuraciones necesarias para el correcto funcionamiento de la aplicación.
                                Utiliza las opciones en el menú para navegar entre las distintas secciones y realizar las acciones que necesites.
                            </p>
                            <h3 className="text-2xl font-semibold mb-4 text-red-800">
                                Nuestros Valores
                            </h3>

                            {/* Información adicional al hacer clic */}
                            {info && (
                                <div className="bg-red-300 p-4 rounded-lg shadow-md mb-6 text-center text-gray-800">
                                    <p>{info}</p>
                                </div>
                            )}

                            {/* Cards Section - Valores */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {/* Card Responsabilidad */}
                                <div
                                    className="bg-gradient-to-r from-red-700 to-red-900 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                                    onClick={() => handleCardClick('Responsabilidad')}
                                    aria-label="Responsabilidad"
                                    tabIndex="0"
                                >
                                    <FaClipboardCheck className="text-yellow-400 text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-yellow-500" />
                                    <h4 className="text-lg font-semibold text-white">Responsabilidad</h4>
                                    <p className="text-gray-100 text-sm">Nos comprometemos a cumplir con nuestras tareas y obligaciones.</p>
                                </div>

                                {/* Card Empatía */}
                                <div
                                    className="bg-gradient-to-r from-red-700 to-orange-600 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                                    onClick={() => handleCardClick('Empatía')}
                                    aria-label="Empatía"
                                    tabIndex="0"
                                >
                                    <FaHandsHelping className="text-yellow-400 text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-yellow-500" />
                                    <h4 className="text-lg font-semibold text-white">Empatía</h4>
                                    <p className="text-gray-100 text-sm">Escuchamos y comprendemos las necesidades de los demás.</p>
                                </div>

                                {/* Card Creatividad */}
                                <div
                                    className="bg-gradient-to-r from-red-800 to-orange-500 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                                    onClick={() => handleCardClick('Creatividad')}
                                    aria-label="Creatividad"
                                    tabIndex="0"
                                >
                                    <FaLightbulb className="text-yellow-400 text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-yellow-500" />
                                    <h4 className="text-lg font-semibold text-white">Creatividad</h4>
                                    <p className="text-gray-100 text-sm">Buscamos soluciones innovadoras para superar desafíos.</p>
                                </div>
                            </div>

                            {/* Additional Cards Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                                {/* Card Comunicación */}
                                <div
                                    className="bg-gradient-to-r from-red-900 to-red-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                                    onClick={() => handleCardClick('Comunicación')}
                                    aria-label="Comunicación"
                                    tabIndex="0"
                                >
                                    <FaComments className="text-yellow-400 text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-yellow-500" />
                                    <h4 className="text-lg font-semibold text-white">Comunicación</h4>
                                    <p className="text-gray-100 text-sm">Mantenemos un diálogo abierto y honesto.</p>
                                </div>

                                {/* Card Integridad */}
                                <div
                                    className="bg-gradient-to-r from-red-900 to-red-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                                    onClick={() => handleCardClick('Integridad')}
                                    aria-label="Integridad"
                                    tabIndex="0"
                                >
                                    <FaShieldAlt className="text-yellow-400 text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-yellow-500" />
                                    <h4 className="text-lg font-semibold text-white">Integridad</h4>
                                    <p className="text-gray-100 text-sm">Actuamos con honestidad y ética en todas nuestras interacciones.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
