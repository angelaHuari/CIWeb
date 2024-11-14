import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaClipboardCheck, FaBook, FaCalendarAlt } from 'react-icons/fa';
import AuthenticatedLayoutDoc from '@/Layouts/AuthenticatedLayoutDoc';
import { Head } from '@inertiajs/react';
import ListarEstudiantes from '../../Components/ListarEstudiantes';
import FiltroEstudiante from '../../Components/FiltroEstudiante'; // Importa el filtro

const Dashboard = ({ groups }) => {
    const [teacherGroups, setTeacherGroups] = useState(groups);
    const [selectedCard, setSelectedCard] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const [showStudentFilter, setShowStudentFilter] = useState(false); // Estado para mostrar el filtro y la lista

    const handleCardClick = (cardType) => {
        if (cardType === 'groups') {
            setShowStudentFilter(true); // Muestra el filtro y la lista cuando se hace clic en "Ver Grupos"
        } else {
            setShowStudentFilter(false); // Si se hace clic en otro tipo de tarjeta, oculta el filtro y la lista
        }
        setSelectedCard(cardType);
    };

    const handleFilterChange = (filters) => {
        // Simulación de filtrado de estudiantes basado en los filtros
        const estudiantesFiltrados = [
            { id: 1, nombre: 'Juan Pérez', ciclo: 'Básico', nivel: '1', modalidad: 'Presencial', horario: 'Mañana'},
            { id: 2, nombre: 'Ana Gómez', ciclo: 'Intermedio', nivel: '2', modalidad: 'Virtual', horario: 'Tarde' },
            { id: 3, nombre: 'Carlos Díaz', ciclo: 'Avanzado', nivel: '3', modalidad: 'Presencial', horario: 'Noche' },
        ].filter(estudiante => {
            return (
                (!filters.ciclo || estudiante.ciclo === filters.ciclo) &&
                (!filters.nivel || estudiante.nivel === filters.nivel) &&
                (!filters.modalidad || estudiante.modalidad === filters.modalidad) &&
                (!filters.horario || estudiante.horario === filters.horario)
            );
        });

        setFilteredData(estudiantesFiltrados);
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

            <div
                className="relative w-full h-[80vh] bg-cover bg-center"
                style={{ backgroundImage: "url('/imagenes/profesor.jpg')" }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <h3 className="text-4xl text-white font-semibold z-10">Bienvenido</h3>
                </div>
            </div>


            {/* Contenedor para las tarjetas */}
            <div className="py-12 flex items-center justify-center">
                <div className="max-w-full w-full px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Tarjetas de control */}
                        <div
                            onClick={() => handleCardClick('groups')}
                            className="bg-[#9b1c31] p-6 rounded-lg shadow-xl hover:shadow-2xl hover:bg-[#8e735b] transition-all cursor-pointer transform hover:scale-105 relative group"
                        >
                            <FaGraduationCap className="text-[#F5D0A9] text-4xl mb-4 relative z-10 group-hover:text-[#F2C49B]" />
                            <h4 className="text-lg font-semibold text-[#F5D0A9] relative z-10 group-hover:text-[#F2C49B]">Ver Grupos</h4>
                            <p className="text-[#F5D0A9] text-sm relative z-10 group-hover:text-[#F2C49B]">Consulta los grupos de estudiantes asignados para tus clases.</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Mostrar filtro y lista de estudiantes solo si la tarjeta "Ver Grupos" fue seleccionada */}
            {showStudentFilter && (
                <>
                    <FiltroEstudiante onFilter={handleFilterChange} />
                    <ListarEstudiantes estudiantes={filteredData} />
                </>
            )}
        </AuthenticatedLayoutDoc>
    );
};

export default Dashboard;
