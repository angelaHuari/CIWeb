import React from 'react';

function HistorialMatriculas({ matriculas }) {
    return (
        <div className="mt-12 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-5xl">
                {/* Si no hay matrículas */}
                {(!matriculas || matriculas.length === 0) ? (
                    <p className="text-white text-center">No hay matrículas registradas en el historial.</p>
                ) : (
                    <div className="overflow-x-auto max-h-96 overflow-y-auto shadow-lg border border-gray-300 rounded-lg">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-[#700303] text-white">
                                    <th className="p-3">Ciclo</th>
                                    <th className="p-3">Horario</th>
                                    <th className="p-3">Monto</th>
                                    <th className="p-3">Medio de Pago</th>
                                    <th className="p-3">Nro Voucher</th>
                                    <th className="p-3">Foto Voucher</th>
                                    <th className="p-3">Calificación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matriculas.map((matricula, index) => (
                                    <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <td className="p-3">{matricula.ciclo}</td>
                                        <td className="p-3">{matricula.horario}</td>
                                        <td className="p-3">{matricula.montoPago}</td>
                                        <td className="p-3">{matricula.medioPago}</td>
                                        <td className="p-3">{matricula.nroVoucher}</td>
                                        <td className="p-3">
                                            {matricula.fotoVoucher ? (
                                                <img
                                                    src={matricula.fotoVoucher}
                                                    alt="Voucher"
                                                    className="w-20 h-20 object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-400">Sin imagen</span>
                                            )}
                                        </td>
                                        <td className="p-3">{matricula.calificacion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HistorialMatriculas;