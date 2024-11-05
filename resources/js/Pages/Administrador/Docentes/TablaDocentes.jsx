import React, { useState } from 'react';

const TablaDocentes = ({ docentes, onEdit }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDocente, setSelectedDocente] = useState(null);

    const handleShowModal = (docente) => {
        setSelectedDocente(docente);
        setShowModal(true);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Lista de Docentes</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Nombres</th>
                        <th className="py-2 px-4 border-b">Apellido Paterno</th>
                        <th className="py-2 px-4 border-b">Apellido Materno</th>
                        <th className="py-2 px-4 border-b">DNI</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes && docentes.map((docente) => (
                        <tr key={docente.id}>
                            <td className="py-2 px-4 border-b">{docente.nombres}</td>
                            <td className="py-2 px-4 border-b">{docente.aPaterno}</td>
                            <td className="py-2 px-4 border-b">{docente.aMaterno}</td>
                            <td className="py-2 px-4 border-b">{docente.dni}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => onEdit(docente)} // Pasamos el objeto docente completo aquí
                                    className="mr-2 p-1 hover:bg-gray-100"
                                >
                                    <img
                                        src="/images/editar.png"
                                        alt="Editar"
                                        className="h-5 w-5"
                                    />
                                </button>
                                <button
                                    onClick={() => handleShowModal(docente)}
                                    className="p-1 hover:bg-gray-100"
                                >
                                    <img
                                        src="/images/ojo.png"
                                        alt="Ver más"
                                        className="h-5 w-5"
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && selectedDocente && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4">
                        <h2 className="text-xl font-bold mb-4">Detalles del Docente</h2>
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-2">
                                <p><strong>Nombres:</strong> {selectedDocente.nombres}</p>
                                <p><strong>Apellido Paterno:</strong> {selectedDocente.aPaterno}</p>
                                <p><strong>Apellido Materno:</strong> {selectedDocente.aMaterno}</p>
                                <p><strong>DNI:</strong> {selectedDocente.dni}</p>
                                <p><strong>Sexo:</strong> {selectedDocente.sexo}</p>
                                <p><strong>Celular:</strong> {selectedDocente.celular}</p>
                                <p><strong>Fecha de Nacimiento:</strong> {selectedDocente.fechaNacimiento}</p>
                                <p><strong>Email Institucional:</strong> {selectedDocente.emailInstitucional}</p>
                            </div>
                            {selectedDocente.fotoDocente && (
                                <div className="flex-shrink-0">
                                    {selectedDocente.fotoDocente ? (
                                        <img
                                            src={selectedDocente.fotoDocente}
                                            alt={`${selectedDocente.nombres} ${selectedDocente.aPaterno}`}
                                            className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300"
                                        />
                                    ) : (
                                        <div className="h-32 w-32 flex items-center justify-center border-2 border-gray-300 rounded-lg">
                                            <span className="text-gray-500">No hay imagen</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedDocente(null);
                                }}
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TablaDocentes;