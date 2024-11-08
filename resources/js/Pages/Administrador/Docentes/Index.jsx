import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import FormularioDocentes from './FormularioDocentes';

export default function Index({ ListaDocentes }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg text-center">
                   Docentes
                </h2>

            }
        >
            <Head title="SGMCI" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <FormularioDocentes docentes={ListaDocentes} ></FormularioDocentes>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
