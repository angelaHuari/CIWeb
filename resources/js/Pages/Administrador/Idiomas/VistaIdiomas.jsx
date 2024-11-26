import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const VistaIdiomas = ({ idiomas = [] }) => {
  const { data, setData, post, put, processing, errors } = useForm({
    nombre: '',
  });//formulario para idiomas

  const [languages, setLanguages] = useState(Array.isArray(idiomas) ? idiomas : []);//lista de Idiomas

  const [selectedLanguage, setSelectedLanguage] = useState(null); // Idioma seleccionado para edición

  // Manejar el envío del formulario para registrar o editar un idioma
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedLanguage) {
      // Editar idioma en base de datos
      put(route('idioma.update', selectedLanguage));

      // Limpiar selección de idioma
      setSelectedLanguage(null);

    } else {
      // Crear y registrar un nuevo idioma en la base de datos
      post(route('idioma.store'));

    }
    // Limpiar el formulario
    setData('nombre', '');
  };

  // Manejar la edición de un idioma
  const handleEdit = (language) => {
    setSelectedLanguage(language.id);
    setData('nombre', language.nombre);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#800020] to-[#F5D0A9] py-12">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Registro de Idioma</h3>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center w-full">
            <input
              type="text"
              value={data.nombre}
              onChange={(e) => setData('nombre', e.target.value.toUpperCase())}
              placeholder="Nombre del Idioma"
              required
              className="p-2 border border-gray-300 rounded mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
            />
            <button
              type="submit"
              className={`text-white px-4 py-2 rounded ${selectedLanguage ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {selectedLanguage ? 'Modificar' : 'Agregar'}
            </button>
            {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre}</span>}

            {selectedLanguage && (
              <button
                onClick={() => setSelectedLanguage(null)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Cancelar Edición
              </button>
            )}
          </form>

        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
              <thead className="bg-[#800020] text-white">
                <tr >
                  <th className="border-b-2 border-gray-300 px-4 py-2" >Nombre</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2" >Acciones</th>
                </tr>
              </thead>
              <tbody>
                {languages && languages.length > 0 ? (languages.map((language, index) => (
                  <tr key={index} className='text-center'>
                    <td className="border-b border-gray-300 px-4 py-2">{language.nombre}</td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEdit(language)}
                        className="bg-black text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))) : (
                  <tr>
                    <td colSpan="5" className="border-b border-gray-300 px-4 py-2 text-center">
                      No hay registros
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VistaIdiomas;
