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
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Nombres</th>
                        <th className="py-2 px-4 border-b">Apellido Paterno</th>
                        <th className="py-2 px-4 border-b">Apellido Materno</th>
                        <th className="py-2 px-4 border-b">DNI</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.map((docente, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{docente.idDocente}</td>
                            <td className="py-2 px-4 border-b">{docente.nombres}</td>
                            <td className="py-2 px-4 border-b">{docente.aPaterno}</td>
                            <td className="py-2 px-4 border-b">{docente.aMaterno}</td>
                            <td className="py-2 px-4 border-b">{docente.dni}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => onEdit(index)} className="mr-2">
                                    <img
                                        src="/images/editar.png" // Ruta a tu imagen de editar
                                        alt="Editar"
                                        className="h-5 w-5"
                                    />
                                </button>
                                <button onClick={() => handleShowModal(docente)}>
                                    <img
                                        src="/images/ojo.png" // Ruta a tu imagen de ver más
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Detalles del Docente</h2>
            <div className="flex items-center"> {/* Alineación centrada */}
                {/* Información del docente a la izquierda */}
                <div className="flex-3"> {/* Permite que el texto use el espacio restante */}
                    <p><strong>Nombres:</strong> {selectedDocente.nombres}</p>
                    <p><strong>Apellido Paterno:</strong> {selectedDocente.aPaterno}</p>
                    <p><strong>Apellido Materno:</strong> {selectedDocente.aMaterno}</p>
                    <p><strong>DNI:</strong> {selectedDocente.dni}</p>
                    <p><strong>Sexo:</strong> {selectedDocente.sexo}</p>
                    <p><strong>Celular:</strong> {selectedDocente.celular}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {selectedDocente.fechaNacimiento}</p>
                    <p><strong>Email:</strong> {selectedDocente.email}</p>
                    <p><strong>Email Institucional:</strong> {selectedDocente.emailInstitucional}</p>
                </div>

                {/* Foto del docente a la derecha */}
                {selectedDocente.fotoDocente && (
                    <div className="ml-6"> {/* Aumentado el margen izquierdo para separarlo del texto */}
                        <strong>Foto:</strong>
                        <img
                            src={URL.createObjectURL(selectedDocente.fotoDocente)}
                            alt="Foto del Docente"
                            
                        />
                    </div>
                )}
            </div>
            <button onClick={() => setShowModal(false)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Cerrar
            </button>
        </div>
    </div>
)}

        </div>
    );
};

export default TablaDocentes;
