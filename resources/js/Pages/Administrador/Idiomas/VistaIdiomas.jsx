import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const VistaIdiomas = ({ idiomas = [] }) => {
  const { data, setData, post,put, processing, errors } = useForm({
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
    //recargar la pagina
    window.location.reload();

    // Limpiar el formulario
    setData('nombre','');
  };

  // Manejar la edición de un idioma
  const handleEdit = (language) => {
    setSelectedLanguage(language.id);
    setData('nombre',language.nombre);
  };

  // Manejar la eliminación de un idioma --NO IMPLEMENTAR-CONSULTAR
  /* const handleDelete = (id) => {
     //eliminar idioma  en base de datos
     setLanguages(updatedLanguages);
   };*/

  return (
    <div className="p-6 font-sans bg-blue-200">
      <h1 className="text-2xl text-center font-bold mb-6">Interfaz de Gestión de Idiomas</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Registro de Idioma</h3>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center w-full">
            <input
              type="text"
              value={data.nombre}
              onChange={(e) => setData('nombre',e.target.value)}
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
          </form>
        </div>

        {selectedLanguage && (
          <button
            onClick={() => setSelectedLanguage(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cancelar Edición
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              {/*<th className="border-b-2 border-gray-300 px-4 py-2">ID</th>*/}
              <th className="border-b-2 border-gray-300 px-4 py-2">Nombre</th>
              <th className="border-b-2 border-gray-300 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((language, index) => (
              <tr key={index} className='text-center'>
                {/*<td className="border-b border-gray-300 px-4 py-2">{language.id}</td>*/}
                <td className="border-b border-gray-300 px-4 py-2">{language.nombre}</td>
                <td className="border-b border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(language)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Modificar
                  </button>
                  {/*<button
                    onClick={() => handleDelete(language.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VistaIdiomas;
