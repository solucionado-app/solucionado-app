import Image from "next/image";
import React from "react";
import HomeSelect from "~/components/formularios/HomeSelect";
import type { CategoriesQueryResponse } from "~/components/types/common";

import Spinner from "~/components/ui/spinner";

interface ViewProps {
  categories: CategoriesQueryResponse[] | undefined;
  isLoading: boolean;
}

export const Hero: React.FC<ViewProps> = ({ categories, isLoading }) => {
  return (
    <>
      <section className="banner_main flex h-screen w-full flex-col justify-center  bg-[url('/trabajador-oficio-sm.png')] bg-cover bg-no-repeat px-6 pt-28 md:px-12 md:pt-0 lg:bg-[url('/trabajadoroficio.png')]  ">
        {/* <div className="flex w-full items-center justify-center md:w-8/12 md:justify-between"> */}
        <div className=" flex flex-col items-start gap-2 py-5  md:w-8/12 md:gap-5 md:text-start ">
          <h1 className="pb-2 text-start text-4xl font-semibold text-white  shadow-black drop-shadow-xl sm:text-5xl md:py-5  md:text-start md:text-6xl  ">
            Conectamos problemas con soluciones: <span> Tu hogar,</span>{" "}
            <span className="animate-bg-animation bg-gradient-to-r   from-solYellow via-turquesa  to-sol_lightBlue bg-[500%,500%] bg-clip-text bg-no-repeat font-bold text-transparent">
              Solucionado.
            </span>
          </h1>

          {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}
          {categories && (
            <>
              <HomeSelect categories={categories} isLoading={isLoading} />{" "}
            </>
          )}
        </div>
        {/* </div> */}
      </section>

      <div className="container p-6">
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
                  src={"/hombre-tenencia-telefono-taza.jpg"}
                  alt="pide presupuesto"
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
                  src={"/hombre-tenencia-telefono-taza.jpg"}
                  alt="pide presupuesto"
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
      </div>

    </>
  );
};
{
  /* <div className="row d_flex flex items-center justify-around w-full py-11 bg-sol-yellow">
          <div className="hidden md:block text-lg font-semibold">
            <ul className="conta_icon">
              <li><a href="http://wa.me/5492994014514">Contacto: +01 1234567890</a> </li>
            </ul>
          </div>
          <div className="col-md-4 col-sm-4 ">
            <a className="logo" href="#"><Image src="/solucionado-transparente.png" width={248} height={81} alt="#" /></a>
          </div>
          <div className="hidden md:block text-lg font-semibold">
            <ul className="conta_icon ">
              <li><a href="#">info@solucionado.com.ar</a></li>
            </ul>
          </div>
        </div> */
}
