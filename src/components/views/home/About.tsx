import Image from "next/image";
import Link from "next/link";
import React from "react";
import HomeSelect from "~/components/formularios/HomeSelect";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type Categories =
  | {
      id: number;
      name: string;
      slug: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
      image_url: string | null;
    }[]
  | undefined;

interface ViewProps {
  categories: Categories;
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
            <div className="">
              <div className="about_box space-y-6 pb-2">
                <div className="titlepage ">
                  <strong className="text-lg font-semibold uppercase text-sol_lightBlue">
                    Quienes somos
                  </strong>
                  <h2 className="text-2xl font-bold  uppercase text-black md:text-3xl lg:text-4xl">
                    {" "}
                    Te ayudamos a que puedas necesitar en tu casa
                  </h2>
                </div>
                <h3 className=" text-xl font-bold text-gray-600 sm:text-2xl">
                  TODO LO QUE NECESITAS, TIENE SOLUCIÓN
                </h3>
                <span className=" text-lg text-black ">
                  Ponemos a disposición una cartera de profesionales <br />
                  garantizando el trabajo.
                </span>
                <p className=" text-left text-lg text-black">
                  Carga tu inquietud, solicita presupuestos y selecciona el que
                  más te guste.
                </p>

                <a
                  href="{{ url('/dashboard') }}"
                  className="hidden text-sm text-gray-700 underline dark:text-gray-500"
                >
                  Panel del Usuario
                </a>

                <div className="flex flex-wrap items-center gap-6">
                  <span className="try uppercase text-sol_lightBlue">
                    Registrate y comienza
                  </span>

                  <a
                    className="read_morea inline-block rounded-xl bg-sol_lightBlue px-5 py-2 text-center text-lg font-bold text-[#fff]"
                    href="{{ route('register') }}"
                  >
                    Registrarme
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                    <br />
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
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
              Tenes alguna especialidad, registrate y comenza a recibir
              solicitudes
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <span className="try uppercase text-solYellow">
                Registrate y comienza
              </span>
              <a
                className="read_morea inline-block rounded-xl bg-solYellow px-5 py-2 text-center text-lg font-bold text-sol_darkBlue"
                href="{{ route('register') }}"
              >
                Registrarme
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                <br />
              </a>
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
            {isLoading && (
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
            )}
            {categories && (
              <>
                <HomeSelect categories={categories} isLoading={isLoading} />{" "}
              </>
            )}
          </div>

          <div className="flex flex-row flex-wrap justify-center gap-4">
            {isLoading && (
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
            )}
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
