import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head ,Link} from '@inertiajs/react';
import VistaIdiomas from './VistaIdiomas';

export default function Index({Listaidiomas}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Idiomas
                </h2>
            }
        >
            <Head title="SGMCI" />
            <Link
                href={route('ciclo.index')}
                className='inline-flex items-center border border-transparent rounded-md shadow-sm px-6 py-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800'
            >
                Volver a Ciclos
            </Link>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <VistaIdiomas idiomas={Listaidiomas}></VistaIdiomas>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}