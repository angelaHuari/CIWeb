import { Head, Link, useForm } from '@inertiajs/react';
import DatosGenerales from './Formulario/DatosGenerales';
import DatosAdicionales from './Formulario/DatosAdicionales';
import DatosPagoCaja from './Formulario/DatosPagoCaja';
import DatosPagoBanco from './Formulario/DatosPagoBanco';

export default function Welcome({ auth, ListaGrupos }) {
    const { data, setData, post, put, processing, errors } = useForm({
        nombres: '',
        aPaterno: '',
        aMaterno: '',
        dni: '',
        sexo: '',
        celular: '',
        fechaNacimiento: '',
        tipoAlumno: '',
        programadeEstudios: '',
        semestre: '',
        correoInstitucional: '',
        institucionProveniente: '',
        medioPublicitario: '',
        cicloIngles: '',
        horarioIngles: '',
        realizoInglesBasico:'',
        realizoInglesIntermedio:'',
        tienecertificadoIngles: '',
        medioDePago: '',
        fechaDePago: '',
        montoDePago: '',
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
            programadeEstudios: '',
            semestre: '',
            anioEgreso:'',
            correoInstitucional: '',
            email: '',
            institucionProviene: '',
            medioPublicitario: '',
            cicloIngles: '',
            horarioIngles: '',
            tienecertificadoIngles: '',
            realizoInglesBasico: '',
            realizoInglesIntermedio:'',
            nroComprobante: '',
            fechaPago: '',
            montoPago: '',
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
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:col-start-2 lg:justify-center">
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Entrada
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
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
                                <div className="triptico-container">
                                    <div className="triptico-section">
                                        <DatosGenerales data={data} setData={setData} errors={errors} />
                                    </div>
                                    <div className="triptico-section">
                                        <DatosAdicionales grupos={ListaGrupos} data={data} setData={setData} />
                                    </div>
                                    <div className="triptico-section">
                                        <DatosPagoBanco />
                                        <DatosPagoCaja data={data} setData={setData} />
                                    </div>
                                </div>
                                <br />
                                <button type="submit" onClick={handleSubmit}>Enviar</button>
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
