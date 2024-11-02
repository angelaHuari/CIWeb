import React, { useState } from 'react';

const GestionInscripciones = () => {
  const [students, setStudents] = useState([]); // Lista de estudiantes inscritos
  const [searchName, setSearchName] = useState(''); // Campo de búsqueda
  const [selectedStudent, setSelectedStudent] = useState(null); // Estudiante seleccionado para ver en modal

  // Manejar el botón de buscar
  const handleSearch = () => {
    // Aquí puedes agregar la lógica para buscar estudiantes por nombre
    console.log('Buscando:', searchName);
  };

  // Manejar el botón de registrar
  const handleRegister = () => {
    // Aquí puedes agregar la lógica para registrar un nuevo estudiante
    console.log('Registrar nuevo estudiante');
  };

  // Abrir modal con los detalles del estudiante
  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  return (
    <div className="p-6 font-sans bg-blue-200 min-h-screen">
      {/* Encabezado */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-6">
        Interfaz de Gestión de Inscripciones
      </h1>

      {/* Botones y campo de búsqueda */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Buscar por nombre */}
        <div className="w-full md:w-auto flex flex-col md:flex-row items-center mb-4 md:mb-0">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Buscar por nombre"
            className="p-2 border border-gray-300 rounded mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>

        {/* Botón de registrar */}
        <button
          onClick={handleRegister}
          className="bg-green-500 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-green-600"
        >
          Registrar
        </button>
      </div>

      {/* Tabla de estudiantes inscritos */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Ciclo</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Fecha de Inscripción</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Estado</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="border-b border-gray-300 px-4 py-2">{student.name}</td>
                <td className="border-b border-gray-300 px-4 py-2">{student.cycle}</td>
                <td className="border-b border-gray-300 px-4 py-2">{student.registrationDate}</td>
                <td className="border-b border-gray-300 px-4 py-2">{student.status}</td>
                <td className="border-b border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleViewDetails(student)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {students.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No hay estudiantes inscritos.</p>
        )}
      </div>

      {/* Modal para ver detalles del estudiante */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Detalles del Estudiante</h2>
            <p><strong>Nombre:</strong> {selectedStudent.name}</p>
            <p><strong>Apellido:</strong> {selectedStudent.lastName}</p>
            <p><strong>FotoVoucher:</strong> {selectedStudent.photoVoucher}</p>
            <p><strong>Fecha de Nacimiento:</strong> {selectedStudent.birthDate}</p>
            <p><strong>Ciclo:</strong> {selectedStudent.cycle}</p>
            <p><strong>Grupo:</strong> {selectedStudent.group}</p>
            <p><strong>Monto de Pago:</strong> {selectedStudent.paymentAmount}</p>

            {/* Botones de acción */}
            <div className="mt-6 flex justify-between">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Aprobar
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Desaprobar
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionInscripciones;
