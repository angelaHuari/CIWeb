import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import TablaInscripciones from './TablaInscripciones';
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
                    <div className="overflow-hidden bg-amber-50 shadow-xl sm:rounded-lg mb-10">
                        <div className="p-8 text-gray-800 text-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center mx-auto">
                                {/* Card Inscripciones Aprobadas */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                                    onClick={() => {
                                        setVerForm(true);
                                        setIns(null);
                                    }}
                                    aria-label="Inscripciones Aprobadas"
                                    tabIndex="0"
                                >
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Inscripciones Pendientes</h4>
                                    <p className="text-[#F5D0A9] text-sm">Consulta los formularios de inscripción pendientes de aprobación.</p>
                                </div>

                                {/* Card Inscripciones Desaprobadas */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                                    onClick={() => {
                                        setVerForm(true);
                                        setIns(null);
                                    }}
                                    aria-label="Inscripciones Desaprobadas"
                                    tabIndex="0"
                                >
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Inscripciones Aprobadas</h4>
                                    <p className="text-[#F5D0A9] text-sm">Consulta los formularios de inscripción aprobadas.</p>
                                </div>
                            </div>

                            {/* Mostrar el contenido dependiendo de la vista seleccionada */}
                            <div className="mt-8">
                                {ins === null && verTabla(verForm)}
                                {ins != null && verFormulario(true)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}