import { useState } from 'react';

const DatosPagosCaja = ({data,setData}) => {
    /*const [numeroOperacion, setNumeroOperacion] = useState('');
    const [fechaPago, setFechaPago] = useState('');
    const [montoPago, setMontoPago] = useState('');
    const [voucher, setVoucher] = useState(null);*/

    const handleVoucherChange = (e) => {
        setData('imgComprobante',e.target.files[0]);
    };

    return (
        <div>
            <strong><h2>Información de Pagos - Caja del Instituto</h2></strong>
            <label>¿Cuál es el medio de Pago?</label>
            <select value={data.medioPago} onChange={(e) => setData('medioPago',e.target.value)}>
                <option value="">Seleccione...</option>
                <option value="CajaInstitucional">Caja Institucional</option>
                <option value="BancoNacion">Banco de la Nación</option>
            </select>

            <label>Número de Operación del Voucher/Número de Recibo de Caja:</label>
            <input type="text" value={data.nroComprobante} onChange={(e) => setData('nroComprobante',e.target.value)} />
            
            <label>Fecha de Pago:</label>
            <input type="date" value={data.fechaPago} onChange={(e) => setData('fechaPago',e.target.value)} />

            <label>Monto de Pago:</label>
            <select value={data.montoPago} onChange={(e) => setData('montoPago',e.target.value)}>
                <option value="">Seleccione...</option>
                <option value="100">100 soles (Pago mes actual)</option>
                <option value="200">200 soles (Pago mes actual + 01 mes de adelanto)</option>
                <option value="300">300 soles (Pago mes actual + 02 meses de adelanto)</option>
                <option value="400">400 soles (Pago completo del Ciclo)</option>
            </select>

            <label>Adjuntar Voucher de Depósito Bancario:</label>
            <input type="file" accept="image/jpeg, image/png" onChange={handleVoucherChange} />
            <small>Importante: En el Voucher escribir de qué mes está realizando el pago.</small>

        </div>
    );
};

export default DatosPagosCaja;