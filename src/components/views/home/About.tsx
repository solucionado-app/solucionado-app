import Image from "next/image";
import Link from "next/link";
import HomeSelect from "~/components/formularios/HomeSelect";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Spinner from "~/components/ui/spinner";
import { api } from "~/utils/api";


export default function About() {
  const apitrcp = api.categories.getAll.useQuery();
  const { data: categories, isLoading } = apitrcp;
  return (
    <section className="bg-gray-200  w-full ">

      <div className=" container flex flex-col items-center justify-center gap-12 px-6 py-10 ">
        <div className="w-full max-w-7xl space-y-6">
          <div className="titlepage w-full space-y-6 text-left">
            <div>
              <strong className="text-lg font-semibold uppercase text-black">
                Categorias
              </strong>
              <h2 className="text-2xl font-bold text-turquesa sm:text-3xl md:text-4xl">
                TODO LO QUE BUSCAS
              </h2>
            </div>
          </div>
          <div className="flex w-full h-full items-center justify-center">
            {isLoading && <Spinner className="h-12 w-12 text-turquesa" />}
            {categories && (
              <>
                <HomeSelect categories={categories} isLoading={isLoading} />{" "}
              </>
            )}
          </div>

          <div className="flex  flex-wrap justify-center gap-6">
            {isLoading && <Spinner className="h-12 w-12 text-turquesa" />}
            {categories?.map((categorie) => (
              <Link key={categorie.id} className="w-80 lg:w-96  group rounded-lg overflow-hidden text-gray-900 shadow-md col-span-1 transition duration-300 ease-in-out transform bg-white hover:-translate-y-1 hover:shadow-xl cursor-pointer " href={"/solucionar/" + categorie.slug}>
                <Card className="shadow-none bg-inherit border-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {categorie.image_url && (
                      <Image
                        className="rounded-t-lg group-hover:scale-105  transform duration-300 ease-in-out transition "
                        src={categorie.image_url}
                        alt={categorie.description}
                        fill={true}
                      />
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="group-hover:text-turquesa ">{categorie.name}</CardTitle>
                    <CardDescription>{categorie.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
