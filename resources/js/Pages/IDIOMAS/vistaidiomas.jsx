import React, { useState } from 'react';

const VistaIdiomas = () => {
  const [languages, setLanguages] = useState([]); // Lista de idiomas
  const [name, setName] = useState('');           // Nombre del idioma
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Idioma seleccionado para edición

  // Manejar el envío del formulario para registrar o editar un idioma
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedLanguage) {
      // Editar idioma
      const updatedLanguages = languages.map((lang) =>
        lang.id === selectedLanguage.id ? { ...lang, name } : lang
      );
      setLanguages(updatedLanguages);
      setSelectedLanguage(null); // Limpiar selección de idioma
    } else {
      // Crear nuevo idioma
      const newLanguage = {
        id: languages.length + 1,
        name,
      };
      setLanguages([...languages, newLanguage]);  // Añadir a la lista
    }

    // Limpiar el formulario
    setName('');
  };

  // Manejar la edición de un idioma
  const handleEdit = (language) => {
    setSelectedLanguage(language);
    setName(language.name);
  };

  // Manejar la eliminación de un idioma
  const handleDelete = (id) => {
    const updatedLanguages = languages.filter((lang) => lang.id !== id);
    setLanguages(updatedLanguages);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 font-sans bg-blue-200 min-h-screen"> {/* Fondo celeste y espacio ajustado */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-6">
        Interfaz de Gestión de Idiomas
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Formulario para agregar o editar un idioma */}
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Registro de Idioma</h3>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del Idioma"
              required
              className="p-2 border border-gray-300 rounded mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto ${
                selectedLanguage ? 'bg-green-500' : 'bg-blue-500'
              } hover:bg-blue-600`}
            >
              {selectedLanguage ? 'Modificar' : 'Agregar'}
            </button>
          </form>
        </div>

        {/* Botón de Cancelar Edición */}
        {selectedLanguage && (
          <button
            onClick={() => setSelectedLanguage(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-blue-600"
          >
            Cancelar Edición
          </button>
        )}
      </div>

      {/* Tabla de idiomas */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((language) => (
              <tr key={language.id}>
                <td className="border-b border-gray-300 px-4 py-2">{language.id}</td>
                <td className="border-b border-gray-300 px-4 py-2">{language.name}</td>
                <td className="border-b border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(language)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full md:w-auto"
                    >
                      Modificar
                    </button>
                    <button
                      onClick={() => handleDelete(language.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full md:w-auto"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {languages.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No hay idiomas registrados.</p>
        )}
      </div>
    </div>
  );
};

export default VistaIdiomas;
