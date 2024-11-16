import React, { useState } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const TablaFormularios = ({ formMatriculas =[], search }) => {
    /*const filteredPagos = formMatriculas.filter(form => 
        form.estudiante.aPaterno.toLowerCase().includes(search.toLowerCase())
    );*/

    const [showForm, setShowForm] = useState(false);
    const [selectedForm, setSelectedForm] = useState(null);

    const handleFormClick = (frm) => {
        setSelectedForm(frm);
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //enviar a tabla formulario_matriculas
        setShowForm(false);
        setSelectedPago(null);
    };

    return (
        <div>
            {/* Formulario */}
            {showForm && selectedPago && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Datos de Matrícula */}
                        <div className="border-b pb-4">
                            <h2 className="text-2xl font-bold mb-4 text-[#800020]">Datos de Matrícula</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                                    <input
                                        type="text"
                                        value={selectedPago.nombre}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno</label>
                                    <input
                                        type="text"
                                        value={selectedPago.nombre}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno</label>
                                    <input
                                        type="text"
                                        value={selectedPago.nombre}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Matrícula</label>
                                    <input
                                        type="text"
                                        value={selectedPago.fecha_matricula}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Grupo</label>
                                    <input
                                        type="text"
                                        value={selectedPago.grupo}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nota Estudiante</label>
                                    <input
                                        type="text"
                                        value={selectedPago.nota}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Datos de Pago */}
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-[#800020]">Datos de Pago</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Pago</label>
                                    <input
                                        type="text"
                                        value={new Date(selectedPago.fecha_pago).toLocaleDateString()}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                                    <input
                                        type="text"
                                        value={selectedPago.monto}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Medio de Pago</label>
                                    <input
                                        type="text"
                                        value={selectedPago.medio_pago}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nro Voucher</label>
                                    <input
                                        type="text"
                                        value={selectedPago.nro_voucher}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Botón Aceptar */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition duration-200"
                            >
                                Aceptar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Tabla de Formularios Matriculas -Mensualidades */}
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6">
                <table className="min-w-full table-auto">
                    <thead className="bg-[#800020] text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Nombre</th>
                            <th className="px-6 py-3 text-left">Apellido Paterno</th>
                            <th className="px-6 py-3 text-left">Apellido Materno</th>
                            <th className="px-6 py-3 text-left">Formulario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formMatriculas.length > 0 ? (
                            formMatriculas.map((form, index) => (
                                <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                                    <td className="px-6 py-3">{form.estudiante.nombres}</td>
                                    <td className="px-6 py-3">{form.estudiante.aPaterno}</td>
                                    <td className="px-6 py-3">{form.estudiante.aMaterno}</td>
                                    <td className="px-6 py-3">
                                        <button 
                                            onClick={() => handleFormClick(form)}
                                            className="text-[#800020] hover:text-[#6A4E3C]"
                                        >
                                            <FaEye className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-3 text-center text-gray-500">No se encontraron Formularios de Matricula.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const VistaFormularios = ({ListaFormularios}) => {
    /*const pagos = [
        { 
            nombre: 'Juan Pérez', 
            monto: 150.00, 
            estado_pago: 'Pagado', 
            fecha_pago: '2024-09-04', 
            medio_pago: 'Tarjeta de crédito', 
            nro_voucher: '123456',
            fecha_matricula: '31/8/2024',
            grupo: 'A1',
            nota: '85'
        },
        { 
            nombre: 'Ana García', 
            monto: 150, 
            estado_pago: 'No Pagado', 
            fecha_pago: '2023-08-18', 
            medio_pago: 'Transferencia', 
            nro_voucher: '67890',
            fecha_matricula: '15/8/2024',
            grupo: 'B2',
            nota: '78'
        },
        { 
            nombre: 'Carlos López', 
            monto: 200, 
            estado_pago: 'Pagado', 
            fecha_pago: '2023-07-25', 
            medio_pago: 'Cheque', 
            nro_voucher: '11223',
            fecha_matricula: '20/7/2024',
            grupo: 'C1',
            nota: '92'
        }
    ];*/

    const [search, setSearch] = useState('');

    return (
        <div className="overflow-hidden bg-gradient-to-r from-[#800020] to-[#F5D0A9] py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Buscador */}
                <div className="mb-4 flex justify-center">
                    <div className="relative max-w-sm w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar por nombre de estudiante"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                        />
                        <FaSearch className="absolute right-3 top-2 text-gray-500" />
                    </div>
                </div>

                {/* Vista de Pagos */}
                <TablaFormularios formMatriculas={ListaFormularios} search={search} />
            </div>
        </div>
    );
};

export default VistaFormularios;