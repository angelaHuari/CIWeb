import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

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
        post(route('formularios.aceptar', inscripcion.id), {}, {
            onSuccess: (page) => {
                if (page.props.flash.message) {
                    alert(page.props.flash.message);
                }
                if (page.props.flash.error) {
                    alert(page.props.flash.error);
                }
            }
        });
    };

    const handleRechazar = () => {
        alert("Formulario rechazado");
        // Lógica para rechazar la acción o limpiar el formulario
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];  // Obtiene el primer archivo seleccionado
        if (file) {
            setData('imgComprobante', file);  // Actualiza el estado con el archivo seleccionado
        }
    };


    return (
        <div className="flex justify-center mt-6">
            <div className="w-full max-w-4xl bg-white p-8 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Resumen de Inscripción</h2>
                <form>
                    {/* Datos Estudiante */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Datos Estudiante</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Apellido Paterno:</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.aPaterno} onChange={(e) => setData('aPaterno', e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Apellido Materno:</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.aMaterno} onChange={(e) => setData('aMaterno', e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Nombres:</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.nombres} onChange={(e) => setData('nombres', e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Documento de Identidad (DNI):</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.dni} onChange={(e) => setData('dni', e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Sexo:</label>
                                <select value={inscripcion.sexo} onChange={(e) => setData('sexo', e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Número de Celular:</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.celular} onChange={(e) => setData('celular', e.target.value)} />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Fecha de Nacimiento:</label>
                                <input type="date" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.fechaNacimiento} onChange={(e) => setData('fechaNacimiento', e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Correo (Institucional o Personal):</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={inscripcion.correoInstitucional || inscripcion.email}  // Prioriza correoInstitucional si está presente
                                    onChange={(e) => setData('correoInstitucional', e.target.value)}  // Establece correoInstitucional
                                    placeholder="Correo electrónico"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Datos Matricula */}
                    <div className="mb-6 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Datos Matrícula</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Nombre del Ciclo:</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border border-gray-300 rounded bg-white" 
                                    value={inscripcion.cicloIngles || ''}
                                    readOnly 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Horario:</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border border-gray-300 rounded bg-white" 
                                    value={inscripcion.horarioIngles || ''} 
                                    readOnly 
                                />
                            </div>
                        </div>
                    </div>

                    {/*Datos Pago */}
                    <div className="mb-6 bg-gray-50 p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Datos de Pago</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Fecha de Pago:</label>
                                <input 
                                    type="date" 
                                    className="w-full p-2 border border-gray-300 rounded" 
                                    value={inscripcion.fechaPago} 
                                    onChange={(e) => setData('fechaPago', e.target.value)} 
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Monto de Pago:</label>
                                <input
                                    type="number" 
                                    value={inscripcion.montoPago || 0} 
                                    onChange={(e) => setData('montoPago', Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    
                                </input>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Medio de Pago:</label>
                                <input
                                    type="text" 
                                    value={inscripcion.medioPago} 
                                    onChange={(e) => setData('medioPago', e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded"
                                >
                                    
                                </input>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Número de Voucher:</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border border-gray-300 rounded" 
                                    value={inscripcion.nroComprobante} 
                                    onChange={(e) => setData('nroComprobante', e.target.value)} 
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-gray-700 mb-2">Comprobante de Pago:</label>
                            {inscripcion.imgComprobante ? (
                                <div className="mt-2">
                                    <img
                                        src={inscripcion.imgComprobante}
                                        alt="Comprobante"
                                        className="w-40 h-40 object-cover border border-gray-300 rounded"
                                    />
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">No se ha subido comprobante</p>
                            )}
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="mt-6 flex justify-center gap-4">
                        <button 
                            type="button" 
                            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200" 
                            onClick={handleAceptar}
                        >
                            Aceptar
                        </button>
                        <button 
                            type="button" 
                            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200" 
                            onClick={handleRechazar}
                        >
                            Rechazar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResumenInscripcion;