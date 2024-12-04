
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useForm } from '@inertiajs/react';

const EstudiantesCertificados = ({ certificados = [] }) => {
    const [estudiantes, setEstudiantes] = useState(certificados.data);
    const Mostrar=(id)=>{
        window.open(`/mostrarQR/${id}`, '_blank');
    }
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#800020] to-[#F5D0A9] py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                <h1 className="overflow-x-auto rounded-lg text-white font-semibold " >
                    Estudiantes Certificados
                </h1>
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">

                    <table className="table-auto w-full border-collapse border border-[#700303]">
                        <thead className="bg-[#700303] text-white">
                            <tr>
                                <th className="border border-[#700303] px-6 py-3 text-center">Estudiante</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Codigo de Certificado </th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Accion</th>

                            </tr>
                        </thead>
                        <tbody>
                            {certificados.data.map((est, index) => (
                                <tr
                                    key={est.id}
                                    index={index}
                                    className={
                                        'bg-gray-100 hover:bg-red-200'
                                    }
                                >
                                    <td className="border px-6 py-3 text-black">
                                        {est.estudiante.nombres}
                                    </td>
                                    <td className="border px-6 py-3 text-center  text-black">
                                        {est.codigo}
                                    </td>
                                    <td className="border px-6 py-3  text-black">
                                        <button
                                            onClick={() => Mostrar(est.id)}>
                                            Mostrar
                                        </button>
                                       
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default EstudiantesCertificados;
