import React, { useState,useEffect } from 'react';
import { useForm } from '@inertiajs/react';

const FormularioDocentes = ({ editingDocente,onCancelEdit }) => {

    const isEdit = Boolean(editingDocente);

    const { data, setData, post,put, errors, processing, reset } = useForm({
        nombres: '',
        aPaterno: '',
        aMaterno: '',
        sexo: 'MASCULINO',
        dni: '',
        celular: '',
        fechaNacimiento: '',
        emailInstitucional: '',
        fotoDocente: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [initialLoad, setInitialLoad] = useState(false); // Nueva variable de estado

    useEffect(() => {
        if (editingDocente && initialLoad) {
            setData(editingDocente); // Asignar directamente a data
            setPreviewImage(editingDocente.fotoDocente);
            setInitialLoad(false); // Evitar futuras ejecuciones con el mismo editingDocente
            window.scrollTo({ top: 0, behavior: 'smooth' });

        }

    }, [editingDocente, initialLoad, setData]);

     useEffect(()=>{
        // Limpia el formulario cuando editingDocente sea nulo
         if(!editingDocente){
            reset();
            setPreviewImage(null);
            setInitialLoad(false); // Reiniciar para la próxima edición
         }else{
            setInitialLoad(true);
         }
     },[editingDocente,reset])

   // const handleEdit = () => { };

    const validarFecha = (fecha) => {
        const fechaIngresada = new Date(fecha);
        const hoy = new Date();
        const edadMinima = 18; // Edad mínima requerida
        const fechaMinima = new Date(
            hoy.getFullYear() - edadMinima,
            hoy.getMonth(),
            hoy.getDate()
        );

        if (fechaIngresada > hoy) {
            return 'La fecha no puede estar en el futuro.';
        } else if (fechaIngresada > fechaMinima) {
            return `Debes tener al menos ${edadMinima} años.`;
        }
        return '';
    };


    const handleChange = (e) => {
        const { name, value, type, files } = e.target; // Obtener name, value, type, files

        // Asignar el nuevo valor al estado del formulario
        setData(name, type === 'file' ? files[0] : value);


        // Validaciones (se pueden simplificar o mover a otro lugar)
        if (name === 'emailInstitucional' && value && !value.endsWith('@istta.edu.pe')) {
            setData('emailInstitucional', value.split('@')[0] + '@istta.edu.pe');
        } else if (name === 'celular' || name === 'dni') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue !== value) {
                console.log("Este campo debe contener solo números.");
            }
            setData(name, numericValue);

        } else if (name === 'fechaNacimiento' && value) {
            errors['fechaNacimiento'] = validarFecha(value)

        }
           if (errors[name]) { //limpia los errores despues de que se actualize el input
           delete errors[name]; 
        }


        if (name === 'fotoDocente' && files[0]) {
            setPreviewImage(URL.createObjectURL(files[0]));
        }


    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();  // Crea el FormData aquí para evitar problemas con el archivo
        for (const key in data) {
            if (data[key] !== null && key !== '_method') {
                formData.append(key, data[key]);
            }
        }


        if (isEdit) {
            put(route('docente.update', editingDocente.id), {
                forceFormData: true,
                data: formData,  // Usar formData
                onSuccess: () => {
                    reset();
                    onCancelEdit(); // Llamar a onCancelEdit para limpiar el formulario en el padre
                    setPreviewImage(null);
                },
                // ... (onError)
            });
        } else {
            post(route('docente.store'), {
                forceFormData: true,
                data: formData,  // Usar formData
                onSuccess: () => {
                    reset();
                    setPreviewImage(null);
                },
                // ... (onError)
            });
        }
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    {isEdit ? 'Editar Docente' : 'Registrar Docente'}
                </h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
                encType="multipart/form-data"
            >
                {/* Fila con dos columnas */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            value={data.nombres || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.nombres && (
                            <span className="text-red-500">{errors.nombres}</span>
                        )}
                    </div>
                    <div>
                        <label>Apellido Paterno</label>
                        <input
                            type="text"
                            name="aPaterno"
                            value={data.aPaterno || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.aPaterno && (
                            <span className="text-red-500">{errors.aPaterno}</span>
                        )}
                    </div>

                </div>

                {/* Fila con dos columnas */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Apellido Materno</label>
                        <input
                            type="text"
                            name="aMaterno"
                            value={data.aMaterno || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.aMaterno && (
                            <span className="text-red-500">{errors.aMaterno}</span>
                        )}
                    </div>
                    <div>
                        <label>Sexo</label>
                        <select
                            name="sexo"
                            value={data.sexo || 'MASCULINO'}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        >
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMENINO">Femenino</option>
                        </select>
                        {errors.sexo && (
                            <span className="text-red-500">{errors.sexo}</span>
                        )}
                    </div>
                </div>

                {/* Fila con dos columnas */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>DNI</label>
                        <input
                            type="text"
                            name="dni"
                            value={data.dni || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            maxLength={8} // Limita la cantidad de caracteres a 9
                        />
                        {errors.dni && (
                            <span className="text-red-500">{errors.dni}</span>
                        )}
                    </div>
                    <div>
                        <label>Celular</label>
                        <input
                            type="text"
                            name="celular"
                            value={data.celular || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            maxLength={9} // Limita la cantidad de caracteres a 9
                        />
                        {errors.celular && (
                            <span className="text-red-500">{errors.celular}</span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="fechaNacimiento"
                            value={data.fechaNacimiento || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.fechaNacimiento && (
                            <span className="text-red-500">{errors.fechaNacimiento}</span>
                        )}
                    </div>

                    <div>
                        <label>Email Institucional</label>
                        <input
                            type="email"
                            name="emailInstitucional"
                            value={data.emailInstitucional || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.emailInstitucional && (
                            <span className="text-red-500">{errors.emailInstitucional}</span>
                        )}
                    </div>

                </div>




                <div>
                    <label>Foto del Docente</label>
                    <input
                        type="file"
                        name="fotoDocente"
                        onChange={handleChange}
                        className="border p-2 w-full"
                    />
                    {errors.fotoDocente && (
                        <span className="text-red-500">{errors.fotoDocente}</span>
                    )}
                    {previewImage && (
                        <div className="mt-2">
                            <img
                                src={previewImage}
                                alt="Vista previa"
                                className="w-32 h-32 object-cover rounded"
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        {processing
                            ? 'Guardando...'
                            : isEdit
                                ? 'Actualizar'
                                : 'Guardar'}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default FormularioDocentes;