import React, { useState } from 'react';
import axios from 'axios';

const Formulario = () => {
  const [formData, setFormData] = useState({
    email: '',
    nombres: '',
    apellidos: '',
    dni: '',
    sexo: '',
    celular: '',
    fechaNacimiento: '',
    afiliacion: '',
    programadeEstudios: '',
    semestre: '',
    correoInstitucional: '',
    institucionProveniente: '',
    medioPublicitario: '',
    ciclo: '',
    horario: '',
    tienecertificadoIngles: '',
    infoCertificado: '',
    fechaCertificado: '',
    medioDePago: '',
    fechaDePago: '',
    montoDePago: '',
    nroComprobante: '',
    imgComprobante: null,
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? e.target.files[0] : value,
    });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      formPayload.append(key, formData[key]);
    });

    try {
      await axios.post('/api/formularios', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Formulario enviado con éxito');
      setFormData({
        email: '',
        nombres: '',
        apellidos: '',
        dni: '',
        sexo: '',
        celular: '',
        fechaNacimiento: '',
        afiliacion: '',
        programadeEstudios: '',
        semestre: '',
        correoInstitucional: '',
        institucionProveniente: '',
        medioPublicitario: '',
        ciclo: '',
        horario: '',
        tienecertificadoIngles: '',
        infoCertificado: '',
        fechaCertificado: '',
        medioDePago: '',
        fechaDePago: '',
        montoDePago: '',
        nroComprobante: '',
        imgComprobante: null,
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="text" name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} required />
      <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
      <input type="text" name="dni" placeholder="DNI" value={formData.dni} onChange={handleChange} required />
      <input type="text" name="sexo" placeholder="Sexo" value={formData.sexo} onChange={handleChange} required />
      <input type="text" name="celular" placeholder="Celular" value={formData.celular} onChange={handleChange} required />
      <input type="date" name="fechaNacimiento" placeholder="Fecha de Nacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
      <input type="text" name="afiliacion" placeholder="Afiliación" value={formData.afiliacion} onChange={handleChange} required />
      <input type="text" name="programadeEstudios" placeholder="Programa de Estudios" value={formData.programadeEstudios} onChange={handleChange} />
      <input type="text" name="semestre" placeholder="Semestre" value={formData.semestre} onChange={handleChange} />
      <input type="text" name="correoInstitucional" placeholder="Correo Institucional" value={formData.correoInstitucional} onChange={handleChange} />
      <input type="text" name="institucionProveniente" placeholder="Institución Proveniente" value={formData.institucionProveniente} onChange={handleChange} />
      <input type="text" name="medioPublicitario" placeholder="Medio Publicitario" value={formData.medioPublicitario} onChange={handleChange} />
      <input type="text" name="ciclo" placeholder="Ciclo" value={formData.ciclo} onChange={handleChange} required />
      <input type="text" name="horario" placeholder="Horario" value={formData.horario} onChange={handleChange} required />
      <input type="text" name="tienecertificadoIngles" placeholder="¿Tiene certificado de Inglés?" value={formData.tienecertificadoIngles} onChange={handleChange} />
      <input type="text" name="infoCertificado" placeholder="Información del Certificado" value={formData.infoCertificado} onChange={handleChange} />
      <input type="date" name="fechaCertificado" placeholder="Fecha del Certificado" value={formData.fechaCertificado} onChange={handleChange} />
      <input type="text" name="medioDePago" placeholder="Medio de Pago" value={formData.medioDePago} onChange={handleChange} required />
      <input type="date" name="fechaDePago" placeholder="Fecha de Pago" value={formData.fechaDePago} onChange={handleChange} required />
      <input type="number" step="0.01" name="montoDePago" placeholder="Monto de Pago" value={formData.montoDePago} onChange={handleChange} required />
      <input type="text" name="nroComprobante" placeholder="Nro Comprobante" value={formData.nroComprobante} onChange={handleChange} required />
      <input type="file" name="imgComprobante" onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
