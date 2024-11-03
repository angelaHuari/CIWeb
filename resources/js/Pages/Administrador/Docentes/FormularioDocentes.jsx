import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TablaDocentes from './TablaDocentes';

const FormularioDocentes = () => {
    const [docentes, setDocentes] = useState([]);
    const [formData, setFormData] = useState({
        idDocente: docentes.length + 1,
        nombres: '',
        aPaterno: '',
        aMaterno: '',
        dni: '',
        sexo: '',
        celular: '',
        fechaNacimiento: '',
        email: '',
        emailInstitucional: '',
        fotoDocente: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'fotoDocente') {
            setFormData({ ...formData, [name]: files[0] });
        } else if (name === 'nombres' || name === 'aPaterno' || name === 'aMaterno' ) {
            // Convertir a mayúsculas solo para estos campos
            setFormData({ ...formData, [name]: value.toUpperCase() });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            handleUpdate();
        } else {
            const newId = docentes.length > 0 ? docentes[docentes.length - 1].idDocente + 1 : 1; // Cambia esto
            setDocentes([...docentes, { ...formData, idDocente: newId }]);

        }
        resetForm();
    };

    const handleEdit = (index) => {
        setIsEditing(true);
        setEditIndex(index);
        setFormData(docentes[index]);
    };

    const handleUpdate = () => {
        const updatedDocentes = docentes.map((docente, index) =>
            index === editIndex ? formData : docente
        );
        setDocentes(updatedDocentes);
        setIsEditing(false);
        setEditIndex(null);
    };

    const resetForm = () => {
        setFormData({
            idDocente: Date.now().toString(),
            nombres: '',
            aPaterno: '',
            aMaterno: '',
            dni: '',
            sexo: '',
            celular: '',
            fechaNacimiento: '',
            email: '',
            emailInstitucional: '',
            fotoDocente: null,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="flex">
                {/* Formulario */}
                <div className="w-1/3 p-4">
                    <h1 className="text-2xl font-semibold mb-6 text-center">{isEditing ? 'Editar Docente' : 'Registrar Docente'}</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="idDocente" value={formData.idDocente} />
                        <div className="mb-4">
                            <label className="block text-gray-700">Nombres</label>
                            <input type="text" name="nombres" value={formData.nombres} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Apellido Paterno</label>
                            <input type="text" name="aPaterno" value={formData.aPaterno} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Apellido Materno</label>
                            <input type="text" name="aMaterno" value={formData.aMaterno} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">DNI</label>
                            <input type="text" name="dni" value={formData.dni} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required  maxLength={8}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Sexo</label>
                            <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required >
                                <option value="">Seleccione</option>
                                <option value="Masculino">MASCULINO</option>
                                <option value="Femenino">FEMENINO</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Celular</label>
                            <input type="text" name="celular" value={formData.celular} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required maxLength={9}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Fecha de Nacimiento</label>
                            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email Institucional</label>
                            <input type="email" name="emailInstitucional" value={formData.emailInstitucional} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Foto del Docente</label>
                            <input type="file" name="fotoDocente" onChange={handleChange} className="w-full border border-gray-300 rounded p-2" />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300">
                            {isEditing ? 'Actualizar Docente' : 'Registrar Docente'}
                        </button>
                    </form>
                </div>

                {/* Tabla de docentes */}
                <div className="w-2/3 p-4">
                    <TablaDocentes docentes={docentes} onEdit={handleEdit} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FormularioDocentes;
