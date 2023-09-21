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


import { CheckCircle, ShieldCheck, Home, PiggyBank, WrenchIcon } from 'lucide-react';

const BeneficiosSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto  px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Beneficios de Solucionado</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/4">
            <CheckCircle className="h-10 w-10 text-turquesa mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Rapidez</h3>
            <p className="text-gray-700 text-center">Obtén ayuda en minutos, no en horas o días.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/4">
            <ShieldCheck className="h-10 w-10 text-turquesa mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Confianza</h3>
            <p className="text-gray-700 text-center">Profesionales altamente calificados y verificados.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/4">
            <WrenchIcon className="h-10 w-10 text-turquesa mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Variedad</h3>
            <p className="text-gray-700 text-center">Amplia gama de servicios para todas tus necesidades domésticas.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/4">
            <Home className="h-10 w-10 text-turquesa mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Comodidad</h3>
            <p className="text-gray-700 text-center">Solicita servicios desde tu hogar, en cualquier momento.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/4">
            <PiggyBank className="h-10 w-10  text-turquesa mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center mb-2">Garantía</h3>
            <p className="text-gray-700 text-center">Satisfacción garantizada o te devolvemos tu dinero.</p>
          </div>
        </div>
      </div>
    </section>
  );
};


interface ViewProps {
  categories: CategoriesQueryResponse[] | undefined;
  isLoading: boolean;
}
export const About: React.FC<ViewProps> = ({ categories, isLoading }) => {
  return (
    <>

      <BeneficiosSection />
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
