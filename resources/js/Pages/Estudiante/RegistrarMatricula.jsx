import AuthenticatedLayoutEst from '@/Layouts/AuthenticatedLayoutEst';
import { Head } from '@inertiajs/react';
import { FaClipboardCheck, FaHandsHelping, FaLightbulb, FaComments, FaShieldAlt } from 'react-icons/fa';
import { useState } from 'react';
import InterfazUsoEstudiantes from './InterfazUsoEstudiantes';


export default function RegistrarMatricula() {
    return (
        <AuthenticatedLayoutEst
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg text-center">
                    Registrar Matriculas
                </h2>
            }
        >
            <Head title="Panel de Control - Centro de Idiomas" />

            {/* Fondo con gradiente suave de granate a color piel */}
            <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <InterfazUsoEstudiantes
                    ></InterfazUsoEstudiantes>
                </div>
            </div>
        </AuthenticatedLayoutEst>
    );
}