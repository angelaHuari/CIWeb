import React, { useState } from 'react';

const DatosAdicionales = ({ data, setData, grupos = [], ciclos = [] }) => {

    const [correoEgresado, setCorreoEgresado] = useState('');
    const handleTipoAlumnoChange = (e) => {
        setData({ ...data, tipoAlumno: e.target.value });
    };
    console.log('Datos de grupos:', grupos);
    console.log('Datos de ciclos:', ciclos);

    if (Array.isArray(grupos) && Array.isArray(ciclos)) {
        const gruposFiltrados = grupos.filter(grupo => {
            // Buscar el ciclo correspondiente al ciclo_id del grupo
            const ciclo = ciclos.find(c => c.id === grupo.ciclo_id);
            // Retornar true si el ciclo tiene el nombre 'básico'
            return ciclo && ciclo.nombre === 'Basico';
        });

        console.log(gruposFiltrados);
    } else {
        console.error('Los datos de grupos o ciclos no son arrays');
    }
    return (
        <div>
            <strong><h2>Datos Adicionales</h2></strong>
            <label>¿Usted es?</label>
            <div>
                <select value={data.tipoAlumno} onChange={handleTipoAlumnoChange}>
                    <option value="">Seleccione...</option>
                    <option value="alumno">Alumno del Instituto</option>
                    <option value="egresado">Egresado del Instituto</option>
                    <option value="no_alumno">No soy alumno del Instituto</option>
                </select>
            </div>

            {data.tipoAlumno === 'alumno' && (
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

                    <label>Indique su correo institucional:</label>
                    <input type="email" value={data.correoInstitucional} onChange={(e) => setData({ ...data, correoInstitucional: e.target.value })} />
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
                    {correoEgresado === 'si' && (
                        <div>
                            <label>Indique su correo institucional:</label>
                            <input type="email" value={data.correoInstitucional} onChange={(e) => setData({ ...data, correoInstitucional: e.target.value })} />
                        </div>
                    )}
                    {correoEgresado === 'no' && (
                        <div>
                            <label>Indique su correo personal:</label>
                            <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                        </div>
                    )}

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

                    <label>Indique su correo personal:</label>
                    <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
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
                        cicloNombre: selectedCiclo ? `${selectedCiclo.nombre} - ${selectedCiclo.idioma.nombre}` : '',
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
                            {`${ciclo?.nombre} - ${ciclo?.idioma?.nombre || ''}`}
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

        </div>
    );
};

export default DatosAdicionales;