import { useState } from 'react';

const DatosPagoCaja = ({ data, setData }) => {
    const handleVoucherChange = (e) => {
        setData({ ...data, imgComprobante: e.target.files[0] || null });
    };

    return (
        <div>
            <strong><h2>Información de Pagos - Caja del Instituto</h2></strong>
            
            <label>¿Cuál es el medio de Pago?</label>
            <select value={data.medioPago || ''} onChange={(e) => setData({ ...data, medioPago: e.target.value })}>
                <option value="">Seleccione...</option>
                <option value="CajaInstitucional">Caja Institucional</option>
                <option value="BancoNacion">Banco de la Nación</option>
            </select>

            <label>Número de Operación del Voucher/Número de Recibo de Caja:</label>
            <input 
                type="text" 
                value={data.nroComprobante || ''} 
                onChange={(e) => setData({ ...data, nroComprobante: e.target.value })} 
            />
            
            <label>Fecha de Pago:</label>
            <input 
                type="date" 
                value={data.fechaPago || ''} 
                onChange={(e) => setData({ ...data, fechaPago: e.target.value })} 
            />

            <label>Monto de Pago:</label>
            <select value={data.montoPago || 0} onChange={(e) => setData({ ...data, montoPago: Number(e.target.value) })}>
                <option value={0}>Seleccione...</option>
                <option value={100} >100 soles (Pago mes actual)</option>
                <option value={200}>200 soles (Pago mes actual + 01 mes de adelanto)</option>
                <option value={300}>300 soles (Pago mes actual + 02 meses de adelanto)</option>
                <option value={400}>400 soles (Pago completo del Ciclo)</option>
            </select>

            <label>Adjuntar Voucher de Depósito Bancario:</label>
            <input 
                type="file" 
                accept="image/jpeg, image/png" 
                onChange={handleVoucherChange} 
            />
            <small>Importante: En la imagen del Voucher escribir de qué mes o meses está realizando el pago.</small>
        </div>
    );
};

export default DatosPagoCaja;
