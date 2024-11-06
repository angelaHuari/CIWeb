import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

const ListaMatriculas = ({ matriculas = [] }) => {
    // Datos simulados para mostrar en las tablas
    const matriculas = [
        { nombre: 'Juan Pérez', tipo_pago: 'Transferencia', no_voucher: 'V123', fecha_pago: '2023-09-15' },
        { nombre: 'Ana García', tipo_pago: 'Efectivo', no_voucher: 'V456', fecha_pago: '2023-08-18' },
        { nombre: 'Carlos López', tipo_pago: 'Tarjeta', no_voucher: 'V789', fecha_pago: '2023-07-25' }
    ];

    // Función para manejar clics en las tarjetas y cambiar de vista
    const handleCardClick = (value) => {
        setView(value); // Establece la vista de la tarjeta que fue clickeada
    };
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
            <table className="min-w-full table-auto">
                <thead className="bg-[#800020] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Nombre</th>
                        <th className="px-6 py-3 text-left">Tipo de Pago</th>
                        <th className="px-6 py-3 text-left">No. Voucher</th>
                        <th className="px-6 py-3 text-left">Fecha de Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {matriculas.map((matricula, index) => (
                        <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                            <td className="px-6 py-3">{matricula.nombre}</td>
                            <td className="px-6 py-3">{matricula.tipo_pago}</td>
                            <td className="px-6 py-3">{matricula.no_voucher}</td>
                            <td className="px-6 py-3">{new Date(matricula.fecha_pago).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
export default ListaMatriculas;
