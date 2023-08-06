import React from "react";
import HomeSelect from "~/components/formularios/HomeSelect";
import type { CategoriesQueryResponse } from "~/components/types/common";

interface ViewProps {
  categories: CategoriesQueryResponse[] | undefined;
  isLoading: boolean;
}

export const Hero: React.FC<ViewProps> = ({ categories, isLoading }) => {
  return (
    <section className="banner_main flex min-h-[45vh] w-full justify-center bg-[url('/banner.jpg')] bg-cover bg-no-repeat px-5 py-10 text-white md:py-0 ">
      <div className="w-full max-w-7xl">
        <div className="flex h-full flex-col  items-center md:flex-row md:justify-between 2xl:justify-center">
          <div className="flex w-full items-center justify-center md:w-1/2 md:justify-between">
            <div className="flex flex-col items-center py-10 md:items-start md:text-start">
              <h1 className="py-5 text-center text-4xl font-bold sm:text-5xl md:text-start lg:text-6xl">
                Solucionadores <br className="hidden  sm:block" />y soluciones
              </h1>
              <span className="text-3xl text-solYellow">Para tu hogar</span>
              <p className="py-3 pb-16  text-lg">Trabajos garantidos</p>
              {/* <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start"><a href="#" className="text-2xl ">Sobre nosotros</a>
          <p className="mt-2 border-t border-solid border-solYellow h-px w-16"></p></div> */}
            </div>
          </div>
          <div className="flex w-full  items-center justify-center md:w-1/2 md:justify-end">
            <div className="flex w-full max-w-lg justify-center rounded-xl bg-white px-4 py-6">
              {isLoading && (
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
              )}
              {categories && (
                <>
                  <HomeSelect categories={categories} isLoading={isLoading} />{" "}
                </>
              )}
            </div>
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
