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
        alert("Formulario aceptado");
        // Lógica para enviar los datos o realizar alguna acción
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
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Datos Matricula</h3>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Nombre del Ciclo:</label>
                                <select value={inscripcion.nombreCiclo} onChange={(e) => setData('nombreCiclo', e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                                    <option value="">Seleccione...</option>
                                    <option value="básico">Básico</option>
                                    <option value="intermedio">Intermedio</option>
                                    <option value="avanzado">Avanzado</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Nivel:</label>
                                <input type="number" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.nivel} onChange={(e) => setData('nivel', e.target.value)} />
                            </div>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Idioma:</label>
                                <select value={inscripcion.idioma} onChange={(e) => setData('idioma', e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                                    <option value="">Seleccione...</option>
                                    <option value="ingles">Inglés</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Horario:</label>
                                <select value={inscripcion.horario} onChange={(e) => setData('horario', e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                                    <option value="">Seleccione...</option>
                                    <option value="7:30 a 9:00">7:30 a 9:00</option>
                                    {/* Agrega más opciones si es necesario */}
                                </select>
                            </div>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2"></label>{/* estado de pago */}
                                <input type="hidden" value="pendiente" onChange={(e) => setData('estadoPago', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2"></label>{/* nota */}
                                <input type="hidden" value="" onChange={(e) => setData('nota', e.target.value)} />
                            </div>
                        </div>




                    </div>
                    {/*Datos Pago */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Datos de Pago</h3>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Fecha de Pago:</label>
                                <input type="date" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.fechaPago} onChange={(e) => setData('fechaPago', e.target.value)} />
                            </div>
                            <div>
                                <label>Monto de Pago:</label>
                                <select value={data.montoPago || 0} onChange={(e) => setData({ ...data, montoPago: Number(e.target.value) })}>
                                    <option value={0}>Seleccione...</option>
                                    <option value={100} >100 soles (Pago mes actual)</option>
                                    <option value={200}>200 soles (Pago mes actual + 01 mes de adelanto)</option>
                                    <option value={300}>300 soles (Pago mes actual + 02 meses de adelanto)</option>
                                    <option value={400}>400 soles (Pago completo del Ciclo)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Medio de Pago:</label>
                                <select value={inscripcion.medioPago} onChange={(e) => setData('medioPago', e.target.value)} className="w-full p-2 border border-gray-300 rounded">
                                    <option value="">Seleccione...</option>
                                    <option value="cajaInstitucional">Caja Institucional</option>
                                    <option value="bancoNacion">Banco Nación</option>
                                    {/* Agrega más opciones si es necesario */}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Número de Voucher:</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={inscripcion.nroVoucher} onChange={(e) => setData('nroVoucher', e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">Comprobante de Pago:</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
                            {data.imgComprobante && (
                                <div className="mt-2">
                                    <img
                                        src={URL.createObjectURL(data.imgComprobante)}
                                        alt="Vista previa"
                                        className="w-40 h-40 object-cover border border-gray-300 rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="mt-6 flex justify-center gap-4">
                        <button type="button" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={handleAceptar}>
                            Aceptar
                        </button>
                        <button type="button" className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleRechazar}>
                            Rechazar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResumenInscripcion;