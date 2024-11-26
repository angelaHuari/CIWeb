import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

const TablaInscripciones = ({ inscripciones=[], setIns, filter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedInscripcion, setSelectedInscripcion] = useState(null);
    const [aceptadas, setAceptadas] = useState(new Set());

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

    const filteredInscripciones = inscripciones.data.filter(inscripcion => inscripcion.estado === filter);

    return (
        <div className="overflow-x-auto border border-gray-300 rounded-md">
            <table className="min-w-full table-auto">
                <thead className="bg-[#800020] text-white">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Nombres</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Apellido Paterno</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Estado</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInscripciones.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="px-4 py-2 text-sm text-gray-700 text-center">
                                No hay inscripciones pendientes
                            </td>
                        </tr>
                    ) : (
                        filteredInscripciones.map((inscripcion) => (
                            <tr 
                                key={inscripcion.id} 
                                className={`border-t ${inscripcion.estado === 'Aceptado' ? 'bg-green-100' : ''}`}
                            >
                                <td className="px-4 py-2 text-sm text-gray-700">{inscripcion.nombres}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{inscripcion.aPaterno}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{inscripcion.estado}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                    <button 
                                        onClick={() => { 
                                            setIns({...inscripcion}); 
                                        }}
                                        className={`flex items-center gap-2 px-3 py-1 rounded ${
                                            inscripcion.estado === 'Aceptado' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-blue-100 text-blue-800'
                                        }`}
                                    >
                                        <img 
                                            src="/imagenes/ojo.png" 
                                            alt="Ver" 
                                            className="w-4 h-4"
                                        />
                                        {inscripcion.estado === 'Aceptado' ? '' : ''}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default TablaInscripciones;