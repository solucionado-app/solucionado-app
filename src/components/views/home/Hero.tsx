import { ChevronRight, MoveLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import HomeSelect from "~/components/formularios/HomeSelect";
import type { CategoriesQueryResponse } from "~/components/types/common";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import Spinner from "~/components/ui/spinner";

interface ViewProps {
  categories: CategoriesQueryResponse[] | undefined;
  isLoading: boolean;
}

export const Hero: React.FC<ViewProps> = ({ categories, isLoading }) => {
  return (
    <section className="banner_main flex flex-col min-h-screen w-full  justify-between ">

      <div className="flex h-[calc(60vh)] bg-[url('/trabajadoroficio.png')] bg-no-repeat bg-cover    text-white md:py-0 w-full ">
        <div className="w-full max-w-7xl justify-center items-center">
          <div className="flex h-full flex-col  w-full px-6 md:px-12 pt-16 items-center md:flex-row md:justify-between ">
            <div className="flex order-2 w-full items-center justify-center md:w-8/12 md:justify-between">
              <div className="flex flex-col gap-2 md:gap-5  py-5 items-start md:text-start ">
                <h1 className="md:py-5 pb-2 text-start  text-4xl md:text-6xl font-semibold  md:text-start text-white  ">
                  Conectamos problemas con soluciones: <span> Tu hogar,</span> <span className="font-bold text-transparent   bg-gradient-to-r bg-clip-text  from-[#ee7752] via-solYellow to-[#e73c7e] animate-bg-animation bg-no-repeat bg-[500%,500%]">Solucionado.</span>
                </h1>


                <div className="flex w-full  justify-start rounded-xl   ">

                  {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}
                  {categories && (
                    <>
                      <HomeSelect categories={categories} isLoading={isLoading} />{" "}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-1/5 flex flex-col items-center md:flex-row gap-10 p-5 sm:p-10 w-full ">
        <Card className="rounded-2xl  group md:flex-[1_1_40%] lg:flex-[1_1_40%] text-2xl transition hover:bg-black/10 duration-200 hover:-translate-y-4 border border-white/10 bg-white p-1 sm:p-2  shadow-lg">
          <CardHeader >
            <CardTitle className="text-2xl  sm:mb-4 text-[#0ea5e9] font-semibold">Pide Presupuesto</CardTitle>
            <CardDescription className=" text-black text-base opacity-80 sm:text-xl ">
              Este le llegará a cientos de trabajadores de manera automática..
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="rounded-2xl  group md:flex-[1_1_40%] lg:flex-[1_1_40%] text-2xl transition hover:bg-black/10 duration-200 hover:-translate-y-4 border border-white/10 bg-white p-1 sm:p-2  shadow-lg">
          <CardHeader >
            <CardTitle className="text-2xl  sm:mb-4 text-[#0ea5e9] font-semibold">Recibí múltiples presupuestos</CardTitle>
            <CardDescription className=" text-black text-base opacity-80 sm:text-xl ">
              Todos los trabajadores validados presupuestarán el trabajo y vas a poder elegir al que prefieras.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="rounded-2xl  group md:flex-[1_1_40%] lg:flex-[1_1_40%] text-2xl transition hover:bg-black/10 duration-200 hover:-translate-y-4 border border-white/10 bg-white p-1 sm:p-2  shadow-lg">
          <CardHeader >
            <CardTitle className="text-2xl  sm:mb-4 text-[#0ea5e9] font-semibold">Contratá y calificá</CardTitle>
            <CardDescription className=" text-black text-base opacity-80 sm:text-xl ">
              Una vez que estés seguro, contratá a quien prefieras y luego de realizado el trabajo calificalo.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
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
