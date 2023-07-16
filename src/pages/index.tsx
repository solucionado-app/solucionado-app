import Head from "next/head";
import { api } from "~/utils/api";
import React from "react";
import { type MyPage } from "~/components/types/types";

// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const Home: MyPage = () => {
  const { data: categories } = api.categories.getAll.useQuery();
  console.log(categories);
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center text-white bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>

          {categories?.map((categorie) => (
            <div key={categorie.id}>
              <h2>{categorie.name}</h2>
              <p>{categorie.description}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;
Home.Layout = "Main";

// export function getStaticProps() {

// }