import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const TablaFormularios = ({ formMatriculas = [], search }) => {
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
        //enviar a tabla matriculas y pagos
        setShowForm(false);
        setSelectedForm(null);
    };

    return (
        <div>
            {/* Formulario */}
            {showForm && selectedForm && (
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
                                        value={selectedForm.estudiante.nombres}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno</label>
                                    <input
                                        type="text"
                                        value={selectedForm.estudiante.aPaterno}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno</label>
                                    <input
                                        type="text"
                                        value={selectedForm.estudiante.aMaterno}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Matrícula</label>
                                    <input
                                        type="text"
                                        value={selectedForm.fechaMatricula}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Grupo -Horario</label>
                                    <input
                                        type="text"
                                        value={selectedForm.horarioIngles}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciclo </label>
                                    <input
                                        type="text"
                                        value={selectedForm.cicloIngles}
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
                                        type="date"
                                        value={new Date(selectedForm.fechaPago)}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                                    <input
                                        type="text"
                                        value={selectedForm.montoPago}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Medio de Pago</label>
                                    <input
                                        type="text"
                                        value={selectedForm.medioPago}
                                        readOnly
                                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nro Voucher -Comprobante</label>
                                    <input
                                        type="text"
                                        value={selectedForm.nroComprobante}
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

            {/* Tabla de Formularios Matriculas - Mensualidades */}
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6">
                <table className="min-w-full table-auto">
                    <thead className="bg-[#800020] text-white">
                        <tr>
                            <th className="px-6 py-3 text-center">Nombres Estudiante</th>
                            <th className="px-6 py-3 text-center">Apellido Paterno</th>
                            <th className="px-6 py-3 text-center">Apellido Materno</th>
                            <th className="px-6 py-3 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formMatriculas.data.length > 0 ? (
                            formMatriculas.data.map((form) => (
                                <tr key={form.id} className="border-b hover:bg-[#F4D6C5]">
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
                {/* Paginación */}
                <div className="mt-4">
                    {formMatriculas.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-3 py-1 mx-1 border rounded ${link.active ? 'bg-red-900 text-white' : 'bg-white text-blue-800'
                                }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const VistaFormularios = ({ ListaFormularios }) => {

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