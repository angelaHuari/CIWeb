import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

const ListaPagos = ({}) => {
    //datos simulados de pagos
    const pagos = [
        { nombre: 'Juan Pérez', monto: 100, tipo_pago: 'Transferencia', no_voucher: 'V123', fecha_pago: '2023-09-15' },
        { nombre: 'Ana García', monto: 150, tipo_pago: 'Efectivo', no_voucher: 'V456', fecha_pago: '2023-08-18' },
        { nombre: 'Carlos López', monto: 200, tipo_pago: 'Tarjeta', no_voucher: 'V789', fecha_pago: '2023-07-25' }
    ];

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
            <table className="min-w-full table-auto">
                <thead className="bg-[#800020] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Nombre</th>
                        <th className="px-6 py-3 text-left">Monto</th>
                        <th className="px-6 py-3 text-left">Tipo de Pago</th>
                        <th className="px-6 py-3 text-left">No. Voucher</th>
                        <th className="px-6 py-3 text-left">Fecha de Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {pagos.map((pago, index) => (
                        <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                            <td className="px-6 py-3">{pago.nombre}</td>
                            <td className="px-6 py-3">${pago.monto}</td>
                            <td className="px-6 py-3">{pago.tipo_pago}</td>
                            <td className="px-6 py-3">{pago.no_voucher}</td>
                            <td className="px-6 py-3">{new Date(pago.fecha_pago).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ListaPagos;