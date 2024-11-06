import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TablaDocentes from './TablaDocentes';

const FormularioDocentes = ({ docentes = [] }) => {
    const [editingDocente, setEditingDocente] = useState(null);
    const isEdit = Boolean(editingDocente);

    const { data, setData, post, put, errors, processing, reset } = useForm({
        nombres: '',
        aPaterno: '',
        aMaterno: '',
        sexo: 'MASCULINO',
        dni: '',
        celular: '',
        fechaNacimiento: '',
        emailInstitucional: '',
        fotoDocente: null,
        _method: isEdit ? 'PUT' : 'POST', // Necesario para el método PUT con archivos
    });

    const [previewImage, setPreviewImage] = useState(null);

    const handleEdit = (docente) => {
        setEditingDocente(docente);
        setData({
            ...docente,
            fotoDocente: null,
            _method: 'PUT',
        });
        setPreviewImage(docente.fotoDocente);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;

        setData(key, value);

        if (key === 'fotoDocente' && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Agregar todos los campos al FormData
        Object.keys(data).forEach(key => {
            if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        // Always use post() but with different endpoints
        if (isEdit) {
            // For updates, use POST to the update endpoint
            post(route('docente.update', editingDocente.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setEditingDocente(null);
                    setPreviewImage(null);
                },
                onError: (errors) => {
                    console.error('Errores:', errors);
                },
            });
        } else {
            // For creation, use POST to the store endpoint
            post(route('docente.store'), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setPreviewImage(null);
                },
                onError: (errors) => {
                    console.error('Errores:', errors);
                },
            });
        }
    };

    const handleCancelEdit = () => {
        setEditingDocente(null);
        reset();
        setPreviewImage(null);
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-4 space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {isEdit ? 'Editar Docente' : 'Crear Docente'}
                    </h2>
                    {isEdit && (
                        <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancelar Edición
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    <div>
                        <label>Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            value={data.nombres || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.nombres && <span className="text-red-500">{errors.nombres}</span>}
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
                        {errors.aPaterno && <span className="text-red-500">{errors.aPaterno}</span>}
                    </div>

                    <div>
                        <label>Apellido Materno</label>
                        <input
                            type="text"
                            name="aMaterno"
                            value={data.aMaterno || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.aMaterno && <span className="text-red-500">{errors.aMaterno}</span>}
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
                        {errors.sexo && <span className="text-red-500">{errors.sexo}</span>}
                    </div>

                    <div>
                        <label>DNI</label>
                        <input
                            type="text"
                            name="dni"
                            value={data.dni || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.dni && <span className="text-red-500">{errors.dni}</span>}
                    </div>

                    <div>
                        <label>Celular</label>
                        <input
                            type="text"
                            name="celular"
                            value={data.celular || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.celular && <span className="text-red-500">{errors.celular}</span>}
                    </div>

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

                    <div>
                        <label>Foto del Docente</label>
                        <input
                            type="file"
                            name="fotoDocente"
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.fotoDocente && <span className="text-red-500">{errors.fotoDocente}</span>}
                        {previewImage && (
                            <div className="mt-2">
                                <img src={previewImage} alt="Vista previa" className="w-32 h-32 object-cover rounded" />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={processing}
                        >
                            {processing ? 'Guardando...' : isEdit ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>

                <TablaDocentes
                    docentes={docentes}
                    onEdit={handleEdit}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default FormularioDocentes;