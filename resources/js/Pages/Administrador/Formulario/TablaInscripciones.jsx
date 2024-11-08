import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

const TablaInscripciones = ({ inscripciones=[] ,setIns }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedInscripcion, setSelectedInscripcion] = useState(null);

    return (
        <div className="overflow-x-auto border border-gray-300 rounded-md">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nombres</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Apellido Materno</th>
                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inscripciones.data.map((inscripcion) => (
                        <tr key={inscripcion.id} className="border-t">
                            <td className="px-4 py-2 text-sm text-gray-700">{inscripcion.nombres}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">{inscripcion.aMaterno}</td>
                            <td className="px-4 py-2 text-sm text-gray-700">
                                <button onClick={() => { setIns(inscripcion); }}>VerForm</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
}
export default TablaInscripciones;