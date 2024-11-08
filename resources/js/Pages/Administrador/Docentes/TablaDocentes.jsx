import React, { useState } from 'react';

const TablaDocentes = ({ docentes, onEdit }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDocente, setSelectedDocente] = useState(null);

    const handleShowModal = (docente) => {
        setSelectedDocente(docente);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDocente(null);
    };

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Lista de Docentes</h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Nombres</th>
                        <th className="border px-4 py-2">Apellido Paterno</th>
                        <th className="border px-4 py-2">Apellido Materno</th>
                        <th className="border px-4 py-2">Celular</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.length > 0 ? (
                        docentes.map((docente) => (
                            <tr key={docente.id}>
                                <td className="border px-4 py-2">{docente.nombres}</td>
                                <td className="border px-4 py-2">{docente.aPaterno}</td>
                                <td className="border px-4 py-2">{docente.aMaterno}</td>
                                <td className="border px-4 py-2">{docente.celular}</td>
                                <td className="border px-4 py-2">{docente.emailInstitucional}</td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => onEdit(docente)} className="mr-2">
                                        <img src="/imagenes/editar.png" alt="Editar" className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleShowModal(docente)}>
                                        <img src="/imagenes/ojo.png" alt="Ver más" className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="border px-4 py-2 text-center">
                                No hay docentes disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showModal && selectedDocente && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] border-2 border-gray-300 flex">
                        
                        {/* Información del docente en el estilo de un DNI horizontal */}
                        <div className="flex-1 text-left pr-4">
                            <h3 className="text-lg font-semibold mb-2">Detalles del Docente</h3>
                            <p><strong>Nombres:</strong> {selectedDocente.nombres}</p>
                            <p><strong>Apellido Paterno:</strong> {selectedDocente.aPaterno}</p>
                            <p><strong>Apellido Materno:</strong> {selectedDocente.aMaterno}</p>
                            <p><strong>DNI:</strong> {selectedDocente.dni}</p>
                            <p><strong>Celular:</strong> {selectedDocente.celular}</p>
                            <p><strong>Email Institucional:</strong> {selectedDocente.emailInstitucional}</p>
                            <p><strong>Fecha de Nacimiento:</strong> {selectedDocente.fechaNacimiento}</p>
                            <p><strong>Sexo:</strong> {selectedDocente.sexo}</p>
                        </div>

                        {/* Foto del docente alineada a la derecha con etiqueta "Foto" */}
                        <div className="flex-shrink-0 ml-8 text-center">
                            <p className="font-semibold mb-2">Foto</p>
                            {selectedDocente.fotoDocente ? (
                                <img
                                    src={selectedDocente.fotoDocente}
                                    alt="Foto del Docente"
                                    className="border rounded-lg"
                                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                />
                            ) : (
                                <div
                                    className="border rounded-lg bg-gray-200 flex items-center justify-center"
                                    style={{ width: '200px', height: '200px' }}
                                >
                                    <span className="text-gray-500">Sin Foto</span>
                                </div>
                            )}
                        </div>

                    </div>
                    
                    <button
                        onClick={handleCloseModal}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded fixed bottom-8"
                    >
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
};

export default TablaDocentes;