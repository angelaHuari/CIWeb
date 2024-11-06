import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [nombres, setNombres] = useState('');
    const [sexo, setSexo] = useState('');
    const [celular, setCelular] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [rol, setRol] = useState('');
    const [programaEstudios, setProgramaEstudios] = useState('');
    const [semestre, setSemestre] = useState('');
    const [correoInstitucional, setCorreoInstitucional] = useState('');
    const [anoEgreso, setAnoEgreso] = useState('');
    const [tieneCorreoInstitucional, setTieneCorreoInstitucional] = useState('');
    const [mostrarCorreoInstitucional, setMostrarCorreoInstitucional] = useState(false);
    const [institucionProviene, setInstitucionProviene] = useState(''); // Nuevo estado
    const [fuenteInformacion, setFuenteInformacion] = useState(''); // Nuevo estado para la fuente de información
    const [errors, setErrors] = useState(null);
    const [cicloIngles, setCicloIngles] = useState('');
    const [modalidadBasico, setModalidadBasico] = useState('');
    const [horarioBasico, setHorarioBasico] = useState('');
    const [horarioIntermedio, setHorarioIntermedio] = useState('');
    const [lugarBasico, setLugarBasico] = useState('');
    const [fechaFinBasico, setFechaFinBasico] = useState('');
    const [certificadoBasico, setCertificadoBasico] = useState('');
    const [horarioAvanzado, setHorarioAvanzado] = useState('');
    const [lugarIntermedio, setLugarIntermedio] = useState('');
    const [fechaFinIntermedio, setFechaFinIntermedio] = useState('');

    const validateDNI = (dni) => {
        return dni.length === 8 && /^\d+$/.test(dni);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateCelular = (celular) => {
        return celular.length === 9 && /^\d+$/.test(celular);
    };

    const validateAnoEgreso = (ano) => {
        const currentYear = new Date().getFullYear();
        const anoNum = parseInt(ano);
        return !isNaN(anoNum) && anoNum >= 1980 && anoNum <= currentYear;
    };

    const validateCommonFields = () => {
        const errors = [];

        if (!dni || !validateDNI(dni)) {
            errors.push("El DNI debe tener 8 dígitos numéricos.");
        }
        if (!apellidoPaterno || apellidoPaterno.trim().length < 2) {
            errors.push("El apellido paterno es requerido (mínimo 2 caracteres).");
        }
        if (!apellidoMaterno || apellidoMaterno.trim().length < 2) {
            errors.push("El apellido materno es requerido (mínimo 2 caracteres).");
        }
        if (!nombres || nombres.trim().length < 2) {
            errors.push("El nombre es requerido (mínimo 2 caracteres).");
        }
        if (!sexo) {
            errors.push("Debe seleccionar el sexo.");
        }
        if (!celular || !validateCelular(celular)) {
            errors.push("El número de celular debe tener 9 dígitos numéricos.");
        }
        if (!fechaNacimiento) {
            errors.push("La fecha de nacimiento es requerida.");
        }
        if (!rol) {
            errors.push("Debe seleccionar su rol.");
        }

        return errors;
    };

    const validateEnglishCourseFields = () => {
        const errors = [];

        if (!cicloIngles) {
            errors.push("Debe seleccionar un ciclo de inglés.");
        }

        if (cicloIngles === 'basico') {
            if (!modalidadBasico) {
                errors.push("Debe seleccionar la modalidad del ciclo básico.");
            }
            if (!horarioBasico) {
                errors.push("Debe seleccionar un horario para el ciclo básico.");
            }
        }

        if (cicloIngles === 'intermedio') {
            if (!horarioIntermedio) {
                errors.push("Debe seleccionar un horario para el ciclo intermedio.");
            }
            if (!lugarBasico) {
                errors.push("Debe indicar dónde realizó el inglés básico.");
            }
            if (!fechaFinBasico) {
                errors.push("Debe indicar cuándo acabó el inglés básico.");
            }
            if (!certificadoBasico) {
                errors.push("Debe indicar si cuenta con certificado de inglés básico.");
            }
        }

        if (cicloIngles === 'avanzado') {
            if (!horarioAvanzado) {
                errors.push("Debe seleccionar un horario para el ciclo avanzado.");
            }
            if (!lugarIntermedio) {
                errors.push("Debe indicar dónde realizó el inglés intermedio.");
            }
            if (!fechaFinIntermedio) {
                errors.push("Debe indicar cuándo acabó el inglés intermedio.");
            }
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = validateCommonFields();
        validationErrors = [...validationErrors, ...validateEnglishCourseFields()];

        // Solo validar los campos específicos según el rol seleccionado
        switch (rol) {
            case 'alumno':
                if (!programaEstudios) {
                    validationErrors.push("Debe seleccionar un programa de estudios.");
                }
                if (!semestre) {
                    validationErrors.push("Debe seleccionar un semestre.");
                }
                if (!correoInstitucional || !validateEmail(correoInstitucional)) {
                    validationErrors.push("Debe ingresar un correo institucional válido.");
                }
                break;

            case 'egresado':
                if (!programaEstudios) {
                    validationErrors.push("Debe seleccionar un programa de estudios.");
                }
                if (!tieneCorreoInstitucional) {
                    validationErrors.push("Debe indicar si cuenta con correo institucional.");
                }
                if (tieneCorreoInstitucional === 'si' && (!correoInstitucional || !validateEmail(correoInstitucional))) {
                    validationErrors.push("Debe ingresar un correo institucional válido.");
                }
                if (!anoEgreso || !validateAnoEgreso(anoEgreso)) {
                    validationErrors.push("Debe ingresar un año de egreso válido (entre 1980 y el año actual).");
                }
                break;

            case 'no-alumno':
                if (!institucionProviene || institucionProviene.trim().length < 2) {
                    validationErrors.push("Debe indicar la institución de procedencia.");
                }
                if (!fuenteInformacion) {
                    validationErrors.push("Debe seleccionar cómo se enteró del centro de idiomas.");
                }
                break;
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors.join('\n'));
            return;
        }

        // Si no hay errores, proceder con el envío
        console.log('Formulario enviado con éxito:', {
            dni,
            apellidoPaterno,
            apellidoMaterno,
            nombres,
            sexo,
            celular,
            fechaNacimiento,
            rol,
            cicloIngles,
            ...(rol === 'alumno' && {
                programaEstudios,
                semestre,
                correoInstitucional
            }),
            ...(rol === 'egresado' && {
                programaEstudios,
                tieneCorreoInstitucional,
                ...(tieneCorreoInstitucional === 'si' && { correoInstitucional }),
                anoEgreso
            }),
            ...(rol === 'no-alumno' && {
                institucionProviene,
                fuenteInformacion
            }),
            cicloIngles,
            ...(cicloIngles === 'basico' && {
                modalidadBasico,
                horarioBasico,
            }),
            ...(cicloIngles === 'intermedio' && {
                horarioIntermedio,
                lugarBasico,
                fechaFinBasico,
                certificadoBasico,
            }),
            ...(cicloIngles === 'avanzado' && {
                horarioAvanzado,
                lugarIntermedio,
                fechaFinIntermedio,
            }),
        });

        setErrors(null);
        // Aquí iría la lógica para enviar los datos al servidor
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-[#f2f0c9] text-black">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#820004] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                                <img
                                    src="/resources/img/logoCI.png"
                                    alt="Logo"
                                    className="w-32 h-32 object-cover md:w-32 md:h-32 lg:w-32 lg:h-32"
                                />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-[#820004] ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#820004]"
                                >
                                    Log in
                                </Link>
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <h2 className="text-xl font-bold mb-4 text-[#820004]">Registro</h2>
                                {errors && <p className="text-red-500">{errors}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700">
                                                Apellido Paterno
                                            </label>
                                            <input
                                                type="text"
                                                id="apellidoPaterno"
                                                value={apellidoPaterno}
                                                onChange={(e) => setApellidoPaterno(e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700">
                                                Apellido Materno
                                            </label>
                                            <input
                                                type="text"
                                                id="apellidoMaterno"
                                                value={apellidoMaterno}
                                                onChange={(e) => setApellidoMaterno(e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
                                            Nombres
                                        </label>
                                        <input
                                            type="text"
                                            id="nombres"
                                            value={nombres}
                                            onChange={(e) => setNombres(e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                                                Documento de Identidad (DNI)
                                            </label>
                                            <input
                                                type="text"
                                                id="dni"
                                                value={dni}
                                                onChange={(e) => setDni(e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">
                                                Sexo
                                            </label>
                                            <select
                                                id="sexo"
                                                value={sexo}
                                                onChange={(e) => setSexo(e.target.value)}
                                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                required
                                            >
                                                <option value="">Seleccione...</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="femenino">Femenino</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="celular" className="block text-sm font-medium text-gray-700">
                                            Número de Celular
                                        </label>
                                        <input
                                            type="text"
                                            id="celular"
                                            value={celular}
                                            onChange={(e) => setCelular(e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                                            Fecha de Nacimiento
                                        </label>
                                        <input
                                            type="date"
                                            id="fechaNacimiento"
                                            value={fechaNacimiento}
                                            onChange={(e) => setFechaNacimiento(e.target.value)}
                                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            ¿Usted es?
                                        </label>
                                        <div className="flex flex-col mt-2">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                    value="alumno"
                                                    checked={rol === 'alumno'}
                                                    onChange={(e) => setRol(e.target.value)}
                                                />
                                                <span className="ml-2">Alumno del Instituto</span>
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                    value="egresado"
                                                    checked={rol === 'egresado'}
                                                    onChange={(e) => setRol(e.target.value)}
                                                />
                                                <span className="ml-2">Egresado del Instituto</span>
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                    value="no-alumno"
                                                    checked={rol === 'no-alumno'}
                                                    onChange={(e) => setRol(e.target.value)}
                                                />
                                                <span className="ml-2">No soy alumno del Instituto</span>
                                            </label>
                                        </div>
                                    </div>

                                    {rol === 'alumno' && (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="programaEstudios" className="block text-sm font-medium text-gray-700">
                                                    Seleccione su Programa de Estudios
                                                </label>
                                                <select
                                                    id="programaEstudios"
                                                    value={programaEstudios}
                                                    onChange={(e) => setProgramaEstudios(e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                    required
                                                >
                                                    <option value="">Seleccione...</option>
                                                    <option value="dsi">DSI</option>
                                                    <option value="electronica">Electrónica I</option>
                                                    <option value="ei">EI</option>
                                                    <option value="ma">MA</option>
                                                    <option value="mpi">MPI</option>
                                                    <option value="conta">Conta</option>
                                                    <option value="got">GOT</option>
                                                    <option value="ashr">ASHR</option>
                                                    <option value="lcap">LCAP</option>
                                                    <option value="et">ET</option>
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="semestre" className="block text-sm font-medium text-gray-700">
                                                    Seleccione su Semestre Actual
                                                </label>
                                                <select
                                                    id="semestre"
                                                    value={semestre}
                                                    onChange={(e) => setSemestre(e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                    required
                                                >
                                                    <option value="">Seleccione...</option>
                                                    <option value="I">I</option>
                                                    <option value="II">II</option>
                                                    <option value="III">III</option>
                                                    <option value="IV">IV</option>
                                                    <option value="V">V</option>
                                                    <option value="VI">VI</option>
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="correoInstitucional" className="block text-sm font-medium text-gray-700">
                                                    Indique su Correo Institucional
                                                </label>
                                                <input
                                                    type="email"
                                                    id="correoInstitucional"
                                                    value={correoInstitucional}
                                                    onChange={(e) => setCorreoInstitucional(e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}

                                    {rol === 'egresado' && (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="programaEstudios" className="block text-sm font-medium text-gray-700">
                                                    Seleccione su Programa de Estudios
                                                </label>
                                                <select
                                                    id="programaEstudios"
                                                    value={programaEstudios}
                                                    onChange={(e) => setProgramaEstudios(e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                    required
                                                >
                                                    <option value="">Seleccione...</option>
                                                    <option value="dsi">DSI</option>
                                                    <option value="electronica">Electrónica I</option>
                                                    <option value="ei">EI</option>
                                                    <option value="ma">MA</option>
                                                    <option value="mpi">MPI</option>
                                                    <option value="conta">Conta</option>
                                                    <option value="got">GOT</option>
                                                    <option value="ashr">ASHR</option>
                                                    <option value="lcap">LCAP</option>
                                                    <option value="et">ET</option>
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ¿Cuenta con correo institucional?
                                                </label>
                                                <div className="flex flex-col mt-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                            value="si"
                                                            checked={tieneCorreoInstitucional === 'si'}
                                                            onChange={(e) => {
                                                                setTieneCorreoInstitucional(e.target.value);
                                                                setMostrarCorreoInstitucional(true); // Mostrar campo si selecciona "Sí"
                                                            }}
                                                        />
                                                        <span className="ml-2">Sí</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                            value="no"
                                                            checked={tieneCorreoInstitucional === 'no'}
                                                            onChange={(e) => {
                                                                setTieneCorreoInstitucional(e.target.value);
                                                                setMostrarCorreoInstitucional(false); // Ocultar campo si selecciona "No"
                                                            }}
                                                        />
                                                        <span className="ml-2">No</span>
                                                    </label>
                                                </div>
                                            </div>

                                            {tieneCorreoInstitucional === 'si' && ( // Mostrar campo solo si selecciona "Sí"
                                                <div className="mb-4">
                                                    <label htmlFor="correoInstitucional" className="block text-sm font-medium text-gray-700">
                                                        Indique su Correo Institucional
                                                    </label>
                                                    <input
                                                        type="email"
                                                        id="correoInstitucional"
                                                        value={correoInstitucional}
                                                        onChange={(e) => setCorreoInstitucional(e.target.value)}
                                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                        required
                                                    />
                                                </div>
                                            )}

                                            <div className="mb-4">
                                                <label htmlFor="anoEgreso" className="block text-sm font-medium text-gray-700">
                                                    Año de Egreso
                                                </label>
                                                <input
                                                    type="text"
                                                    id="anoEgreso"
                                                    value={anoEgreso}
                                                    onChange={(e) => setAnoEgreso(e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}

                                    {rol === 'no-alumno' && (
                                        <>
                                            <div className="mb-4">
                                                <label htmlFor="institucionProviene" className="block text-sm font-medium text-gray-700">
                                                    ¿De qué institución proviene?
                                                </label>
                                                <input
                                                    type="text"
                                                    id="institucionProviene"
                                                    value={institucionProviene}
                                                    onChange={(e) => setInstitucionProviene(e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                    required
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ¿Dónde se enteró del centro de idiomas?
                                                </label>
                                                <div className="flex flex-col mt-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                            value="pagina_web"
                                                            checked={fuenteInformacion === 'pagina_web'}
                                                            onChange={(e) => setFuenteInformacion(e.target.value)}
                                                        />
                                                        <span className="ml-2">Página web ISTTA</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                            value="facebook"
                                                            checked={fuenteInformacion === 'facebook'}
                                                            onChange={(e) => setFuenteInformacion(e.target.value)}
                                                        />
                                                        <span className="ml-2">Facebook</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                            value="anuncios"
                                                            checked={fuenteInformacion === 'anuncios'}
                                                            onChange={(e) => setFuenteInformacion(e.target.value)}
                                                        />
                                                        <span className="ml-2">Anuncios</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                            value="folletos"
                                                            checked={fuenteInformacion === 'folletos'}
                                                            onChange={(e) => setFuenteInformacion(e.target.value)}
                                                        />
                                                        <span className="ml-2">Folletos</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                            value="amigos"
                                                            checked={fuenteInformacion === 'amigos'}
                                                            onChange={(e) => setFuenteInformacion(e.target.value)}
                                                        />
                                                        <span className="ml-2">Amigos</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                            value="familiar"
                                                            checked={fuenteInformacion === 'familiar'}
                                                            onChange={(e) => setFuenteInformacion(e.target.value)}
                                                        />
                                                        <span className="ml-2">Familiar</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            ¿A qué ciclo de inglés desea matricularse?
                                        </label>
                                        <div className="flex flex-col mt-2">
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                    value="basico"
                                                    checked={cicloIngles === 'basico'}
                                                    onChange={(e) => setCicloIngles(e.target.value)}
                                                />
                                                <span className="ml-2">Básico</span>
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                    value="intermedio"
                                                    checked={cicloIngles === 'intermedio'}
                                                    onChange={(e) => setCicloIngles(e.target.value)}
                                                />
                                                <span className="ml-2">Intermedio (Virtual)</span>
                                            </label>
                                            <label className="inline-flex items-center mt-2">
                                                <input
                                                    type="radio"
                                                    className="form-radio text-[#820004] focus:outline-none focus:ring focus:ring-[#820004]"
                                                    value="avanzado"
                                                    checked={cicloIngles === 'avanzado'}
                                                    onChange={(e) => setCicloIngles(e.target.value)}
                                                />
                                                <span className="ml-2">Avanzado (Virtual)</span>
                                            </label>
                                        </div>
                                    </div>
                                    {cicloIngles === 'basico' && (
                                        <>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Modalidad
                                                </label>
                                                <div className="flex flex-col mt-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="presencial"
                                                            checked={modalidadBasico === 'presencial'}
                                                            onChange={(e) => setModalidadBasico(e.target.value)}
                                                        />
                                                        <span className="ml-2">Presencial</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="virtual"
                                                            checked={modalidadBasico === 'virtual'}
                                                            onChange={(e) => setModalidadBasico(e.target.value)}
                                                        />
                                                        <span className="ml-2">Virtual</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Seleccione el horario
                                                </label>
                                                <div className="flex flex-col mt-2">
                                                    {modalidadBasico === 'presencial' && (
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                className="form-radio text-[#820004]"
                                                                value="1:30pm-3:00pm"
                                                                checked={horarioBasico === '1:30pm-3:00pm'}
                                                                onChange={(e) => setHorarioBasico(e.target.value)}
                                                            />
                                                            <span className="ml-2">1:30pm - 3:00pm</span>
                                                        </label>
                                                    )}
                                                    {modalidadBasico === 'virtual' && (
                                                        <>
                                                            <label className="inline-flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio text-[#820004]"
                                                                    value="7:00pm-8:30pm"
                                                                    checked={horarioBasico === '7:00pm-8:30pm'}
                                                                    onChange={(e) => setHorarioBasico(e.target.value)}
                                                                />
                                                                <span className="ml-2">7:00pm - 8:30pm</span>
                                                            </label>
                                                            <label className="inline-flex items-center mt-2">
                                                                <input
                                                                    type="radio"
                                                                    className="form-radio text-[#820004]"
                                                                    value="8:30pm-10:00pm"
                                                                    checked={horarioBasico === '8:30pm-10:00pm'}
                                                                    onChange={(e) => setHorarioBasico(e.target.value)}
                                                                />
                                                                <span className="ml-2">8:30pm - 10:00pm</span>
                                                            </label>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {cicloIngles === 'intermedio' && (
                                        <>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Seleccione el horario
                                                </label>
                                                <div className="flex flex-col mt-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="6:00pm-7:30pm"
                                                            checked={horarioIntermedio === '6:00pm-7:30pm'}
                                                            onChange={(e) => setHorarioIntermedio(e.target.value)}
                                                        />
                                                        <span className="ml-2">6:00pm - 7:30pm</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="7:30pm-8:00pm"
                                                            checked={horarioIntermedio === '7:30pm-8:00pm'}
                                                            onChange={(e) => setHorarioIntermedio(e.target.value)}
                                                        />
                                                        <span className="ml-2">7:30pm - 8:00pm</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ¿Dónde realizó el inglés básico?
                                                </label>
                                                <div className="flex flex-col mt-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="tupac_amaru"
                                                            checked={lugarBasico === 'tupac_amaru'}
                                                            onChange={(e) => setLugarBasico(e.target.value)}
                                                        />
                                                        <span className="ml-2">Centro de idiomas del IEST Túpac Amaru</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="otro"
                                                            checked={lugarBasico === 'otro'}
                                                            onChange={(e) => setLugarBasico(e.target.value)}
                                                        />
                                                        <span className="ml-2">Otro</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="fechaFinBasico" className="block text-sm font-medium text-gray-700">
                                                    ¿Cuándo acabó el inglés básico?
                                                </label>
                                                <input
                                                    type="date"
                                                    id="fechaFinBasico"
                                                    value={fechaFinBasico}
                                                    onChange={(e) => setFechaFinBasico(e.target.value)}
                                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#820004]"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ¿Cuenta con certificado de inglés básico?
                                                </label>
                                                <div className="flex flex-col mt-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="si"
                                                            checked={certificadoBasico === 'si'}
                                                            onChange={(e) => setCertificadoBasico(e.target.value)}
                                                        />
                                                        <span className="ml-2">Sí</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="no"
                                                            checked={certificadoBasico === 'no'}
                                                            onChange={(e) => setCertificadoBasico(e.target.value)}
                                                        />
                                                        <span className="ml-2">No</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {cicloIngles === 'avanzado' && (
                                        <>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Seleccione el horario
                                                </label>
                                                <div className="flex flex-col mt-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="8:00pm-9:30pm"
                                                            checked={horarioAvanzado === '8:00pm-9:30pm'}
                                                            onChange={(e) => setHorarioAvanzado(e.target.value)}
                                                        />
                                                        <span className="ml-2">8:00pm - 9:30pm</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="9:30pm-11:00pm"
                                                            checked={horarioAvanzado === '9:30pm-11:00pm'}
                                                            onChange={(e) => setHorarioAvanzado(e.target.value)}
                                                        />
                                                        <span className="ml-2">9:30pm - 11:00pm</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    ¿Dónde realizó el inglés intermedio?
                                                </label>
                                                <div className="flex flex-col mt-2">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="istta"
                                                            checked={lugarIntermedio === 'istta'}
                                                            onChange={(e) => setLugarIntermedio(e.target.value)}
                                                        />
                                                        <span className="ml-2">Centro de idiomas del IEST Túpac Amaru</span>
                                                    </label>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input
                                                            type="radio"
                                                            className="form-radio text-[#820004]"
                                                            value="otro"
                                                            checked={lugarIntermedio === 'otro'}
                                                            onChange={(e) => setLugarIntermedio(e.target.value)}
                                                        />
                                                        <span className="ml-2">Otro</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Fecha de finalización del inglés intermedio
                                                </label>
                                                <input
                                                    type="date"
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#820004] focus:border-[#820004] sm:text-sm"
                                                    value={fechaFinIntermedio}
                                                    onChange={(e) => setFechaFinIntermedio(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )}





                                    <button type="submit" className="mt-4 w-full bg-[#820004] text-white py-2 rounded-md">
                                        Enviar
                                    </button>
                                </form>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}