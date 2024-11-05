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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Interfaz de Gestión de Idiomas</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        {/* Formulario para agregar o editar un idioma */}
        <div>
          <h3>Registro de Idioma</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del Idioma"
              required
              style={{ padding: '5px', fontSize: '16px', marginRight: '10px' }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#00aaff',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              {selectedLanguage ? 'Modificar' : 'Agregar'}
            </button>
          </form>
        </div>

        {/* Botones de acción */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {selectedLanguage && (
            <button
              onClick={() => setSelectedLanguage(null)}
              style={{
                backgroundColor: '#00aaff',
                color: 'white',
                border: 'none',
                padding: '10px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Cancelar Edición
            </button>
          )}
        </div>
      </div>

      {/* Tabla de idiomas */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>ID</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Nombre</th>
            <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {languages.map((language) => (
            <tr key={language.id}>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{language.id}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{language.name}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                <button
                  onClick={() => handleEdit(language)}
                  style={{
                    backgroundColor: '#00aaff',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Modificar
                </button>
                <button
                  onClick={() => handleDelete(language.id)}
                  style={{
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VistaIdiomas;
