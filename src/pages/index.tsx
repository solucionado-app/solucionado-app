import { api } from "~/utils/api";
import React from "react";
import { type MyPage } from "~/components/types/types";
import MainHead from "~/components/layouts/head/MainHead";
import {
  Hero,
  About,
  Contact,
  Footer,
  Testimonials,
} from "~/components/views/home";


// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const Home: MyPage = () => {
  const apitrcp = api.categories.getAll.useQuery();
  const { data: categories, isLoading } = apitrcp;
  // console.log(apitrcp);
  return (
    <>
      <MainHead title="Solucionado App" description="app solucionado" />
      <main className="flex min-h-screen w-full flex-col items-center  ">
        <Hero categories={categories} isLoading={isLoading} />
        <About categories={categories} isLoading={isLoading} />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Home;
Home.Layout = "Main";

// export function getStaticProps() {

// }
