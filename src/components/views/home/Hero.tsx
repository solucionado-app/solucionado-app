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
    <section className="banner_main flex min-h-screen bg-gray-50 w-full justify-center items-center  px-5 py-5 text-white md:py-0 ">
      <div className="w-full max-w-7xl">
        <div className="flex h-full flex-col  w-full items-center md:flex-row md:justify-between ">
          <div className="flex order-2 w-full items-center justify-center md:w-8/12 md:justify-between">
            <div className="flex flex-col gap-2 md:gap-5  py-5 items-start md:text-start ">
              <h1 className="md:py-5 pb-2 text-start  text-4xl font-semibold sm:text-5xl md:text-start text-azul lg:text-7xl xl:text-8xl lg:leading-[0.7] ">
                Conectamos problemas con soluciones: <span>   Tu hogar,</span> <span className="font-bold text-transparent  text-5xl sm:text-5xl lg:text-7xl  xl:text-8xl  bg-gradient-to-r bg-clip-text   from-[#ee7752] via-solYellow to-[#e73c7e] animate-bg-animation bg-no-repeat bg-[500%,500%]">Solucionado.</span>
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
          <div className="  relative w-56 order-1 md:order-2 flex-col md:w-3/12 items-center justify-center  md:justify-end">
            <div className=" absolute bg-turquesa w-full h-full rotate-6 rounded-md"></div>
            <Image quality={100} className="bg-white rounded-md -rotate-6 " src="/trabajador-construccion-telefono-movil-trabajo.jpg" width={400} height={600} alt="solucionador" />



          </div>
        </div>
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
