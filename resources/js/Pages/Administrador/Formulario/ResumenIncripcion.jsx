import React, { useState } from 'react';

const ResumenInscripcion = ({ inscripcion }) => {
    /*const [alumnoTipo, setAlumnoTipo] = useState('');
    const [cicloIngles, setCicloIngles] = useState('');
    const [basicoHorario, setBasicoHorario] = useState('');
    const [intermedioHorario, setIntermedioHorario] = useState('');
    const [intermedioDatos, setIntermedioDatos] = useState(false);
    const [avanzadoHorario, setAvanzadoHorario] = useState('');
    const [avanzadoDatos, setAvanzadoDatos] = useState(false);*/
    const { data, setData, post, put, processing, errors, reset } = useForm({
        nombres: '',
        aPaterno: '',
        aMaterno: '',
        dni: '',
        sexo: '',
        celular: '',
        fechaNacimiento: '',

        tipoAlumno: '',
        programaEstudios: '',
        semestre: '',
        correoInstitucional: '',
        email: '',
        anioEgreso: '',
        institucionProviene: '',
        medioPublicitario: '',
        cicloIngles: '',
        horarioIngles: '',
        realizoInglesBasico: '',
        realizoInglesIntermedio: '',
        tienecertificadoIngles: '',
        medioPago: '',
        fechaPago: '',
        montoPago: 0,
        nroComprobante: '',
        imgComprobante: null,
    });

    const handleAceptar = () => {
        alert("Formulario aceptado");
        // Lógica para enviar los datos o realizar alguna acción
    };

    const handleRechazar = () => {
        alert("Formulario rechazado");
        // Lógica para rechazar la acción o limpiar el formulario
    };

    return (
        <div className="flex justify-center mt-6">
            <div className="w-full max-w-4xl bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Resumen de Inscripción</h2>
                <form>
                    {/* Datos Estudiante */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Datos Estudiante</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Apellidos (Paterno y Materno):</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.aPaterno} onChange={setData('aPaterno', e.target.value)}
                            />
                            <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.aMaterno} onChange={setData('aMaterno', e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nombres:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.nombres} onChange={setData('nombres', e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Documento de Identidad (DNI):</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.dni} onChange={setData('dni', e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Sexo:</label>
                            <select value={inscripcion.sexo} onChange={setData('sexo', e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Número de Celular:</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.celular} onChange={setData('celular', e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Fecha de Nacimiento:</label>
                            <input type="date" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.fechaNacimiento} onChange={setData('fechaNacimiento', e.target.value)} />
                        </div>
                    </div>

                    {/* Datos Matricula */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Datos Matricula</h3>
                        <div className="mb-4">

                        </div>

                    </div>
                    {/*Datos Pago */}

                    
                    {/* Botones de acción */}
                    <div className="mt-6 flex justify-center gap-4">
                        <button type="button" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleAceptar}>
                            Aceptar
                        </button>
                        <button type="button" className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleRechazar}>
                            Rechazar
                        </button>
                        <button type="button" className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" >
                            Editar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResumenInscripcion;