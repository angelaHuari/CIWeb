import React, { useState } from 'react';
import { useForm, router, Link } from '@inertiajs/react';

const GestionGrupos = ({ grupos, ciclos, docentes, editingGrupo, onClose }) => {
    const { data, setData, processing, errors, reset } = useForm({
        periodo: '',
        modalidad: '',
        nroEstudiantes: 0,
        nroVacantes: '',
        horarioEntrada: '',
        horarioSalida: '',
        docente_id: '',
        ciclo_id: '',
    });

    const periodOptions = [
        'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
        'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ];

    const [editing, setEditing] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState(null);
    const [modalidadError, setModalidadError] = useState('');
    const [cicloError, setCicloError] = useState('');
    const [docenteError, setDocenteError] = useState('');
    const [formErrors, setFormErrors] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        if (name === 'modalidad' && value !== '') setModalidadError('');
        if (name === 'ciclo_id' && value !== '') setCicloError('');
        if (name === 'docente_id' && value !== '') setDocenteError('');
    };

    // Función para convertir horario de 12 horas (AM/PM) a 24 horas
    const formatTo24Hour = (timeStr) => {
        if (!timeStr) return '';

        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');

        hours = parseInt(hours, 10);
        if (modifier === 'PM' && hours < 12) {
            hours += 12;
        } else if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }

        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };

    // Función para convertir de 24 horas a AM/PM
    const formatAMPM = (time) => {
        const [hours, minutes] = time.split(':');
        let hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        return `${hour}:${minutes} ${ampm}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let validationErrors = [];

        if (!data.modalidad) {
            validationErrors.push('Por favor, seleccione una modalidad válida.');
        }
        if (!data.ciclo_id) {
            validationErrors.push('Por favor, seleccione un ciclo válido.');
        }
        if (!data.docente_id) {
            validationErrors.push('Por favor, seleccione un docente válido.');
        }

        if (!data.nroVacantes || data.nroVacantes < 0) {
            validationErrors.push('Por favor, ingrese un número válido de vacantes.');
        }
        if (data.horarioEntrada && data.horarioSalida && data.horarioEntrada >= data.horarioSalida) {
            validationErrors.push('La hora de entrada debe ser anterior a la hora de salida.');
        }

        // Si hay errores de validación, se detiene el envío
        if (validationErrors.length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        // Formatear horarios si se ingresaron
        if (data.horarioEntrada && data.horarioSalida) {
            const horarioEntradaFormatted = formatAMPM(data.horarioEntrada);
            const horarioSalidaFormatted = formatAMPM(data.horarioSalida);
            data.horario = `${horarioEntradaFormatted} - ${horarioSalidaFormatted}`;
        }

        // Enviar datos de formulario
        if (editing && selectedGrupo) {
            router.put(`/grupo/${selectedGrupo.id}`, data, {
                onSuccess: () => {
                    reset();
                    setEditing(false);
                    setSelectedGrupo(null);
                    if (onClose) onClose(); // Cerrar el modal después de actualizar exitosamente
                },
                preserveScroll: true,
            });
        } else {
            console.log(data);
            router.post('/grupo', data, {
                onSuccess: () => {
                    reset();
                },
                preserveScroll: true,
            });
        }
    };

    const handleEdit = (grupo) => {
        setSelectedGrupo(grupo);
        const horarios = grupo.horario ? grupo.horario.split(' - ') : [];
        const horarioEntrada = horarios[0] ? formatTo24Hour(horarios[0]) : '';
        const horarioSalida = horarios[1] ? formatTo24Hour(horarios[1]) : '';

        setData({
            periodo: grupo.periodo || '',
            modalidad: grupo.modalidad || '',
            nroEstudiantes: grupo.nroEstudiantes || '',
            nroVacantes: grupo.nroVacantes || '',
            horarioEntrada,
            horarioSalida,
            docente_id: grupo.docente_id || '',
            ciclo_id: grupo.ciclo_id || '',
        });
        setEditing(true);
    };

    React.useEffect(() => {
        if (editingGrupo) {
            const horarios = editingGrupo.horario ? editingGrupo.horario.split(' - ') : [];
            const horarioEntrada = horarios[0] ? formatTo24Hour(horarios[0]) : '';
            const horarioSalida = horarios[1] ? formatTo24Hour(horarios[1]) : '';

            setData({
                periodo: editingGrupo.periodo || '',
                modalidad: editingGrupo.modalidad || '',
                nroEstudiantes: editingGrupo.nroEstudiantes || 0,
                nroVacantes: editingGrupo.nroVacantes || '',
                horarioEntrada,
                horarioSalida,
                docente_id: editingGrupo.docente_id || '',
                ciclo_id: editingGrupo.ciclo_id || '',
            });
            setEditing(true);
            setSelectedGrupo(editingGrupo);
        }
    }, [editingGrupo]);

    const handleCancelEdit = () => {
        setEditing(false);
        reset();
        setSelectedGrupo(null);
        setModalidadError('');
        setCicloError('');
        setDocenteError('');
        if (onClose) onClose();
    };

    return (
        <div className="container mx-auto p-6">

            {formErrors.length > 0 && (
                <div className="text-red-500 mb-4">
                    {formErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                        <label >Periodo</label>
                        <select
                            value={data.periodo}
                            onChange={(e) => setData('periodo', e.target.value)}
                            required
                            className="p-2 border border-gray-300 rounded w-full"
                        >
                            <option value="" disabled>Selecciona un Período</option>
                            {periodOptions.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label >Modalidad</label>
                        <select
                            name="modalidad"
                            value={data.modalidad}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Seleccione una modalidad</option>
                            <option value="PRESENCIAL">PRESENCIAL</option>
                            <option value="VIRTUAL">VIRTUAL</option>
                        </select>
                        {modalidadError && (
                            <div className="text-red-500 text-sm mt-1">{modalidadError}</div>
                        )}
                    </div>

                    <div>
                        <label >Número de Vacantes</label>
                        <input
                            type="number"
                            name="nroVacantes"
                            value={data.nroVacantes}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <div>
                        <label >Horario de Entrada</label>
                        <input
                            type="time"
                            name="horarioEntrada"
                            value={data.horarioEntrada}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <div>
                        <label >Horario de Salida</label>
                        <input
                            type="time"
                            name="horarioSalida"
                            value={data.horarioSalida}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <div>
                        <label >Ciclo</label>
                        <select
                            name="ciclo_id"
                            value={data.ciclo_id}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Seleccione un ciclo</option>
                            {ciclos?.map((ciclo) => (
                                <option key={ciclo.id} value={ciclo.id}>
                                    {`${ciclo.idioma.nombre} - ${ciclo.nombre} - ${ciclo.nivel}`}
                                </option>
                            ))}
                        </select>
                        {cicloError && (
                            <div className="text-red-500 text-sm mt-1">{cicloError}</div>
                        )}
                    </div>

                    <div>
                        <label >Docente</label>
                        <select
                            name="docente_id"
                            value={data.docente_id}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Seleccione un docente</option>
                            {docentes?.map((docente) => (
                                <option key={docente.id} value={docente.id}>
                                    {`${docente.nombres} ${docente.aPaterno} ${docente.aMaterno}`}
                                </option>
                            ))}
                        </select>
                        {docenteError && (
                            <div className="text-red-500 text-sm mt-1">{docenteError}</div>
                        )}
                    </div>
                    <div >
                        <input
                            type="number"
                            name="nroEstudiantes"
                            value={data.nroEstudiantes}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                            hidden
                        />
                    </div>
                    <div className="flex items-center justify-end mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                        >
                            {editing ? 'Actualizar' : 'Registrar'}
                        </button>
                        {editing && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="ml-4 text-gray-500"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>


            </form>
        </div>
    );
};

export default GestionGrupos;
