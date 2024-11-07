import React, { useState } from 'react';
import { FaFileAlt, FaSearch, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Íconos de archivo, búsqueda, estado de pago
import { MdClose } from 'react-icons/md'; // Ícono de cerrar

const VistaPagos = ({ pagos, search }) => {
    // Filtrar los pagos por el nombre del estudiante
    const filteredPagos = pagos.filter(pago => 
        pago.nombre.toLowerCase().includes(search.toLowerCase())
    );

    // Estado para manejar el modal del voucher
    const [voucherModal, setVoucherModal] = useState(null);

    // Función para manejar el clic en el ícono del voucher
    const handleVoucherClick = (voucherImg) => {
        setVoucherModal(voucherImg); // Mostrar el archivo o imagen en el modal
    };

    // Función para cerrar el modal
    const closeVoucherModal = () => {
        setVoucherModal(null); // Cerrar el modal
    };

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
            {/* Modal para mostrar la imagen del voucher */}
            {voucherModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeVoucherModal}>
                    <div className="bg-white p-4 rounded-lg relative">
                        <MdClose 
                            className="absolute top-2 right-2 text-2xl text-[#800020] cursor-pointer" 
                            onClick={closeVoucherModal} 
                        />
                        <img src={voucherModal} alt="Voucher" className="max-w-full max-h-[80vh] object-contain" />
                    </div>
                </div>
            )}

            {/* Tabla de pagos */}
            <table className="min-w-full table-auto">
                <thead className="bg-[#800020] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Nombre</th>
                        <th className="px-6 py-3 text-left">Fecha de Pago</th>
                        <th className="px-6 py-3 text-left">Monto </th>
                        <th className="px-6 py-3 text-left">Medio de Pago</th>
                        <th className="px-6 py-3 text-left">Nro Voucher</th>
                        <th className="px-6 py-3 text-left">Voucher</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPagos.length > 0 ? (
                        filteredPagos.map((pago, index) => (
                            <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                                <td className="px-6 py-3">{pago.nombre}</td>
                                <td className="px-6 py-3">{new Date(pago.fecha_pago).toLocaleDateString()}</td>
                                <td className="px-6 py-3">{pago.monto}</td>
                                <td className="px-6 py-3">{pago.medio_pago}</td>
                                <td className="px-6 py-3">{pago.nro_voucher}</td>
                                {/* Ícono de archivo con el clic para abrir la imagen del voucher */}
                                <td className="px-6 py-3">
                                    {pago.voucher_img && (
                                        <button 
                                            onClick={() => handleVoucherClick(pago.voucher_img)}
                                            className="text-[#800020] hover:text-[#6A4E3C]">
                                            <FaFileAlt className="text-xl" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-3 text-center text-gray-500">No se encontraron pagos.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const PagosPage = () => {
    const pagos = [
        { nombre: 'Juan Pérez', monto: 100, estado_pago: 'Pagado', fecha_pago: '2023-09-15', medio_pago: 'Efectivo', nro_voucher: '12345', voucher_img: '/path/to/voucher1.jpg' },
        { nombre: 'Ana García', monto: 150, estado_pago: 'No Pagado', fecha_pago: '2023-08-18', medio_pago: 'Transferencia', nro_voucher: '67890', voucher_img: '/path/to/voucher2.jpg' },
        { nombre: 'Carlos López', monto: 200, estado_pago: 'Pagado', fecha_pago: '2023-07-25', medio_pago: 'Cheque', nro_voucher: '11223', voucher_img: '/path/to/voucher3.jpg' }
    ];

    const [search, setSearch] = useState('');

    return (
        <div className="overflow-hidden bg-gradient-to-r from-[#800020] to-[#F5D0A9] py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Buscador */}
                <div className="mb-4 flex justify-center">
                    <div className="relative max-w-sm w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar por nombre de estudiante"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                        />
                        <FaSearch className="absolute right-3 top-2 text-gray-500" />
                    </div>
                </div>

                {/* Vista de Pagos */}
                <VistaPagos pagos={pagos} search={search} />
            </div>
        </div>
    );
};

export default PagosPage;
