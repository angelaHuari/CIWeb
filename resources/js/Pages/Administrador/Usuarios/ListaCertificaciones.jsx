import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useForm } from '@inertiajs/react';

const ListaCertificaciones = ({ estudiantesC = [] }) => {
    const [estudiantes, setEstudiantes] = useState(estudiantesC);
    const [modal, setModal] = useState(false);
    const [selectedEst, setSelectedEst] = useState(null);

    const { data, setData, post, errors, reset } = useForm({
        nombre: '',
        idEst: '',
    });

    // Maneja la acción de certificar
    const Certificar = (est) => {
        setModal(true);
        setSelectedEst(est);
        setData({
            ...data, // Mantenemos los datos existentes
            nombre:`${est.estudiante.nombres} ${est.estudiante.aPaterno} ${est.estudiante.aMaterno}`,
            idEst: est.estudiante.id,
        });

    };

    // Cierra el modal y resetea los datos
    const closeDetailsModal = () => {
        setSelectedEst(null);
        setModal(false);
        reset(); // Se llama a reset como función
    };

    // Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('generar.certificado')); // Enviar datos del formulario
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#800020] to-[#F5D0A9] py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Modal de certificación */}
                {selectedEst && modal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg relative w-[900px] h-[600px] flex">
                            {/* Aumenté el ancho y alto del modal */}
                            <MdClose
                                className="absolute top-2 right-2 text-2xl text-[#800020] cursor-pointer"
                                onClick={closeDetailsModal}
                            />
                            {/* Formulario de certificación */}
                            <div className="w-1/3 flex flex-col justify-center">
                                <form onSubmit={handleSubmit}>
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={`${selectedEst.estudiante.nombres} ${selectedEst.estudiante.aPaterno} ${selectedEst.estudiante.aMaterno}`} 
                                        disabled
                                    />
                                    <button type="submit">Generar certificado</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <h1 className="overflow-x-auto rounded-lg text-white font-semibold">Certificaciones</h1>

                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                    <table className="table-auto w-full border-collapse border border-[#700303]">
                        <thead className="bg-[#700303] text-white">
                            <tr>
                                <th className="border border-[#700303] px-6 py-3 text-center">Estudiante</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Certificar a</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map((est) => (
                                <tr key={est.id} className="bg-gray-100 hover:bg-red-200">
                                    <td className="border px-6 py-3 text-black">{est.estudiante.nombres}</td>
                                    <td className="border px-6 py-3 text-center text-black">{est.grupo.ciclo.nombre}</td>
                                    <td className="border px-6 py-3 text-black">
                                        <button onClick={() => Certificar(est)}>Certificar</button>
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

export default ListaCertificaciones;
