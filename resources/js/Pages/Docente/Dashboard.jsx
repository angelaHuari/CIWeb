import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaClipboardCheck, FaBook, FaCalendarAlt } from 'react-icons/fa';
import AuthenticatedLayoutDoc from '@/Layouts/AuthenticatedLayoutDoc';
import { Head } from '@inertiajs/react';

const Dashboard = ({ groups, grades, schedule }) => {
    const [teacherGroups, setTeacherGroups] = useState(groups);
    const [teacherGrades, setTeacherGrades] = useState(grades);
    const [teacherSchedule, setTeacherSchedule] = useState(schedule);
    
    const [inputCode, setInputCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const validCode = '1234';

    const handleCardClick = (cardType) => {
        setSelectedCard(cardType);
        setModalVisible(true);
        setErrorMessage('');
    };

    const handleCodeSubmit = () => {
        if (inputCode === validCode) {
            setModalVisible(false);
            setInputCode('');
        } else {
            setErrorMessage('Código incorrecto. Intenta nuevamente.');
        }
    };

    useEffect(() => {
        if (!teacherGroups || teacherGroups.length === 0) {
            console.log('No tienes grupos asignados.');
        }
    }, [teacherGroups]);

    return (
        <AuthenticatedLayoutDoc
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#9b1c31] to-[#8e735b] p-6 rounded-lg shadow-xl text-center">
                    Panel de Control - Docente
                </h2>
            }
        >
            <Head title="Dashboard - Docente" />

            {/* Imagen de fondo */}
            <div
    className="relative w-full h-72 bg-cover bg-center"
    style={{
        backgroundImage: "url('/imagenes/profesor.jpg')", // Ruta correcta para imágenes en la carpeta public
    }}
>
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <h3 className="text-3xl text-white font-semibold z-10">Bienvenido </h3>
    </div>
</div>


            {/* Contenedor para las tarjetas */}
            <div className="py-12 min-h-screen flex items-center justify-center">
                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {/* Tarjeta para ver grupos */}
                        <div
                            onClick={() => handleCardClick('groups')}
                            className="bg-[#9b1c31] p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-[#8e735b] transition-all cursor-pointer transform hover:scale-105 relative group"
                        >
                            <FaGraduationCap className="text-[#F5D0A9] text-4xl mb-4 relative z-10 group-hover:text-[#F2C49B]" />
                            <h4 className="text-lg font-semibold text-[#F5D0A9] relative z-10 group-hover:text-[#F2C49B]">
                                Ver Grupos
                            </h4>
                            <p className="text-[#F5D0A9] text-sm relative z-10 group-hover:text-[#F2C49B]">
                                Consulta los grupos de estudiantes asignados para tus clases.
                            </p>
                        </div>

                        {/* Tarjeta para registrar calificaciones */}
                        <div
                            onClick={() => handleCardClick('grades')}
                            className="bg-[#9b1c31] p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-[#8e735b] transition-all cursor-pointer transform hover:scale-105 relative group"
                        >
                            <FaClipboardCheck className="text-[#F5D0A9] text-4xl mb-4 relative z-10 group-hover:text-[#F2C49B]" />
                            <h4 className="text-lg font-semibold text-[#F5D0A9] relative z-10 group-hover:text-[#F2C49B]">
                                Registrar Calificaciones
                            </h4>
                            <p className="text-[#F5D0A9] text-sm relative z-10 group-hover:text-[#F2C49B]">
                                Ingresa las calificaciones de tus estudiantes.
                            </p>
                        </div>

                        {/* Tarjeta para consultar materiales educativos */}
                        <div
                            onClick={() => handleCardClick('materials')}
                            className="bg-[#9b1c31] p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-[#8e735b] transition-all cursor-pointer transform hover:scale-105 relative group"
                        >
                            <FaBook className="text-[#F5D0A9] text-4xl mb-4 relative z-10 group-hover:text-[#F2C49B]" />
                            <h4 className="text-lg font-semibold text-[#F5D0A9] relative z-10 group-hover:text-[#F2C49B]">
                                Materiales Educativos
                            </h4>
                            <p className="text-[#F5D0A9] text-sm relative z-10 group-hover:text-[#F2C49B]">
                                Accede a los materiales educativos de tus clases.
                            </p>
                        </div>

                        {/* Tarjeta para ver horarios */}
                        <div
                            onClick={() => handleCardClick('schedule')}
                            className="bg-[#9b1c31] p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-[#8e735b] transition-all cursor-pointer transform hover:scale-105 relative group"
                        >
                            <FaCalendarAlt className="text-[#F5D0A9] text-4xl mb-4 relative z-10 group-hover:text-[#F2C49B]" />
                            <h4 className="text-lg font-semibold text-[#F5D0A9] relative z-10 group-hover:text-[#F2C49B]">
                                Ver Horarios
                            </h4>
                            <p className="text-[#F5D0A9] text-sm relative z-10 group-hover:text-[#F2C49B]">
                                Consulta tu horario de clases y asegúrate de estar al tanto de tus compromisos académicos.
                            </p>
                        </div>
                    </div>

                    {/* Información Adicional */}
                    <div className="mt-10 text-gray-900">
                        <h4 className="text-xl font-semibold text-[#9b1c31]">Información Adicional</h4>
                        <p className="text-[#8e735b] text-lg mt-2">
                            Aquí podrás encontrar información sobre el estado de tus clases, estudiantes y más.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal para ingresar código */}
            {modalVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg max-w-sm w-full transform transition-all scale-110 shadow-2xl">
                        <h3 className="text-lg font-semibold text-[#9b1c31]">Ingresa el código de acceso</h3>
                        <input
                            type="text"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                            className="w-full p-2 mt-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c31]"
                            placeholder="Código de acceso"
                        />
                        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={handleCodeSubmit}
                                className="bg-[#9b1c31] text-white py-2 px-4 rounded-lg hover:bg-[#8e735b] transition-all"
                            >
                                Validar
                            </button>
                            <button
                                onClick={() => setModalVisible(false)}
                                className="text-gray-500 py-2 px-4 rounded-lg hover:text-[#9b1c31] transition-all"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayoutDoc>
    );
};

export default Dashboard;
