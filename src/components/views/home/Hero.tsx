import Image from "next/image";
import React from "react";

export const Hero = () => {
  return (
    <section className="banner_main flex w-full justify-center bg-[url('/banner.jpg')] bg-cover bg-no-repeat px-5 text-white ">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <div className="flex items-center">
            <div className="py-10 text-center sm:text-start">
              <h1 className="py-5 text-4xl font-bold md:text-5xl lg:text-6xl ">
                Solucionadores <br className="hidden sm:block" />y soluciones
              </h1>
              <span className="text-3xl text-solYellow ">Para tu hogar</span>
              <p className="py-3 pb-16 text-lg ">Trabajos garantidos</p>
              {/* <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start"><a href="#" className="text-2xl ">Sobre nosotros</a>
          <p className="mt-2 border-t border-solid border-solYellow h-px w-16"></p></div> */}
            </div>
          </div>
          <div className="">
            <div className="">
              <figure>
                <Image src="/ba_ing.png" width={351} height={510} alt="#" />
              </figure>
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
