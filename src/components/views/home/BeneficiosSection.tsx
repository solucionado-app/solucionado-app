import { CheckCircle, ShieldCheck, Home, PiggyBank, WrenchIcon } from 'lucide-react';

export default function BeneficiosSection() {
    return (
        <section className=" py-12 w-full">
            <div className="container   px-6">
                <h2 className="text-3xl font-semibold text-center mb-6">Beneficios de Solucionado</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    <div className="bg-white p-6 group max-w-sm rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                        <CheckCircle className="h-10 w-10 text-turquesa mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-turquesa ">Rapidez</h3>
                        <p className="text-gray-700 text-center">Obtén ayuda en minutos, no en horas o días.</p>
                    </div>
                    <div className="bg-white p-6 group max-w-sm rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                        <ShieldCheck className="h-10 w-10 text-turquesa mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-turquesa ">Confianza</h3>
                        <p className="text-gray-700 text-center">Profesionales altamente calificados y verificados.</p>
                    </div>
                    <div className="bg-white p-6 group max-w-sm rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                        <WrenchIcon className="h-10 w-10 text-turquesa mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-turquesa ">Variedad</h3>
                        <p className="text-gray-700 text-center">Amplia gama de servicios para todas tus necesidades domésticas.</p>
                    </div>
                    <div className="bg-white p-6 group max-w-sm rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                        <Home className="h-10 w-10 text-turquesa mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-turquesa ">Comodidad</h3>
                        <p className="text-gray-700 text-center">Solicita servicios desde tu hogar, en cualquier momento.</p>
                    </div>
                    <div className="bg-white p-6 group max-w-sm rounded-lg shadow-lg w-full md:w-1/3 lg:w-1/4 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                        <PiggyBank className="h-10 w-10  text-turquesa mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-turquesa ">Garantía</h3>
                        <p className="text-gray-700 text-center">Satisfacción garantizada o te devolvemos tu dinero.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}