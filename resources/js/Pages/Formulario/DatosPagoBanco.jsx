import React from 'react';

const DatosPagosBanco = () => {
    return (
        <div>
            <strong><h2>Información de Pagos - Banco de la Nación</h2></strong>
            <label>Cuenta corriente IESTP Tupac Amaru - Cusco</label>
            <img src="imagenes/cuenta.jpg" alt="Banco de la Nación" />
            <label>Notas adicionales: Al momento de realizar el depósito, se deberá indicar el DNI y nombre completo del estudiante.</label>
            <label>En caso de que el estudiante sea menor de edad y/o el pago sea realizado por el apoderado, se deberá escribir el Nro. de DNI y nombre completo del estudiante con lapicero y de forma legible, en una parte blanca del Voucher.</label>
            <img src="imagenes/modelo.png" alt="Modelo 1" />
            <img src="imagenes/modeloo.png" alt="Modelo 2" />
            <label>Datos del voucher del Banco de la Nación:</label>
            <ul>
                <li>1.- Nombre del Postulante</li>
                <li>2.- DNI del Postulante o Apoderado</li>
                <li>3.- Número de Operación del voucher (7 DÍGITOS)</li>
                <li>4.- Fecha del Depósito</li>
                <li>5.- Monto del Depósito</li>
                <img src="imagenes/voucher.jpg" alt="Modelo 2" />
            </ul>

        </div>
    );
};

export default DatosPagosBanco;