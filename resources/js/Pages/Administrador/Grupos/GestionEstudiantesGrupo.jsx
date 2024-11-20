import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function GestionEstudiantesGrupo({ auth, grupos }) {
    // Obtener todos los estudiantes de todos los grupos
    const estudiantesFiltrados = grupos.flatMap(grupo => grupo.estudiantes || []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestión de Estudiantes por Grupo" />
            
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-[#700303]">Vista de Estudiantes por Grupo</h1>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-[#700303] border border-[#700303]">
                                    <thead className="bg-[#700303] text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nombres y Apellidos</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">DNI</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Celular</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email CI</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Programa</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-[#700303]">
                                        {estudiantesFiltrados.length > 0 ? (
                                            estudiantesFiltrados.map((estudiante) => (
                                                <tr key={estudiante.id} className="hover:bg-[#fce4e4]">
                                                    <td className="px-6 py-4 whitespace-nowrap text-black">
                                                        {`${estudiante.nombres} ${estudiante.aPaterno} ${estudiante.aMaterno}`}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-black">{estudiante.dni}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-black">{estudiante.celular}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-black">{estudiante.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-black">{estudiante.emailInstitucional}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-black">{estudiante.programaEstudios}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 whitespace-nowrap text-center text-[#700303]">
                                                    No hay estudiantes disponibles.
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
