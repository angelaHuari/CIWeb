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
            return (
                <div className="text-center p-6">
                    <h3 className="text-2xl text-[#800020]">Selecciona una opción para ver más detalles.</h3>
                </div>
            );
        } else {
            return (
                <div className="text-center p-6">
                    <ResumenInscripcion inscripcion={ins}></ResumenInscripcion>
                </div>
            );
        }
    };

    const verTabla = (ver) => {
        if (ver === false) {
            return (
                <div className="text-center p-6">
                    <h3 className="text-2xl text-[#800020]">Selecciona una opción para ver más detalles.</h3>
                </div>
            );
        } else {
            return (
                <div className="text-center p-6">
                    <TablaInscripciones inscripciones={ListaFormularios} setIns={setIns}></TablaInscripciones>
                </div>
            );
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg text-center">
                    Verificacion del Formulario de Inscripcion
                </h2>
            }
        >
            <Head title="SGMCI" />

            <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen flex items-center justify-center">
                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-amber-50 shadow-xl sm:rounded-lg">
                        <div className="p-8 text-gray-800 text-center">
                            {ins === null && verTabla(true)}
                            {ins != null && verFormulario(true)}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}