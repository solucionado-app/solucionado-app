import Image from 'next/image'
import React from 'react'

export default function ComoSection() {
    return (
        <section className="container p-6">
            <h2 className="text-4xl font-semibold text-black text-center mb-6">¿Como Funciona?</h2>

            <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch  gap-6">
                <div className="flex-1 max-w-sm p-0 w-full md:py-4  cursor-pointer ">
                    <div className="md:block grid grid-cols-3 items-center group gap-4">
                        <div className="relative col-span-1 aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                            <Image

                                className="rounded-2xl  object-cover
        transition-all duration-200 ease-in-out group-hover:scale-105"
                                src={"/hombre-tenencia-telefono-taza.jpg"}
                                alt="pide presupuesto"
                                layout="fill"
                            />
                        </div>
                        <div className="pt-2 col-span-2 flex flex-col gap-1">
                            <span className="text-lg leading-5  md:text-xl group-hover:text-turquesa  font-semibold  ">
                                Pide Presupuesto
                            </span>
                            <p className="text-sm md:text-base lg:flex-[1_1_20%]
                    text-black opacity-80 sm:text-md ">
                                Este le llegará a cientos de trabajadores de manera automática..
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 max-w-sm p-0 w-full md:py-4  cursor-pointer ">
                    <div className="md:block grid grid-cols-3 items-center group gap-4">

                        <div className="relative aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                            <Image

                                className="rounded-2xl object-cover
        transition-all duration-200 ease-in-out group-hover:scale-105"
                                src={"/mujer-smartphone.png"}
                                alt="Elegir presupuestos"
                                layout="fill"
                            />
                        </div>
                        <div className="pt-2 col-span-2 flex flex-col gap-1">
                            <span className="text-lg leading-5  md:text-xl group-hover:text-turquesa  font-semibold  ">
                                Recibí múltiples presupuestos
                            </span>
                            <p className="text-sm md:text-base lg:flex-[1_1_20%]
                    text-black opacity-80 sm:text-md ">
                                Todos los trabajadores validados presupuestarán el trabajo y vas a
                                poder elegir al que prefieras.
                            </p>
                        </div>
                    </div>

                </div>

                <div className="flex-1 max-w-sm p-0 w-full md:py-4  cursor-pointer ">
                    <div className="md:block grid grid-cols-3 items-center group gap-4">
                        <div className="relative aspect-[3/4] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                            <Image

                                className="rounded-2xl object-cover
        transition-all duration-200 ease-in-out group-hover:scale-105"
                                src={"/retroalimentacion-comentario-encuesta-soporte-respuesta-barra-palabra.jpg"}
                                alt="retroalimentacion-comentario-encuesta-soporte-respuesta-barra-palabra"
                                layout="fill"
                            />
                        </div>
                        <div className="pt-2 col-span-2  flex flex-col gap-1">
                            <span className="text-lg leading-5  md:text-xl group-hover:text-turquesa  font-semibold  ">
                                Contratá y calificá
                            </span>
                            <p className="text-sm md:text-base lg:flex-[1_1_20%]
                    text-black opacity-80 sm:text-md ">
                                Una vez que estés seguro, contratá a quien prefieras y luego de
                                realizado el trabajo calificalo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
