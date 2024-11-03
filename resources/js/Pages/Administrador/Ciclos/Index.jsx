import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/react';
import VistaCiclos from './VistaCiclos';

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

            <Link
                href={route('idioma.index')}
                className='inline-flex items-center border border-transparent rounded-md shadow-sm px-6 py-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800'
            >
                Idiomas
            </Link>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <VistaCiclos 
                            ciclos={ListaCiclos} 
                            idiomas={ListaIdiomas}
                            ></VistaCiclos>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
