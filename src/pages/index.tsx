import { type MyPage } from "~/components/types/types";
import {
  Testimonials,
} from "~/components/views/home";
import SolucionadorCTA from "~/components/views/home/SolucionadorCTA";
import dynamic from "next/dynamic";

const getComosection = () => dynamic(() => import(`~/components/views/home/ComoSection`), {
  loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})
// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const Home: MyPage = () => {

  const Hero = dynamic(() => import(`~/components/views/home/Hero`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
  })
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
      <Hero />
      <ComoSection />
      <SolucionadorCTA />
      <BeneficiosSection />

      <About />
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

