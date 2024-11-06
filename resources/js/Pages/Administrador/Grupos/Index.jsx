import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import VistaCiclos from '../Ciclos/VistaCiclos';
import VistaIdiomas from '../Idiomas/VistaIdiomas';
import GestionGrupos from './GestionGrupos';

export default function Index({ ListaGrupos, ListaCiclos, ListaIdiomas, ListaDocentes }) {
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
                                <Link
                                    href={route('ciclo.index')}
                                    className='inline-flex items-center border border-transparent rounded-md shadow-sm px-6 py-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800'
                                >
                                    Ciclos
                                </Link>
                                {/* Cuadro para VistaCiclos */}
                                <div className="flex-1 bg-white shadow-md rounded-md p-4">
                                    <GestionGrupos
                                        ciclos={ListaCiclos}
                                        grupos={ListaGrupos}
                                        docentes={ListaDocentes}
                                    />
                                </div>

                                {/* Cuadro para VistaIdiomas 
                                <div className="flex-1 bg-white shadow-md rounded-md p-4">
                                    <VistaIdiomas idiomas={ListaIdiomas} />
                                </div>

                                 Cuadro para VistaIdiomas 
                                <div className="flex-1 bg-white shadow-md rounded-md p-4">
                                    <VistaCiclos idiomas={ListaIdiomas} ciclos={ListaCiclos} />
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}