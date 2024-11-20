import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Fetch usuarios desde Laravel
        axios.get('/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold text-center text-[#700303] mb-6">
                Usuarios Registrados
            </h1>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table-auto w-full border-collapse border border-[#700303]">
                    <thead className="bg-[#700303] text-white">
                        <tr>
                            {/* Eliminamos el encabezado de ID */}
                            <th className="border border-[#700303] px-6 py-3 text-left">Nombre</th>
                            <th className="border border-[#700303] px-6 py-3 text-left">Email</th>
                            <th className="border border-[#700303] px-6 py-3 text-left">Fecha de Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario, index) => (
                            <tr
                                key={usuario.id}
                                className={
                                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white hover:bg-gray-200'
                                }
                            >
                                {/* Eliminamos la celda del ID */}
                                <td className="border border-[#700303] px-6 py-3 text-[#700303]">
                                    {usuario.name}
                                </td>
                                <td className="border border-[#700303] px-6 py-3 text-[#700303]">
                                    {usuario.email}
                                </td>
                                <td className="border border-[#700303] px-6 py-3 text-center text-[#700303]">
                                    {new Date(usuario.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Usuarios;
