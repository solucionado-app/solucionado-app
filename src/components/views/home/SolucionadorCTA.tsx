import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function SolucionadorCTA() {
    const { user } = useUser();
    return (
        <section className="bg-gray-200 py-16 w-full">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-turquesa font-semibold tracking-wide uppercase">Regístrate como solucionador</h2>
                    <p className="mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 hover:text-turquesa sm:text-4xl">
                        Únete a nuestra comunidad de solucionadores
                    </p>
                    <p className="mt-4 max-w-2xl text-xl font-base text-gray-700 lg:mx-auto">
                        Regístrate como solucionador y comienza a recibir solicitudes de trabajo de personas que necesitan ayuda en su hogar.
                    </p>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white group overflow-hidden shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1  hover:shadow-xl cursor-pointer">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 group-hover:text-turquesa">Crea tu perfil</h3>
                            <div className="mt-2 text-sm text-gray-700">
                                <p>
                                    Crea un perfil que destaque tus habilidades y experiencia para que los clientes puedan encontrarte fácilmente.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white group overflow-hidden shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1  hover:shadow-xl cursor-pointer">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 group-hover:text-turquesa">Recibe solicitudes de trabajo</h3>
                            <div className="mt-2 text-sm text-gray-700">
                                <p>
                                    Recibe solicitudes de trabajo de personas que necesitan ayuda en su hogar y acepta los trabajos que te interesen.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white group overflow-hidden shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1  hover:shadow-xl cursor-pointer">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 group-hover:text-turquesa">Cobra por tu trabajo</h3>
                            <div className="mt-2 text-sm text-gray-700">
                                <p>
                                    Cobra por tu trabajo de manera segura y fácil a través de nuestra plataforma de pagos integrada.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {!user && <div className="mt-10 flex justify-center">
                    <Link href="/registro/solucionador" className="bg-solYellow border border-transparent rounded-md py-3 px-8 font-medium text-gray-900 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Regístrate como solucionador
                    </Link>
                </div>}
                {!!user && user.publicMetadata.role !== 'SOLUCIONADOR' && <div className="mt-10 flex justify-center">
                    <Link href="/registro/solucionador" className="bg-solYellow border border-transparent rounded-md py-3 px-8 font-medium text-gray-900 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        Conviertete en solucionador
                    </Link>
                </div>
                }
            </div>
        </section>  
    )
}
