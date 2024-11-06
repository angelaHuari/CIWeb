import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import VistaCiclos from './VistaCiclos';
import VistaIdiomas from '../Idiomas/VistaIdiomas';

export default function Index({ ListaCiclos, ListaIdiomas }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Ciclos
                </h2>

            }
        >
            <Head title="SGMCI" />
            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            {/* Contenedor responsivo con Flexbox */}
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                                {/* Cuadro para VistaCiclos */}
                                <div className="flex-1 bg-white shadow-md rounded-md p-4">
                                    <VistaCiclos
                                        ciclos={ListaCiclos}
                                        idiomas={ListaIdiomas}
                                    />
                                </div>

                                {/* Cuadro para VistaIdiomas */}
                                <div className="flex-1 bg-white shadow-md rounded-md p-4">
                                    <VistaIdiomas idiomas={ListaIdiomas} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}