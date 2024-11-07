import React, { useState } from 'react';
import { FaFileAlt, FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md'; // Ícono de cerrar

const VistaMatriculas = () => {
    // Datos de matrículas simulados
    const ListaMatriculas = [
        { 
            nombre: 'Juan Pérez', 
            fechaMatricula: '2023-09-01', 
            estadoPago: 'Pagado', 
            idGrupo: 'A1', 
            formulario: '/path/to/archivo1.pdf' 
        },
        { 
            nombre: 'Ana García', 
            fechaMatricula: '2023-08-15', 
            estadoPago: 'No Pagado', 
            idGrupo: 'B2', 
            formulario: '/path/to/archivo2.pdf' 
        },
        { 
            nombre: 'Carlos López', 
            fechaMatricula: '2023-07-20', 
            estadoPago: 'Pagado', 
            idGrupo: 'C3', 
            formulario: '/path/to/archivo3.pdf' 
        }
    ];

    const [search, setSearch] = useState(''); // Estado para el buscador
    const [formularioModal, setFormularioModal] = useState(null); // Estado para manejar el modal de formulario

    // Filtrar matrículas por nombre
    const filteredMatriculas = ListaMatriculas.filter(matricula =>
        matricula.nombre.toLowerCase().includes(search.toLowerCase())
    );

    // Función para mostrar el formulario en un modal
    const handleFormularioClick = (formularioUrl) => {
        setFormularioModal(formularioUrl);
    };

    // Función para cerrar el modal
    const closeFormularioModal = () => {
        setFormularioModal(null);
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

                {/* Modal de formulario */}
                {formularioModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeFormularioModal}>
                        <div className="bg-white p-4 rounded-lg relative">
                            <MdClose 
                                className="absolute top-2 right-2 text-2xl text-[#800020] cursor-pointer" 
                                onClick={closeFormularioModal} 
                            />
                            <iframe src={formularioModal} title="Formulario" className="w-full h-96" />
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
                                <th className="px-6 py-3 text-left">Estado de Pago</th>
                                <th className="px-6 py-3 text-left">Grupo</th>
                                <th className="px-6 py-3 text-left">Formulario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMatriculas.length > 0 ? (
                                filteredMatriculas.map((matricula, index) => (
                                    <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                                        <td className="px-6 py-3">{matricula.nombre}</td>
                                        <td className="px-6 py-3">{new Date(matricula.fechaMatricula).toLocaleDateString()}</td>
                                        <td className="px-6 py-3">
                                            {matricula.estadoPago === 'Pagado' ? (
                                                <span className="text-green-500 flex items-center">
                                                    <FaCheckCircle className="mr-2" /> Pagado
                                                </span>
                                            ) : (
                                                <span className="text-red-500 flex items-center">
                                                    <FaTimesCircle className="mr-2" /> No Pagado
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3">{matricula.idGrupo}</td>
                                        <td className="px-6 py-3">
                                            {matricula.formulario ? (
                                                <button 
                                                    onClick={() => handleFormularioClick(matricula.formulario)}
                                                    className="text-[#800020] hover:text-[#6A4E3C]">
                                                    <FaFileAlt className="text-xl" />
                                                </button>
                                            ) : (
                                                <span className="text-gray-500">No disponible</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-3 text-center text-gray-500">No se encontraron matrículas.</td>
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
