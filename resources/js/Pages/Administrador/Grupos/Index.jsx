import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import GestionGrupos from './GestionGrupos';

export default function Index({ auth, grupos, ciclos, docentes }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold leading-tight text-white">
                        Grupos
                    </h2>
                    <Link
                        href={route('ciclo.index')} // Reemplaza con tu ruta
                        className="bg-white text-[#800020] px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
                    >
                        Ciclos e Idiomas
                    </Link>
                </div>
            }
        >
            <Head title="SGMCI - Gestión de Grupos" />
            
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                <div className="flex-1 bg-white rounded-md">
                                    <GestionGrupos
                                        grupos={grupos}
                                        ciclos={ciclos}
                                        docentes={docentes}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}