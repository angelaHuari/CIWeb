import { Link } from '@inertiajs/react';
import React from 'react';

function HistorialMatriculas({ matriculas = [] }) {
    return (
        <div className="mt-12 flex justify-center min-h-screen">
            <div className="w-full max-w-5xl">
                {/* Si no hay matrículas */}
                {(!matriculas || matriculas.data.length === 0) ? (
                    <p className="text-white text-center">No hay matrículas registradas en el historial.</p>
                ) : (
                    <div className="overflow-x-auto max-h-96 overflow-y-auto shadow-lg border border-gray-300 rounded-lg">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-[#700303] text-white">
                                    <th className="p-3">Fecha de Matricula </th>
                                    <th className="p-3">Ciclo</th>
                                    <th className="p-3">Horario</th>
                                    <th className="p-3">Calificación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matriculas.data.map((matricula) => (
                                    <tr key={matricula.id} className={`border-b ${matricula.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'} text-center`}>
                                        <td className="p-3">{matricula.fecha}</td>
                                        <td className="p-3">{matricula.grupo.ciclo.nombre}</td>
                                        <td className="p-3">{matricula.grupo.horario}</td>
                                        <td className="p-3">{matricula.nota}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Paginación */}
                        <div className="mt-4">
                            {matriculas.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-1 mx-1 border rounded ${link.active ? 'bg-black text-white' : 'bg-red-900 text-white'
                                        }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HistorialMatriculas;