import React, { useState } from 'react';

const DatosGenerales = ({data,setData,errors}) => {
    return (
        <div>
            <strong> <h2>Datos Generales</h2></strong>
            <label>Nombres:</label>
            <input type="text" value={data.nombres} onChange={(e) => setData({...data,nombres: e.target.value})} />
            <label>Apellido (Paterno):</label>
            <input type="text" value={data.aPaterno} onChange={(e) => setData({...data,aPaterno: e.target.value})} />
            <label>Apellido (Materno):</label>
            <input type="text" value={data.aMaterno} onChange={(e) => setData({...data,aMaterno: e.target.value})} />
            
            
            <label>Documento de Identidad (DNI):</label>
            <input type="text" value={data.dni} onChange={(e) => setData({...data,dni: e.target.value})} />
            
            <label>Sexo:</label>
            <select value={data.sexo} onChange={(e) => setData({...data,sexo: e.target.value})}>
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
            </select>
            
            <label>Número de Celular:</label>
            <input type="text" value={data.celular} onChange={(e) => setData({...data,celular: e.target.value})} />
            
            <label>Fecha de Nacimiento:</label>
            <input type="date" value={data.fechaNacimiento} onChange={(e) =>setData({...data,fechaNacimiento: e.target.value})} />
        </div>
    );
};

export default DatosGenerales;
