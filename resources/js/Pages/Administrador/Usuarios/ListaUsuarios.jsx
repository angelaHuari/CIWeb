import React, { useEffect, useState } from 'react';

const ListaUsuarios = ({ ListaUsuarios = [] }) => {
    const [usuarios, setUsuarios] = useState(ListaUsuarios.data);
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#800020] to-[#F5D0A9] py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <h1 className="overflow-x-auto rounded-lg text-white font-semibold " >
                    Usuarios Registrados
                </h1>
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                    <table className="table-auto w-full border-collapse border border-[#700303]">
                        <thead className="bg-[#700303] text-white">
                            <tr>
                                {/* Eliminamos el encabezado de ID */}
                                <th className="border border-[#700303] px-6 py-3 text-center">Nombre</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Email</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Fecha de Registro</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Tipo de Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => (
                                <tr
                                    key={usuario.id}
                                    className={
                                        'bg-gray-100 hover:bg-red-200'
                                    }
                                >
                                    {/* Eliminamos la celda del ID */}
                                    <td className="border px-6 py-3 text-black">
                                    {usuario.tipoUsuario === 'admin' ? (
                                            <span></span>
                                        ) : (
                                            <span> {usuario.name}</span>
                                        )}
                                       
                                    </td>
                                    <td className="border px-6 py-3  text-black">
                                    {usuario.tipoUsuario === 'admin' ? (
                                            <span></span>
                                        ) : (
                                            <span> {usuario.email}</span>
                                        )}
                                       
                                    </td>
                                    <td className="border px-6 py-3 text-center  text-black">
                                        {usuario.tipoUsuario === 'admin' ? (
                                            <span></span>
                                        ) : (
                                            <span> {new Date(usuario.created_at).toLocaleDateString()}</span>
                                        )}

                                    </td>
                                    <td className="border px-6 py-3  text-black">
                                        {usuario.tipoUsuario === 'est' ? (
                                            <span>ESTUDIANTE</span>
                                        ) : usuario.tipoUsuario === 'doc' ? (
                                            <span>DOCENTE</span>
                                        ) : (
                                            <span></span>
                                        )}
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

export default ListaUsuarios;
