import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaUserGraduate, FaCreditCard, FaRegListAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function Dashboard() {
    const [info, setInfo] = useState('');
    const [view, setView] = useState(null); // Estado para controlar qué vista se muestra

    // Datos simulados para mostrar en las tablas
    const matriculas = [
        { nombre: 'Juan Pérez', tipo_pago: 'Transferencia', no_voucher: 'V123', fecha_pago: '2023-09-15' },
        { nombre: 'Ana García', tipo_pago: 'Efectivo', no_voucher: 'V456', fecha_pago: '2023-08-18' },
        { nombre: 'Carlos López', tipo_pago: 'Tarjeta', no_voucher: 'V789', fecha_pago: '2023-07-25' }
    ];

    const pagos = [
        { nombre: 'Juan Pérez', monto: 100, tipo_pago: 'Transferencia', no_voucher: 'V123', fecha_pago: '2023-09-15' },
        { nombre: 'Ana García', monto: 150, tipo_pago: 'Efectivo', no_voucher: 'V456', fecha_pago: '2023-08-18' },
        { nombre: 'Carlos López', monto: 200, tipo_pago: 'Tarjeta', no_voucher: 'V789', fecha_pago: '2023-07-25' }
    ];

    // Función para manejar clics en las tarjetas y cambiar de vista
    const handleCardClick = (value) => {
        setView(value); // Establece la vista de la tarjeta que fue clickeada
    };

    // Función para mostrar la tabla de Matrículas
    const renderMatriculasTable = () => {
        return (
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                <table className="min-w-full table-auto">
                    <thead className="bg-[#800020] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-left">Tipo de Pago</th>
                            <th className="px-6 py-3 text-left">No. Voucher</th>
                            <th className="px-6 py-3 text-left">Fecha de Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matriculas.map((matricula, index) => (
                            <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                                <td className="px-6 py-3">{matricula.nombre}</td>
                                <td className="px-6 py-3">{matricula.tipo_pago}</td>
                                <td className="px-6 py-3">{matricula.no_voucher}</td>
                                <td className="px-6 py-3">{new Date(matricula.fecha_pago).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    // Función para mostrar la tabla de Pagos
    const renderPagosTable = () => {
        return (
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                <table className="min-w-full table-auto">
                    <thead className="bg-[#800020] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-left">Monto</th>
                            <th className="px-6 py-3 text-left">Tipo de Pago</th>
                            <th className="px-6 py-3 text-left">No. Voucher</th>
                            <th className="px-6 py-3 text-left">Fecha de Pago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagos.map((pago, index) => (
                            <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                                <td className="px-6 py-3">{pago.nombre}</td>
                                <td className="px-6 py-3">${pago.monto}</td>
                                <td className="px-6 py-3">{pago.tipo_pago}</td>
                                <td className="px-6 py-3">{pago.no_voucher}</td>
                                <td className="px-6 py-3">{new Date(pago.fecha_pago).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    // Función para mostrar el contenido de la vista seleccionada
    const renderContent = () => {
        if (view === 'Matriculas') {
            return renderMatriculasTable();
        } else if (view === 'Pagos') {
            return renderPagosTable();
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
                            <h3 className="text-2xl font-semibold mb-4 text-[#6A4E3C]">
                                ¡Bienvenido al Panel de Control de Matrículas y Pagos!
                            </h3>
                            <p className="mb-6 text-[#4B4B4B]">
                                Aquí podrás gestionar las matrículas de los estudiantes, revisar los pagos realizados, y generar reportes detallados.
                            </p>

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
