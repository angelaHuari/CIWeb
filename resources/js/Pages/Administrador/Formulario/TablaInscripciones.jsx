import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

const TablaInscripciones = ({ inscripciones=[], setIns }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedInscripcion, setSelectedInscripcion] = useState(null);
    const [aceptadas, setAceptadas] = useState(new Set());

    // Add this function to be passed down to ResumenInscripcion
    const handleInscripcionStatus = (id, status) => {
        if (status === 'aceptado') {
            setAceptadas(prev => new Set([...prev, id]));
        } else if (status === 'rechazado') {
            setAceptadas(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    return (
        <div className="overflow-x-auto border border-gray-300 rounded-md">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombres</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Apellido Materno</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Estado</th> {/* Añadir columna de estado */}
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inscripciones.data.map((inscripcion) => (
                        <tr 
                            key={inscripcion.id} 
                            className={`border-t ${inscripcion.estado === 'aceptado' ? 'bg-green-100' : ''}`}
                        >
                            <td className="px-4 py-2 text-sm text-gray-700">{inscripcion.nombres}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{inscripcion.aMaterno}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{inscripcion.estado}</td> {/* Mostrar el estado */}
                            <td className="px-4 py-2 text-sm text-gray-700">
                                <button 
                                    onClick={() => { 
                                        setIns({...inscripcion}); 
                                    }}
                                    className={`flex items-center gap-2 px-3 py-1 rounded ${
                                        inscripcion.estado === 'aceptado' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                                >
                                    <img 
                                        src="/imagenes/ojo.png" 
                                        alt="Ver" 
                                        className="w-4 h-4"
                                    />
                                    {inscripcion.estado === 'aceptado' ? '' : ''}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TablaInscripciones;