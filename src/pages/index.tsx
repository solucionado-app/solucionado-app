import { type MyPage } from "~/components/types/types";
import {
  Testimonials,
} from "~/components/views/home";
import SolucionadorCTA from "~/components/views/home/SolucionadorCTA";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";
import Hero from "~/components/views/home/Hero";

const getComosection = () => dynamic(() => import(`~/components/views/home/ComoSection`), {
  loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})
// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const Home: MyPage = () => {
  const apitrcp = api.categories.getAll.useQuery();
  const { data: categories, isLoading } = apitrcp;
  // // console.log(apitrcp);
  const ComoSection = getComosection()
  const BeneficiosSection = dynamic(() => import(`~/components/views/home/BeneficiosSection`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
  })
  const About = dynamic(() => import(`~/components/views/home/About`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
  })
  const Footer = dynamic(() => import(`~/components/views/home/Footer`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
  })
  return (
    <>
      <Hero categories={categories} isLoading={isLoading} />
      <ComoSection />
      <SolucionadorCTA />
      <BeneficiosSection />
      <About categories={categories} isLoading={isLoading} />
      <Testimonials />
      <Footer />

    </>
  );
};

export default Home;
Home.Layout = "Main";
Home.Title = "Solucionado | Encuentra expertos para resolver problemas en tu hogar";
Home.Description = "Conectamos a quienes necesitan ayuda con expertos que pueden solucionar sus inconvenientes domésticos";

