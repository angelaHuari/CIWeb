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
            <select value={data.cicloIngles} onChange={(e) => setData({ ...data, cicloIngles: e.target.value })}>
                <option value="">Seleccione...</option>
                { ciclos.map((ciclo) => {
                    <option value={ciclo.nombre}>{`${ciclo.nombre} ${ciclo.idioma.nombre}`}</option>
                })}

            </select>

            {/* Horario según ciclo */}
            {data.cicloIngles === 'basico' && (
                <div>
                    <label>Seleccione el horario</label>
                    <select value={data.horarioIngles} onChange={(e) => setData({ ...data, horarioIngles: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="a">Presencial (1:30pm - 3:00pm)</option>
                        <option value="b">Virtual (7:00pm - 8:30pm)</option>
                        <option value="c">Virtual (8:30pm - 10:00pm)</option>
                    </select>
                </div>
            )}

            {data.cicloIngles === 'intermedio' && (
                <div>
                    <label>Seleccione el horario virtual</label>
                    <select value={data.horarioIngles} onChange={(e) => setData({ ...data, horarioIngles: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="d">Virtual (7:00pm)</option>
                        <option value="e">Virtual (8:30pm)</option>
                    </select>

                    <label>¿Dónde realizó el ciclo básico?</label>
                    <select value={data.realizoInglesBasico} onChange={(e) => setData({ ...data, realizoInglesBasico: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="istta">ISTTA</option>
                        <option value="otro">Otro</option>
                    </select>

                    <label>¿Cuenta con certificado?</label>
                    <select value={data.tienecertificadoIngles} onChange={(e) => setData({ ...data, tienecertificadoIngles: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="si">Si</option>
                        <option value="no">No</option>
                    </select>
                </div>

            )}

            {data.cicloIngles === 'avanzado' && (
                <div>
                    <label>Seleccione el horario</label>
                    <select value={data.horarioIngles} onChange={(e) => setData({ ...data, horarioIngles: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="j">Virtual (7:00pm)</option>
                        <option value="k">Virtual (8:30pm)</option>
                    </select>

                    <label>¿Dónde realizó el ciclo intermedio?</label>
                    <select value={data.realizoInglesIntermedio} onChange={(e) => setData({ ...data, realizoInglesIntermedio: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="istta">ISTTA</option>
                        <option value="otro">Otro</option>
                    </select>

                    <label>¿Cuenta con certificado?</label>
                    <select value={data.tienecertificadoIngles} onChange={(e) => setData({ ...data, tienecertificadoIngles: e.target.value })}>
                        <option value="">Seleccione...</option>
                        <option value="si">Si</option>
                        <option value="no">No</option>
                    </select>

                </div>
            )}
        </div>
    );
};

export default DatosAdicionales;