import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function FormularioMatriculas({ auth, grupos }) {
  const [voucherPreview, setVoucherPreview] = useState(null); // Estado para la vista previa de la imagen
  const [matriculas, setMatriculas] = useState([]); // Estado para almacenar las matrículas
  const [fotoVoucher, setFotoVoucher] = useState(null); // Para almacenar la URL de la imagen

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      estudiante_id: auth.user.id, // id del usuario estudiante
      fechaMatricula: new Date().toLocaleDateString(), // Fecha de matrícula oculta
      cicloIngles: '',
      horarioIngles: '',
      montoPago: 100, // Monto fijo de S/100
      medioPago: '',
      nroVoucher: '',
      fotoVoucher: null,
    },
  });

  const onSubmit = (data) => {
    console.log('Datos del formulario:', data);
    // Agregar la matrícula al estado
    setMatriculas([
      ...matriculas,
      {
        ciclo: data.ciclo,
        horario: data.horario,
        montoPago: data.montoPago,
        medioPago: data.medioPago,
        nroVoucher: data.nroVoucher,
        fotoVoucher: fotoVoucher, // Guardar la URL de la imagen
        calificacion: 'Pendiente', // Calificación por defecto
      },
    ]);


    alert('¡Registro exitoso!');
  };

  // Función para manejar la selección de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Crear una URL temporal para mostrar la vista previa
      const imageUrl = URL.createObjectURL(file);
      setVoucherPreview(imageUrl); // Establecer la URL para la vista previa
      setFotoVoucher(imageUrl); // Guardar la URL de la imagen en el estado
    } else {
      setVoucherPreview(null);
      setFotoVoucher(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg border border-gray-200" // Aumentar el max-width y padding
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-[#700303]">Formulario de Matriculas -Mensualidades</h2>

      {/* Fecha de matrícula escondida */}
      <input type="hidden" {...register('fechaMatricula')} />


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Ciclo:</label>
          <select
            {...register('cicloIngles')}
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          >
            <option value="">Seleccione Ciclo</option>
            {[...new Set(grupos.map(grupo => grupo.ciclo.id))].map((cicloId) => {
              const grupo = grupos.find(g => g.ciclo.id === cicloId);
              const ciclo = grupo?.ciclo;
              return (
                <option key={cicloId} value={cicloId}>
                  {`${ciclo?.nombre} - ${ciclo?.idioma?.nombre || ''}`}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Horario:</label>
          <select
            {...register('horario', { required: 'El horario es obligatorio' })}
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303] text-ellipsis overflow-hidden"
          >
            <option value="">Selecciona un horario</option>
            <option value="7:00-8:30 AM">7:00-8:30 AM</option>
            <option value="10:00-11:30 AM">10:00-11:30 AM</option>
            <option value="1:00-2:30 PM">1:00-2:30 PM</option>
            <option value="4:00-5:30 PM">4:00-5:30 PM</option>
            <option value="7:00-8:30 PM">7:00-8:30 PM</option>
          </select>
          {errors.horario && <p className="text-red-500 text-sm mt-1">{errors.horario.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Monto Pagado:</label>
          <input
            type="text"
            value="S/100" // Fijo
            disabled
            className="border border-[#700303] p-2 w-full rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Medio de Pago:</label>
          <select
            {...register('medioPago')}
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          >
            <option value="Caja Institucional">Caja Institucional</option>
            <option value="Banco de la Nación">Banco de la Nación</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Nro Voucher:</label>
          <input
            type="text"
            {...register('nroVoucher', { required: 'El número de voucher es obligatorio' })}
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          />
          {errors.nroVoucher && <p className="text-red-500 text-sm mt-1">{errors.nroVoucher.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Foto de Voucher:</label>
          <input
            type="file"
            {...register('fotoVoucher')}
            className="border border-[#700303] p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
            accept="image/*" // Aceptar solo imágenes
            onChange={handleImageChange} // Capturar la imagen seleccionada
          />

          {/* Mostrar la vista previa de la imagen si hay una */}
          {voucherPreview && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-[#700303]">Vista Previa:</label>
              <img
                src={voucherPreview}
                alt="Voucher Preview"
                className="border border-[#700303] p-1 mt-1 rounded-md"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }} // Tamaño pequeño
              />
            </div>
          )}
        </div>
      </div>

      <div className="text-right mt-8"> {/* Usar text-right para alinear el contenido a la derecha */}
        <button
          type="submit"
          className="bg-[#700303] hover:bg-[#8c1010] text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

export default FormularioMatriculas;   