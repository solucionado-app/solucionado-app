import { api } from "~/utils/api";
import React from "react";
import { type MyPage } from "~/components/types/types";
import {
  Hero,
  About,
  ComoSection,
  Testimonials,
  Footer,
} from "~/components/views/home";
import SolucionadorCTA from "~/components/views/home/SolucionadorCTA";
import BeneficiosSection from "~/components/views/home/BeneficiosSection";


// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const Home: MyPage = () => {
  const apitrcp = api.categories.getAll.useQuery();
  const { data: categories, isLoading } = apitrcp;
  // // console.log(apitrcp);
  return (
    <>
      <Hero categories={categories} isLoading={isLoading} />
      <ComoSection />
      <SolucionadorCTA />
      <BeneficiosSection />

      <About categories={categories} isLoading={isLoading} />
      <Testimonials />
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
