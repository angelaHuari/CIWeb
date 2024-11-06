import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

const DatosGenerales = ({data,setData,errors}) => {
    
/*
    const [apellidos, setApellidos] = useState('');
    const [nombres, setNombres] = useState('');
    const [dni, setDni] = useState('');
    const [sexo, setSexo] = useState('');
    const [celular, setCelular] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');*/

    return (
        <div>
            <strong> <h2>Datos Generales</h2></strong>
            <label>Nombres:</label>
            <input type="text" value={data.nombres} onChange={(e) => setData('nombres',e.target.value)} />
            <label>Apellido (Paterno):</label>
            <input type="text" value={data.aPaterno} onChange={(e) => setData('aPaterno',e.target.value)} />
            <label>Apellido (Materno):</label>
            <input type="text" value={data.aMaterno} onChange={(e) => setData('aMaterno',e.target.value)} />
            
            
            <label>Documento de Identidad (DNI):</label>
            <input type="text" value={data.dni} onChange={(e) => setData('dni',e.target.value)} />
            
            <label>Sexo:</label>
            <select value={data.sexo} onChange={(e) => setData('sexo',e.target.value)}>
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
            </select>
            
            <label>Número de Celular:</label>
            <input type="text" value={data.celular} onChange={(e) => setData('celular',e.target.value)} />
            
            <label>Fecha de Nacimiento:</label>
            <input type="date" value={data.fechaNacimiento} onChange={(e) =>setData('fechaNacimiento',e.target.value)} />
        </div>
    );
};

export default DatosGenerales;
