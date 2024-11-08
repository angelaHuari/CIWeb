import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TablaInscripciones from './TablaInscripciones';
import { useState } from 'react';
import ResumenInscripcion from './ResumenIncripcion';

export default function Index({ ListaFormularios }) {
    const [verForm, setVerForm] = useState(false);
    const [ins, setIns] = useState(null);

    
    const verFormulario = (ver) => {
        if (ver === false) {
            <div className="text-center p-6">
                <h3 className="text-2xl text-[#800020]">Selecciona una opción para ver más detalles.</h3>
            </div>
        } else {
            return (
                <div className="text-center p-6">
                    <ResumenInscripcion inscripcion={ins}></ResumenInscripcion>
                </div>
            );
        }
    }
    const verTabla = (ver) => {
        if (ver === false) {
            <div className="text-center p-6">
                <h3 className="text-2xl text-[#800020]">Selecciona una opción para ver más detalles.</h3>
            </div>
        } else {
            verFormulario(false);
            return (
                <div className="text-center p-6">
                    <TablaInscripciones inscripciones={ListaFormularios} setIns={setIns} ></TablaInscripciones>
                </div>
            );
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Verificacion de Formulario
                </h2>
            }
        >
            <Head title="SGMCI" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {ins===null
                            && verTabla(true)}
                            {ins!=null
                            && verFormulario(true)}
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
