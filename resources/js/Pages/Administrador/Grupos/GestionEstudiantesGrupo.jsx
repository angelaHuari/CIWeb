import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function GestionEstudiantesGrupo({ auth, grupos }) {
    const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
    
    const estudiantesFiltrados = grupoSeleccionado
        ? grupos.find(g => g.id === parseInt(grupoSeleccionado))?.estudiantes || []
        : grupos.flatMap(grupo => grupo.estudiantes || []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestió n de Estudiantes por Grupo" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold">Vista de Estudiantes por Grupo</h1>
                            </div>

                            <div className="mb-4">
                                <select
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    value={grupoSeleccionado}
                                    onChange={(e) => setGrupoSeleccionado(e.target.value)}
                                >
                                    <option value="">Todos los grupos</option>
                                    {grupos.map((grupo) => (
                                        <option key={grupo.id} value={grupo.id}>
                                            {grupo.ciclo.idioma.nombre} - Nivel {grupo.ciclo.nivel} - {grupo.modalidad} ({grupo.horario})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres y Apellidos</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DNI</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Celular</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email CI</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programa</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {estudiantesFiltrados.length > 0 ? (
                                            estudiantesFiltrados.map((estudiante) => (
                                                <tr key={estudiante.id}>
                                                    
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {`${estudiante.nombres} ${estudiante.aPaterno} ${estudiante.aMaterno}`}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{estudiante.dni}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{estudiante.celular}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{estudiante.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{estudiante.emailInstitucional}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{estudiante.programaEstudios}</td>
                                                    
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="8" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                                    No hay estudiantes en este grupo.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}