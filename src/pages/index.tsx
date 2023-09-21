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
  // // console.log(apitrcp);
  return (
    <>
      <Hero categories={categories} isLoading={isLoading} />
      <About categories={categories} isLoading={isLoading} />
      {/* <Testimonials />
      <Contact /> */}
      <Footer />

    </>
  );
};

export default Home;
Home.Layout = "Main";
Home.Title = "Solucionado | Encuentra expertos para resolver problemas en tu hogar";
Home.Description = "Conectamos a quienes necesitan ayuda con expertos que pueden solucionar sus inconvenientes domésticos";

// export function getStaticProps() {

// }
