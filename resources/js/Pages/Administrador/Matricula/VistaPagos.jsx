import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaFileAlt, FaSearch, FaEye, FaTimesCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md'; // Ícono de cerrar

const VistaPagos = ({ pagos }) => {

    const [search, setSearch] = useState(''); // Estado para el buscador
    const [selectedMatricula, setSelectedMatricula] = useState(null);
    /*const [formularioModal, setFormularioModal] = useState(null);*/ // Estado para manejar el modal de formulario

    // Filtrar matrículas por nombre
    const filteredPagos = pagos.data.filter(pa =>
        pa.matricula.estudiante.aPaterno.toLowerCase().includes(search)
    );

    const handleViewDetailsClick = (pago) => {
        setSelectedMatricula(pago);
    };

    const closeDetailsModal = () => {
        setSelectedMatricula(null);
    };


    return (
        <div className="min-h-screen bg-gradient-to-r from-[#800020] to-[#F5D0A9] py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Buscador */}
                <div className="mb-4 flex justify-center">
                    <div className="relative max-w-sm w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar por Apellido del Estudiante"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                        />
                        <FaSearch className="absolute right-3 top-2 text-gray-500" />
                    </div>
                </div>

                {/* Modal de detalles */}
                {selectedMatricula && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg relative w-[900px] h-[600px] flex"> {/* Aumenté el ancho y alto del modal */}
                            <MdClose
                                className="absolute top-2 right-2 text-2xl text-[#800020] cursor-pointer"
                                onClick={closeDetailsModal}
                            />

                            {/* Columna para los datos (reducida para dar más espacio a la imagen) */}
                            <div className="w-1/3 flex flex-col justify-center">
                                <h3 className="text-2xl font-semibold mb-4">Datos de Matrícula</h3>
                                <p><strong>Estudiante:</strong> {selectedMatricula.matricula.estudiante.nombres} {selectedMatricula.matricula.estudiante.aPaterno} {selectedMatricula.matricula.estudiante.aMaterno}</p>
                                <p><strong>Grupo:</strong> {selectedMatricula.matricula.grupo.periodo} {selectedMatricula.matricula.grupo.ciclo.idioma.nombre} {selectedMatricula.matricula.grupo.ciclo.nombre} {selectedMatricula.matricula.grupo.ciclo.nivel}</p>
                                <h3 className="text-2xl font-semibold mb-4">Datos de Pago</h3>
                                <p><strong>Fecha de Pago:</strong> {selectedMatricula ? new Date(selectedMatricula.fecha).toLocaleDateString() : 'No disponible'}</p>
                                <p><strong>Monto:</strong> {selectedMatricula?.monto || 'No disponible'}</p>
                                <p><strong>Medio de Pago:</strong> {selectedMatricula?.medioPago || 'No disponible'}</p>
                                <p><strong>Nro Voucher:</strong> {selectedMatricula?.nroComprobante || 'No disponible'}</p>
                            </div>

                            {/* Columna para la imagen (más grande y centrada) */}
                            <div className="w-2/3 flex justify-center items-center pl-8">
                                {selectedMatricula?.imgComprobante ? (
                                    <div className="relative w-full h-full flex justify-center items-center">
                                        <img
                                            src={selectedMatricula.imgComprobante}
                                            alt="Foto del Voucher"
                                            className="max-w-[500px] max-h-[500px] object-contain rounded-md" /* Imagen más grande */
                                        />
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Foto del voucher no disponible</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabla de Matrículas */}
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                    <table className="min-w-full table-auto">
                        <thead className="bg-[#800020] text-white">
                            <tr>
                                <th className="px-6 py-3 text-center">Nombres Estudiante</th>
                                <th className="px-6 py-3 text-center">Fecha de Pago</th>
                                <th className="px-6 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPagos.length > 0 ? (
                                filteredPagos.map((ma, index) => (
                                    <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                                        <td className="px-6 py-3">{ma.matricula.estudiante.nombres} {ma.matricula.estudiante.aPaterno} {ma.matricula.estudiante.aMaterno}</td>
                                        <td className="px-6 py-3">{new Date(ma.fecha).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">
                                            <button
                                                onClick={() => handleViewDetailsClick(ma)}
                                                className="text-[#800020] hover:text-[#6A4E3C]"
                                            >
                                                <FaEye className="text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-3 text-center text-gray-500">
                                        No se encontraron matrículas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Paginación */}
                    <div className="mt-4">
                        {pagos.links.map((link, index) => (
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
        </div>
    );
};

export default VistaPagos;
