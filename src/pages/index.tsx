import Head from "next/head";
import { api } from "~/utils/api";
import React from "react";
import { type MyPage } from "~/components/types/types";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/cards/CardComponent";
import Image from "next/image";
import MainHead from "~/components/layouts/head/MainHead";
import Link from "next/link";
import { slugify } from "~/utils/utils";

// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const Home: MyPage = () => {
  const apitrcp = api.categories.getAll.useQuery();
  const { data: categories, isLoading } = apitrcp;
  // console.log(apitrcp);
  return (
    <>
      <MainHead title="Solucionado App" description="app solucionado" />

      <main className="flex min-h-screen flex-col items-center  ">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight  sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Solucionado</span> App
          </h1>
          <div className="flex flex-row flex-wrap gap-4">
            {isLoading && <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>}
            {categories?.map((categorie) => (
              <div key={categorie.id}>
                <div className="relative w-[320px] h-52  ">
                  <Link href={"/solucionar/" + slugify(categorie.name)}>

                    <Image className="rounded-t-sm rounded-none" src={`/${slugify(categorie.name)}.jpg`} alt={categorie.description} fill={true} />

                  </Link>
                </div>
                <Card className="w-[320px] border-2 h-36 text-gray-900 bg-slate-50 shadow-md rounded-sm rounded-t-none">
                  <CardHeader>
                    <CardTitle>{categorie.name}</CardTitle>
                    <CardDescription>{categorie.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
Home.Layout = "Main";

// export function getStaticProps() {

// }