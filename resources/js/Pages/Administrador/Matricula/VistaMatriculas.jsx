import React, { useState } from 'react';
import { FaFileAlt, FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md'; // Ícono de cerrar

const VistaMatriculas = ({matriculas}) => {
    // Datos de matrículas simulados
    /*const matriculas = [
        {
            nombre: 'Juan Pérez',
            fecha: '2024-09-01',
            grupo: { ciclo: { nombre: 'A1' } },
            nota: '85',
            pago: {
                fechaPago: '2024-09-05',
                monto: '150.00',
                medioPago: 'Tarjeta de crédito',
                nroVoucher: '123456',
                fotoVoucher: 'imagenes/modeloo.png'
            }
        },
        {
            nombre: 'Ana García',
            fecha: '2024-08-15',
            grupo: { ciclo: { nombre: 'B2' } },
            nota: '78',
            pago: {
                fechaPago: '2024-09-05',
                monto: '150.00',
                medioPago: 'Tarjeta de crédito',
                nroVoucher: '123456',
                fotoVoucher: 'imagenes/profesor.jpg'
            }
        },
        {
            nombre: 'Carlos López',
            fecha: '2024-07-20',
            grupo: { ciclo: { nombre: 'C3' } },
            nota: '92',
            pago: {
                fechaPago: '2024-07-22',
                monto: '200.00',
                medioPago: 'Efectivo',
                nroVoucher: '7891011',
                fotoVoucher: 'imagenes/modeloo.png'
            }
        }
    ];*/
    const [search, setSearch] = useState(''); // Estado para el buscador
    const [selectedMatricula, setSelectedMatricula] = useState(null);
    /*const [formularioModal, setFormularioModal] = useState(null);*/ // Estado para manejar el modal de formulario

    // Filtrar matrículas por nombre
    const filteredMatriculas = matriculas.data.filter(matricula =>
        matricula.estudiante.aPaterno.toLowerCase().includes(search.toLowerCase())
    );

    const handleViewDetailsClick = (matricula) => {
        setSelectedMatricula(matricula);
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
                            placeholder="Buscar por nombre de estudiante"
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
                                <p><strong>Nombre:</strong> {selectedMatricula.nombre}</p>
                                <p><strong>Fecha de Matrícula:</strong> {new Date(selectedMatricula.fecha).toLocaleDateString()}</p>
                                <p><strong>Grupo:</strong> {selectedMatricula.grupo.ciclo.nombre}</p>
                                <p><strong>Nota Estudiante:</strong> {selectedMatricula.nota || 'No disponible'}</p>
                                <br />
                                <h3 className="text-2xl font-semibold mb-4">Datos de Pago</h3>
                                <p><strong>Fecha de Pago:</strong> {selectedMatricula.pago?.fechaPago ? new Date(selectedMatricula.pago.fechaPago).toLocaleDateString() : 'No disponible'}</p>
                                <p><strong>Monto:</strong> {selectedMatricula.pago?.monto || 'No disponible'}</p>
                                <p><strong>Medio de Pago:</strong> {selectedMatricula.pago?.medioPago || 'No disponible'}</p>
                                <p><strong>Nro Voucher:</strong> {selectedMatricula.pago?.nroVoucher || 'No disponible'}</p>
                            </div>
                           
                            {/* Columna para la imagen (más grande y centrada) */}
                            <div className="w-2/3 flex justify-center items-center pl-8">
                                {selectedMatricula.pago?.fotoVoucher ? (
                                    <div className="relative w-full h-full flex justify-center items-center">
                                        <img
                                            src={selectedMatricula.pago.fotoVoucher}
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
                                <th className="px-6 py-3 text-left">Nombre</th>
                                <th className="px-6 py-3 text-left">Fecha de Matrícula</th>
                                <th className="px-6 py-3 text-left">Grupo</th>
                                <th className="px-6 py-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMatriculas.length > 0 ? (
                                filteredMatriculas.map((matricula, index) => (
                                    <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                                        <td className="px-6 py-3">{matricula.nombre}</td>
                                        <td className="px-6 py-3">{new Date(matricula.fecha).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">{matricula.grupo.ciclo.nombre}</td>
                                        <td className="px-6 py-3">
                                            <button
                                                onClick={() => handleViewDetailsClick(matricula)}
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
                </div>
            </div>
        </div>
    );
};

export default VistaMatriculas;
