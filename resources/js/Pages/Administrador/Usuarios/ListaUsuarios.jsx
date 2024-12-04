import React, { useEffect, useState } from 'react';

const ListaUsuarios = ({ ListaUsuarios = [] }) => {
    const [usuarios, setUsuarios] = useState(ListaUsuarios.data);
    const [currentPage, setCurrentPage] = useState(1);
    const [usuariosPorPagina, setUsuariosPorPagina] = useState(10); // Puedes ajustar esto a la cantidad de usuarios que quieras por página

    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calcular los índices de los usuarios que se deben mostrar en la página actual
    const indexOfLastUsuario = currentPage * usuariosPorPagina;
    const indexOfFirstUsuario = indexOfLastUsuario - usuariosPorPagina;
    const currentUsuarios = usuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(usuarios.length / usuariosPorPagina);

    return (
        <div className="min-h-auto py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                    <table className="table-auto w-full border-collapse border border-[#700303]">
                        <thead className="bg-[#700303] text-white">
                            <tr>
                                <th className="border border-[#700303] px-6 py-3 text-center">Nombre</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Email</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Fecha de Registro</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Tipo de Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsuarios.map((usuario) => (
                                <tr key={usuario.id} className="bg-white hover:bg-red-200">
                                    <td className="border px-6 py-3 text-black">
                                        {usuario.tipoUsuario === 'admin' ? null : <span>{usuario.name}</span>}
                                    </td>
                                    <td className="border px-6 py-3 text-black">
                                        {usuario.tipoUsuario === 'admin' ? null : <span>{usuario.email}</span>}
                                    </td>
                                    <td className="border px-6 py-3 text-center text-black">
                                        {usuario.tipoUsuario === 'admin' ? null : <span>{new Date(usuario.created_at).toLocaleDateString()}</span>}
                                    </td>
                                    <td className="border px-6 py-3 text-black">
                                        {usuario.tipoUsuario === 'est' ? (
                                            <span>ESTUDIANTE</span>
                                        ) : usuario.tipoUsuario === 'doc' ? (
                                            <span>DOCENTE</span>
                                        ) : (
                                            <span>ADMIN</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div className="mt-6 flex justify-center items-center space-x-2">
                        <button
                            className="px-6 py-2 bg-[#700303] text-white rounded hover:bg-[#6b0202] transition"
                            onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-red-900 text-white' : 'bg-white text-[#700303]'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            className="px-6 py-2 bg-[#700303] text-white rounded hover:bg-[#6b0202] transition"
                            onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListaUsuarios;
