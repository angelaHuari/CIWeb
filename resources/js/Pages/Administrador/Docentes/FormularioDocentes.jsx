import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TablaDocentes from './TablaDocentes';

const FormularioDocentes = ({ docentes: initialDocentes, search, docente }) => {
    const[id,setId] = useState('');
    const { data, setData, post, processing, put, reset, errors } = useForm({
        //id: docente ? docente.id : '',
        nombres: '',
        aPaterno:  '',
        aMaterno: '',
        dni: '',
        sexo:  '',
        celular:  '',
        fechaNacimiento: '',
        emailInstitucional:'',
        fotoDocente: null,
    });

    //const [docentes, setDocentes] = useState(initialDocentes);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [previewImage, setPreviewImage] = useState(docente?.fotoDocente || null);
    const [touchedFields, setTouchedFields] = useState({});
/*
    useEffect(() => {
        setDocentes(initialDocentes);
        if (docente) {
            setIsEditing(true);
            setPreviewImage(docente.fotoDocente);
        }
    }, [initialDocentes, docente]);*/

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        setData(name, name === 'emailInstitucional' ? value : value.toUpperCase());
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('fotoDocente', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = (docenteToEdit) => {
        setIsEditing(true);
        setData({
            id: docenteToEdit.id,
            nombres: docenteToEdit.nombres,
            aPaterno: docenteToEdit.aPaterno,
            aMaterno: docenteToEdit.aMaterno,
            dni: docenteToEdit.dni,
            sexo: docenteToEdit.sexo,
            celular: docenteToEdit.celular,
            fechaNacimiento: docenteToEdit.fechaNacimiento,
            emailInstitucional: docenteToEdit.emailInstitucional,
            fotoDocente: null,
        });
        setPreviewImage(docenteToEdit.fotoDocente);
    };

    const isFieldInvalid = (fieldName) => {
        return touchedFields[fieldName] && errors[fieldName];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Marcar todos los campos como tocados antes de enviar
        const allFields = {...data};
        delete allFields.id;
        delete allFields.fotoDocente;
        
        setTouchedFields(
            Object.keys(allFields).reduce((acc, key) => ({...acc, [key]: true}), {})
        );

        // Validaciones del lado del cliente
        if (data.dni && data.dni.length !== 8) {
            setError('El DNI debe tener 8 dígitos');
            return;
        }

        if (data.celular && data.celular.length !== 9) {
            setError('El número de celular debe tener 9 dígitos');
            return;
        }

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        if (isEditing) {
            formData.append('_method', 'PUT');
            put(route('docente.update', data.id), formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setSuccess('Docente actualizado exitosamente');
                    setTimeout(() => {
                        window.location.href = route('docente.index');
                    }, 1500);
                },
                onError: (errors) => {
                    setError('Error al actualizar los datos');
                    console.error(errors);
                }
            });
        } else {
            console.log(formData.fotoDocente);
            post(route('docente.store'), formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setSuccess('Docente registrado exitosamente');
                    reset();
                    setPreviewImage(null);
                    setTouchedFields({});
                    setTimeout(() => {
                        window.location.href = route('docente.index');
                    }, 1500);
                },
                onError: (errors) => {
                    setError('Error al guardar los datos');
                    console.error(errors);
                }
            });
        }
    };

    const inputClasses = (fieldName) => `
        w-full border rounded p-2
        ${isFieldInvalid(fieldName) 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}
    `;

    return (
        <AuthenticatedLayout>
            <div className="flex">
                <div className="w-1/3 p-4">
                    <h1 className="text-2xl font-semibold mb-6 text-center">
                        {isEditing ? 'Editar Docente' : 'Registrar Docente'}
                    </h1>
                    
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {success}
                        </div>
                    )}
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        {/* Campos de texto */}
                        {[
                            { name: 'nombres', label: 'Nombres', type: 'text' },
                            { name: 'aPaterno', label: 'Apellido Paterno', type: 'text' },
                            { name: 'aMaterno', label: 'Apellido Materno', type: 'text' },
                            { name: 'dni', label: 'DNI', type: 'text', maxLength: 8 },
                            { name: 'celular', label: 'Celular', type: 'text', maxLength: 9 },
                            { name: 'emailInstitucional', label: 'Email Institucional', type: 'email' }
                        ].map((field) => (
                            <div className="mb-4" key={field.name}>
                                <label className="block text-gray-700 mb-1">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={data[field.name] || ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={inputClasses(field.name)}
                                    required
                                    maxLength={field.maxLength}
                                />
                                {isFieldInvalid(field.name) && (
                                    <div className="text-red-500 text-sm mt-1">{errors[field.name]}</div>
                                )}
                            </div>
                        ))}

                        {/* Campo Sexo */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Sexo</label>
                            <select
                                name="sexo"
                                value={data.sexo || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={inputClasses('sexo')}
                                required
                            >
                                <option value="">Seleccione</option>
                                <option value="MASCULINO">Masculino</option>
                                <option value="FEMENINO">Femenino</option>
                            </select>
                            {isFieldInvalid('sexo') && (
                                <div className="text-red-500 text-sm mt-1">{errors.sexo}</div>
                            )}
                        </div>

                        {/* Campo Fecha de Nacimiento */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Fecha de Nacimiento</label>
                            <input
                                type="date"
                                name="fechaNacimiento"
                                value={data.fechaNacimiento || ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={inputClasses('fechaNacimiento')}
                                required
                            />
                            {isFieldInvalid('fechaNacimiento') && (
                                <div className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</div>
                            )}
                        </div>

                        {/* Campo Foto */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Foto del Docente</label>
                            <input
                                type="file"
                                name="fotoDocente"
                                onChange={handleFileChange}
                                className="w-full border border-gray-300 rounded p-2"
                                accept="image/*"
                            />
                            {errors.fotoDocente && (
                                <div className="text-red-500 text-sm mt-1">{errors.fotoDocente}</div>
                            )}
                        </div>

                        {/* Previsualización de imagen */}
                        {previewImage && (
                            <div className="mb-4">
                                <p className="text-gray-700 mb-1">
                                    Imagen {isEditing ? 'Actual' : 'Seleccionada'}:
                                </p>
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300"
                                />
                            </div>
                        )}

                        {/* Botones */}
                        <div className="flex gap-2">
                            <button 
                                type="submit" 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                                disabled={processing}
                            >
                                {isEditing ? 'Actualizar' : 'Registrar'}
                            </button>
                            
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => window.location.href = route('docente.index')}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
                                    disabled={processing}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                <div className="w-2/3 p-4">
                    <TablaDocentes docentes={docentes} onEdit={handleEdit} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FormularioDocentes;