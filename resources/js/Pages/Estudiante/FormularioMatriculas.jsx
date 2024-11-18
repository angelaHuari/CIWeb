import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

function FormularioMatriculas({ grupos }) {
  const [voucherPreview, setVoucherPreview] = useState(null); // Estado para la vista previa de la imagen
 
  const { data, setData, post, processing, errors } = useForm({
    fechaMatricula: new Date().toISOString().split('T')[0], // Fecha actual
    cicloIngles: '',
    horarioIngles: '',
    fechaPago: new Date().toISOString().split('T')[0], // Fecha actual
    nroComprobante: '',
    montoPago: 100,
    medioPago: '',
    imgComprobante: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('estudiante.enviar'));
    // Limpiar los campos (excepto los no mostrados)
    setData({
      fechaMatricula: new Date().toISOString().split('T')[0], // Fecha actual
      cicloIngles: '',
      horarioIngles: '',
      fechaPago: new Date().toISOString().split('T')[0],
      nroComprobante: '',
      montoPago: 100,
      medioPago: '',
      imgComprobante: null,
    });
  };

  // Función para manejar la selección de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Crear una URL temporal para mostrar la vista previa
      const imageUrl = URL.createObjectURL(file);
      setVoucherPreview(imageUrl); // Establecer la URL para la vista previa
      setData('imgComprobante', file); // Guardar la URL de la imagen en el estado
    } else {
      setVoucherPreview(null);
      setData('imgComprobante', null);
    }
  };

  // Limpieza de URLs temporales para liberar memoria
  React.useEffect(() => {
    return () => {
      if (voucherPreview) {
        URL.revokeObjectURL(voucherPreview);
      }
    };
  }, [voucherPreview]);
  // Filtra los horarios basados en el ciclo seleccionado 
  const horariosFiltrados = grupos.filter((grupo) => grupo.ciclo.id === parseInt(data.cicloIngles));

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg border border-gray-200" // Aumentar el max-width y padding
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-[#700303]">Formulario de Matriculas -Mensualidades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Ciclo:</label>
          <select
            id="cicloIngles"
            value={data.cicloIngles}
            onChange={(e) => setData('cicloIngles', e.target.value)}
            required
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          >
            <option value="">Seleccione Ciclo</option>
            {[...new Set(grupos.map(grupo => grupo.ciclo.id))].map((cicloId) => {
              const grupo = grupos.find(g => g.ciclo.id === cicloId);
              const ciclo = grupo?.ciclo;
              return (
                <option key={cicloId} value={cicloId}>
                  {/* Si ciclo o idioma son indefinidos, muestra una cadena vacía */}
                  {`${ciclo?.nombre || ''} - ${ciclo?.idioma?.nombre || ''}`}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Horario:</label>
          <select
            id="horarioIngles"
            value={data.horarioIngles}
            onChange={(e) => setData('horarioIngles', e.target.value)}
            required
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303] text-ellipsis overflow-hidden"
          >
            <option value="">Selecciona un horario</option>
            {horariosFiltrados.map((grupo) => (<option key={grupo.id} value={grupo.id}> {`${grupo.modalidad} - ${grupo.horario} (Vacantes: ${grupo.nroVacantes})`} </option>))}

          </select>

          {errors.horarioIngles && <p className="text-red-500 text-sm mt-1">{errors.horarioIngles.message}</p>}
        </div>


        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Fecha de Pago:</label>
          <input
            id="fechaPago"
            type="date"
            value={data.fechaPago}
            onChange={(e) => setData('fechaPago', e.target.value)}
            required
            className="border border-[#700303] p-2 w-full rounded-md bg-gray-100"
          />
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
            id="medioPago"
            value={data.medioPago}
            onChange={(e) => setData('medioPago', e.target.value)}
            required
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          >
            <option value="Caja Institucional">Caja Institucional</option>
            <option value="Banco de la Nación">Banco de la Nación</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Nro Voucher:</label>
          <input
            id="nroComprobante"
            type="text"
            value={data.nroComprobante}
            onChange={(e) => setData('nroComprobante', e.target.value)}
            required
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          />
          {errors.nroVoucher && <p className="text-red-500 text-sm mt-1">{errors.nroVoucher.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Foto de Voucher:</label>
          <input
            id="imgComprobante"
            type="file"
            required
            accept="image/*" // Aceptar solo imágenes
            onChange={handleImageChange} // Capturar la imagen seleccionada
            className="border border-[#700303] p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
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

      <div className="text-right mt-8"> 
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
