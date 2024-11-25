import { Head, Link, useForm } from '@inertiajs/react';
import DatosGenerales from './Formulario/DatosGenerales';
import DatosAdicionales from './Formulario/DatosAdicionales';
import DatosPagoCaja from './Formulario/DatosPagoCaja';
import DatosPagoBanco from './Formulario/DatosPagoBanco';

export default function Welcome({ auth, ListaGrupos, ListaCiclos }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        // ... previous form state initialization
    });

    const handleSubmit = (e) => {
        // ... previous submit logic
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen text-black">
                <div className="fixed top-0 left-0 right-0 z-50 shadow-md">
                    <header className="flex items-center bg-[#F3F2C6] w-full px-4 py-2">
                        <div className="flex items-center space-x-4 ml-4">
                            <img
                                src="imagenes/logo.png"
                                alt="Logo de la Institución"
                                className="h-16 w-auto"
                            />
                            <h2 className="text-l font-semibold text-black mt-4">
                                CENTRO DE IDIOMAS
                            </h2>
                        </div>
                        <nav className="flex items-center space-x-6 ml-auto">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-white hover:bg-[#800020] focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Entrada
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-white hover:bg-[#800020] focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </nav>
                    </header>
                </div>

                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white pt-20">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main className="p-8">
                            <div className="welcome-container">
                                <h1 className="text-3xl font-bold text-white mb-6 text-center">Formulario de Inscripción</h1>
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="triptico-container grid grid-cols-3 gap-6">
                                        <div className="triptico-section bg-white/90 p-4 rounded-lg shadow-md">
                                            <DatosGenerales data={data} setData={setData} errors={errors} />
                                        </div>
                                        <div className="triptico-section bg-white/90 p-4 rounded-lg shadow-md">
                                            <DatosAdicionales grupos={ListaGrupos} ciclos={ListaCiclos} data={data} setData={setData} />
                                        </div>
                                        <div className="triptico-section bg-white/90 p-4 rounded-lg shadow-md">
                                            <DatosPagoBanco />
                                            <DatosPagoCaja data={data} setData={setData} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="text-center">
                                        <button 
                                            type="submit" 
                                            className="bg-[#800020] text-white px-6 py-2 rounded-md hover:bg-[#6A4E3C] transition-colors"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </main>
                        <footer className="py-16 text-center text-sm text-white">
                            Copyright
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}