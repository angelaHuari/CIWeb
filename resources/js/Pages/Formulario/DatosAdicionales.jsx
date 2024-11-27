import React, { useState } from 'react';

const DatosAdicionales = ({ data, setData, grupos = [], errors }) => {
    const [correoEgresado, setCorreoEgresado] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const handleTipoAlumnoChange = (e) => {
        setData({ ...data, tipoAlumno: e.target.value });
    };

    const validateEmail = (email, type = 'personal') => {
        let error = '';
        if (!email) {
            error = 'El correo es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            error = 'Formato de correo inválido';
        } else if (type === 'institucional') {
            if (!email.endsWith('@istta.edu.pe')) {
                error = 'Debe ser un correo institucional (@istta.edu.pe)';
            }
        }
        return error;
    };

    const handleEmailChange = (e, type = 'personal') => {
        const { name, value } = e.target;
        const error = validateEmail(value, type);
        
        setFieldErrors(prev => ({
            ...prev,
            [name]: error
        }));

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const renderEmailField = (type) => {
        if (type === 'institucional') {
            return (
                <div>
                    <label>Indique su correo institucional: *</label>
                    <input
                        type="email"
                        name="correoInstitucional"
                        value={data.correoInstitucional}
                        onChange={(e) => handleEmailChange(e, 'institucional')}
                        className={fieldErrors.correoInstitucional ? 'error-input' : ''}
                    />
                    {fieldErrors.correoInstitucional && 
                        <span className="error-message">{fieldErrors.correoInstitucional}</span>}
                </div>
            );
        } else {
            return (
                <div>
                    <label>Indique su correo personal: *</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => handleEmailChange(e, 'personal')}
                        className={fieldErrors.email ? 'error-input' : ''}
                    />
                    {fieldErrors.email && 
                        <span className="error-message">{fieldErrors.email}</span>}
                </div>
            );
        }
    };

    return (
        <div className="datos-adicionales">
            <strong><h2>Datos Adicionales</h2></strong>
            <label>¿Usted es?</label>
            <div>
                <select 
                    name="tipoAlumno"
                    value={data.tipoAlumno} 
                    onChange={handleTipoAlumnoChange} 
                    className={fieldErrors.tipoAlumno || errors?.tipoAlumno ? 'error-input' : ''}
                    required
                >
                    <option value="">Seleccione...</option>
                    <option value="alumno">Alumno del Instituto</option>
                    <option value="egresado">Egresado del Instituto</option>
                    <option value="no_alumno">No soy alumno del Instituto</option>
                </select>
                {(fieldErrors.tipoAlumno || errors?.tipoAlumno) && 
                    <span className="error-message">{fieldErrors.tipoAlumno || errors?.tipoAlumno}</span>}
            </div>

            {data.tipoAlumno === 'alumno' && (
                <div>
                    <label>Seleccione su programa de estudios:</label>
                    <select value={data.programaEstudios} onChange={(e) => setData({ ...data, programaEstudios: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="dsi">Desarrollo de Sistemas de Informacion</option>
                        <option value="electronica">Electrónica Industrial</option>
                        <option value="ei">Electricidad Industrial</option>
                        <option value="ma">Mecanica Automotriz</option>
                        <option value="mpi">MPI</option>
                        <option value="contabilidad">Contabilidad</option>
                        <option value="got">Guia Oficial de Turismo</option>
                        <option value="ashr">ASHR</option>
                        <option value="lcap">LCAP</option>
                        <option value="et">ET</option>
                    </select>

                    <label>Seleccione su semestre actual:</label>
                    <select value={data.semestre} onChange={(e) => setData({ ...data, semestre: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                        <option value="VI">VI</option>
                    </select>

                    {renderEmailField('institucional')}
                </div>
            )}

            {data.tipoAlumno === 'egresado' && (
                <div>
                    <label>Seleccione su programa de estudios:</label>
                    <select value={data.programaEstudios} onChange={(e) => setData({ ...data, programaEstudios: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="dsi">DSI</option>
                        <option value="electro">Electrónica I</option>
                        <option value="ei">EI</option>
                        <option value="ma">MA</option>
                        <option value="mpi">MPI</option>
                        <option value="conta">Conta</option>
                        <option value="got">GOT</option>
                        <option value="ashr">ASHR</option>
                        <option value="lcap">LCAP</option>
                        <option value="et">ET</option>
                    </select>

                    <label>Año de Egreso:</label>
                    <input type="text" value={data.anioEgreso} onChange={(e) => setData({ ...data, anioEgreso: e.target.value })} />

                    <label>¿Cuenta con correo institucional?</label>
                    <select value={correoEgresado} onChange={(e) => setCorreoEgresado(e.target.value)}>
                        <option value="">Seleccione...</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                    {correoEgresado === 'si' && renderEmailField('institucional')}
                    {correoEgresado === 'no' && renderEmailField('personal')}
                </div>
            )}

            {data.tipoAlumno === 'no_alumno' && (
                <div>
                    <label>¿De qué institución proviene?</label>
                    <input type="text" value={data.institucionProviene} onChange={(e) => setData({ ...data, institucionProviene: e.target.value })} />

                    <label>¿Dónde se enteró del centro de idiomas?</label>
                    <select value={data.medioPublicitario} onChange={(e) => setData({ ...data, medioPublicitario: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="pagina_web">Página web ISTTA</option>
                        <option value="facebook">Facebook</option>
                        <option value="anuncios">Anuncios</option>
                        <option value="folletos">Folletos</option>
                        <option value="amigos">Amigos</option>
                        <option value="familiar">Familiar</option>
                    </select>

                    {renderEmailField('personal')}
                </div>
            )}

            {/* Ciclos de inglés */}
            <label>¿A qué ciclo de inglés desea matricularse?</label>
            <select 
                value={data.cicloIngles} 
                onChange={(e) => {
                    const selectedCiclo = grupos.find(g => g.ciclo.id === parseInt(e.target.value))?.ciclo;
                    setData({ 
                        ...data, 
                        cicloIngles: e.target.value,
                        cicloNombre: selectedCiclo ? `${selectedCiclo.nombre} - ${selectedCiclo.idioma.nombre} - ${selectedCiclo.nivel}` : '',
                        horarioIngles: '' 
                    });
                }}
            >
                <option value="">Seleccione...</option>
                {[...new Set(grupos.map(grupo => grupo.ciclo.id))].map((cicloId) => {
                    const grupo = grupos.find(g => g.ciclo.id === cicloId);
                    const ciclo = grupo?.ciclo;
                    return (
                        <option key={cicloId} value={cicloId}>
                            {`${ciclo?.nombre} - ${ciclo?.idioma?.nombre || ''} - ${ciclo?.nivel} `}
                        </option>
                    );
                })}
            </select>

            {/* Horarios disponibles según el ciclo seleccionado */}
            {data.cicloIngles && (
                <div>
                    <label>Seleccione el horario disponible:</label>
                    <select 
                        value={data.horarioIngles} 
                        onChange={(e) => {
                            const selectedGrupo = grupos.find(g => g.id === parseInt(e.target.value));
                            setData({ 
                                ...data, 
                                horarioIngles: e.target.value,
                                horarioTexto: selectedGrupo?.horario || '',
                                modalidad: selectedGrupo?.modalidad || ''
                            });
                        }}
                    >
                        <option value="">Seleccione...</option>
                        {grupos
                            .filter(grupo => grupo.ciclo.id === parseInt(data.cicloIngles))
                            .map((grupo) => (
                                <option key={grupo.id} value={grupo.id}>
                                    {`${grupo.modalidad} - ${grupo.horario} (Vacantes: ${grupo.nroVacantes})`}
                                </option>
                            ))}
                    </select>

                    {/* Campos adicionales según el ciclo */}
                    {(() => {
                        const cicloSeleccionado = grupos.find(g => g.ciclo.id === parseInt(data.cicloIngles))?.ciclo;
                        const nombreCiclo = cicloSeleccionado?.nombre.toLowerCase() || '';
                        
                        // Si es intermedio
                        if (nombreCiclo.includes('intermedio')) {
                            return (
                                <>
                                    <div className="mt-4">
                                        <label>¿Dónde realizó el ciclo básico?</label>
                                        <select 
                                            value={data.realizoInglesBasico} 
                                            onChange={(e) => setData({ ...data, realizoInglesBasico: e.target.value })}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="istta">ISTTA</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label>¿Cuenta con certificado de básico?</label>
                                        <select 
                                            value={data.tienecertificadoIngles} 
                                            onChange={(e) => setData({ ...data, tienecertificadoIngles: e.target.value })}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </>
                            );
                        }
                        
                        // Si es avanzado
                        if (nombreCiclo.includes('avanzado')) {
                            return (
                                <>
                                    <div className="mt-4">
                                        <label>¿Dónde realizó el ciclo intermedio?</label>
                                        <select 
                                            value={data.realizoInglesIntermedio} 
                                            onChange={(e) => setData({ ...data, realizoInglesIntermedio: e.target.value })}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="istta">ISTTA</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label>¿Cuenta con certificado de intermedio?</label>
                                        <select 
                                            value={data.tieneCertificadoIntermedio} 
                                            onChange={(e) => setData({ ...data, tieneCertificadoIntermedio: e.target.value })}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </>
                            );
                        }
                        
                        return null; // Si es básico, no mostrar campos adicionales
                    })()}
                </div>
            )}

            <style>{`
                .datos-adicionales .error-input {
                    border: 1px solid red;
                }
                .datos-adicionales .error-message {
                    color: red;
                    font-size: 0.8em;
                    margin-top: 2px;
                    display: block;
                }
            `}</style>
        </div>
    );
};

export default DatosAdicionales;