import { Head, Link, useForm } from '@inertiajs/react';
import DatosGenerales from './Formulario/DatosGenerales';
import DatosAdicionales from './Formulario/DatosAdicionales';
import DatosPagoCaja from './Formulario/DatosPagoCaja';
import DatosPagoBanco from './Formulario/DatosPagoBanco';

export default function Welcome({ auth, ListaGrupos ,ListaCiclos}) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        nombres: '',
        aPaterno: '',
        aMaterno: '',
        dni: '',
        sexo: '',
        celular: '',
        fechaNacimiento: '',
        tipoAlumno: '',
        programaEstudios: '',
        semestre: '',
        correoInstitucional: '',
        email: '',
        anioEgreso: '',
        institucionProviene: '',
        medioPublicitario: '',
        cicloIngles: '',
        horarioIngles: '',
        realizoInglesBasico: '',
        realizoInglesIntermedio: '',
        tienecertificadoIngles: '',
        medioPago: '',
        fechaPago: '',
        montoPago: 0,
        nroComprobante: '',
        imgComprobante: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('formulario.store'));

        // Limpiar el formulario
        setData({
            nombres: '',
            aPaterno: '',
            aMaterno: '',
            dni: '',
            sexo: '',
            celular: '',
            fechaNacimiento: '',
            tipoAlumno: '',
            programaEstudios: '',
            semestre: '',
            correoInstitucional: '',
            email: '',
            anioEgreso: '',
            institucionProviene: '',
            medioPublicitario: '',
            cicloIngles: '',
            horarioIngles: '',
            tienecertificadoIngles: '',
            realizoInglesBasico: '',
            realizoInglesIntermedio: '',
            nroComprobante: '',
            fechaPago: '',
            montoPago: 0,
            medioPago: '',
            imgComprobante: null,
        });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-white text-black">

                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex items-center bg-[#F3F2C6] w-full px-4 py-2">
                            {/* Contenedor flex para el logo y el título */}
                            <div className="flex items-center space-x-4 ml-4">
                                {/* Logo de la institución */}
                                <img
                                    src="imagenes/logo.png"
                                    alt="Logo de la Institución"
                                    className="h-16 w-auto" // Ajusta el tamaño del logo
                                />

                                {/* Título cerca del logo y un poco más abajo */}
                                <h2 className="text-l font-semibold text-black mt-4">
                                    CENTRO DE IDIOMAS
                                </h2>
                            </div>

                            {/* Enlaces de navegación */}
                            <nav className="flex items-center space-x-6 ml-auto">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-white hover:bg-[#800020] focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Entrada
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-white hover:bg-[#800020] focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>
                        <main>
                            <div className="welcome-container">
                                <h1>Formulario de Inscripción</h1>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="triptico-container">
                                        <div className="triptico-section">
                                            <DatosGenerales data={data} setData={setData} errors={errors} />
                                        </div>
                                        <div className="triptico-section">
                                            <DatosAdicionales grupos={ListaGrupos} ciclos={ListaCiclos} data={data} setData={setData} />
                                        </div>
                                        <div className="triptico-section">
                                            <DatosPagoBanco />
                                            <DatosPagoCaja data={data} setData={setData} />
                                        </div>
                                    </div>
                                    <br />
                                    <button type="submit" >Enviar</button>
                                </form>
                            </div>
                        </main>
                        <footer className="py-16 text-center text-sm text-black">
                            Copyright
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
