import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeSelect from "~/components/formularios/HomeSelect";
import type { CategoriesQueryResponse } from "~/components/types/common";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Spinner from "~/components/ui/spinner";

interface ViewProps {
  categories: CategoriesQueryResponse[] | undefined;
  isLoading: boolean;
}
export const About: React.FC<ViewProps> = ({ categories, isLoading }) => {
  return (
    <>
      <div
        id="about"
        className="flex w-full justify-center bg-white px-5 py-10"
      >
        <div className="w-full max-w-7xl">
          <div className="grid items-center lg:flex ">
            <div className="w-[60%]">
              <div className="about_box space-y-6 pb-2">
                <div className="titlepage ">
                  <strong className="text-lg font-semibold uppercase text-sol_lightBlue ">
                    ¿Qué podemos ofrecerte?
                  </strong>
                  <div className="rounded-2xl group md:flex-[1_1_40%] lg:flex-[1_1_40%] text-2xl transition hover:bg-white/5 duration-200 hover:-translate-y-4 border border-white/10 bg-black/40 p-6 sm:p-12">
                    <div>
                      <h3 className="text-2xl md:text-4xl sm:mb-4 text-[#0ea5e9] font-semibold" >Expertos confiables</h3>
                      <p className="text-lg opacity-80 sm:text-2xl">Contamos con una red de expertos confiables y calificados para resolver cualquier problema en tu hogar.</p>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold pt-5 uppercase text-black md:text-3xl lg:text-4xl">
                    Te ofrecemos ayuda en todo lo que puedas necesitar en tu hogar
                  </h2>
                </div>
                <h3 className=" text-xl font-bold text-gray-600 sm:text-2xl">
                  TODO LO QUE NECESITAS, TIENE SOLUCIÓN
                </h3>
                <p className=" text-lg text-black">
                  Ponemos a tu disposición una cartera de profesionales <br /> para garantizar el trabajo.
                </p>
                <p className=" text-left text-lg text-black">
                  Carga tu inquietud, solicita presupuestos y selecciona el que
                  más te guste.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <span className="try uppercase text-sol_lightBlue">
                    Registrate y comienza
                  </span>
                  <Link className="read_morea" href="/registro">
                    <Button className="bg-sol_lightBlue px-5 py-2 text-center text-lg font-bold text-white hover:bg-sol_lightBlue/80">
                      Registrarme
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden lg:block w-[40%]">
              <div className="about_img">
                <figure>
                  <Image
                    src="/about_img2.jpg"
                    width={517}
                    height={346}
                    alt="#"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="solucion flex w-full justify-center bg-sol_darkBlue px-5 py-10">
        <div className="w-full max-w-7xl ">
          <div className="titlepage space-y-6">
            <div>
              <strong className="text-lg font-semibold uppercase text-solYellow">
                Profesionales
              </strong>
              <h2 className="text-2xl font-bold uppercase text-white sm:text-3xl md:text-4xl">
                SOLUCIONADORES
              </h2>
            </div>
            <p className="text-white sm:text-xl">
              ¿Tienes alguna especialidad? Regístrate y comienza a recibir solicitudes
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <span className="try uppercase text-solYellow">
                Registrate y comienza
              </span>
              <Link className="" href="/registro">
                <Button className="bg-solYellow px-5 py-2 text-center text-lg font-bold text-black hover:bg-solYellow/80">
                  Registrarme
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container flex flex-col items-center justify-center gap-12 px-5 py-10 ">
        <div className="w-full max-w-7xl space-y-6">
          <div className="titlepage w-full space-y-6 text-left">
            <div>
              <strong className="text-lg font-semibold uppercase text-sol_lightBlue">
                Categorias
              </strong>
              <h2 className="text-2xl font-bold text-solBlue sm:text-3xl md:text-4xl">
                TODO LO QUE BUSCAS
              </h2>
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}
            {categories && (
              <>
                <HomeSelect categories={categories} isLoading={isLoading} />{" "}
              </>
            )}
          </div>

          <div className="flex flex-row flex-wrap justify-center gap-4">
            {isLoading && <Spinner className="h-12 w-12 text-solBlue" />}
            {categories?.map((categorie) => (
              <Link key={categorie.id} href={"/solucionar/" + categorie.slug}>
                <div className="relative h-52 w-[319px]  ">
                  {categorie.image_url && (
                    <Image
                      className="rounded-none rounded-t-sm"
                      src={categorie.image_url}
                      alt={categorie.description}
                      fill={true}
                    />
                  )}
                </div>

                <Card className="h-36 w-[320px] rounded-sm rounded-t-none border-2 bg-slate-50 text-gray-900 shadow-md">
                  <CardHeader>
                    <CardTitle>{categorie.name}</CardTitle>
                    <CardDescription>{categorie.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
