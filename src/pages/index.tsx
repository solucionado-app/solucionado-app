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

        <div className="w-full bg-[#032154] py-[9px] d_none text-white" >
            <div className="container">
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                  </div>
                  <div className="col-md-6 col-sm-6 flex justify-end">
                      <ul className="social_icon1 flex">
                        <li className="px-2"> Seguinos </li>
                        <li className="px-2"> <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i> Fa </a></li>
                        <li className="px-2"> <a href="#"><i className="fa fa-twitter"></i> tw </a></li>
                        <li className="px-2"> <a href="#"> <i className="fa fa-linkedin" aria-hidden="true"></i> IN </a></li>
                        <li className="px-2"> <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i> ig </a></li>
                      </ul>
                  </div>
                </div>
            </div>
        </div>

        <div className="row d_flex flex items-center justify-around w-full py-11">
          <div className="col-md-4 col-sm-4 d_none">
              <ul className="conta_icon">
                <li><a href="http://wa.me/5492994014514"><i className="fa fa-phone" aria-hidden="true"></i> Contacto
                      : +01 1234567890</a> </li>
              </ul>
          </div>
          <div className="col-md-4 col-sm-4 ">
              <a className="logo" href="#"><Image src="/solucionado-transparente.png" width={248} height={81} alt="#" /></a>
          </div>
          <div className="col-md-4 col-sm-4 d_none">
              <ul className="conta_icon ">
                <li><a href="#"><i className="fa fa-envelope" aria-hidden="true"></i> info@solucionado.com.ar</a>
                </li>
              </ul>
          </div>
        </div>

        <section className="banner_main text-white w-full bg-[url('/banner.jpg')] bg-no-repeat bg-cover ">
          <div className="container">
            <div className="row sm:flex justify-between">
              <div className="flex items-center col-md-7 col-lg-7">
                <div className="">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold py-5">Solucionadores <br />y soluciones</h1>
                  <span className="text-[#ecbb2c] text-3xl">Para tu hogar</span>
                  <p className="pb-16 text-lg py-3">Trabajos garantidos</p>
                  <a href="#" className="text-2xl">Sobre nosotros</a>
                </div>
              </div>
              <div className="col-md-5 col-lg-5">
                <div className="m-0">
                  <figure><Image src="/ba_ing.png" width={403} height={652} alt="#" /></figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="about" className="about pt-[90px]">
          <div className="container-fluid">
            <div className="grid md:flex">
              <div className="">
                <div className="about_box">
                  <div className="titlepage">
                    <h2 className="text-[#154492] text-4xl font-semibold uppercase"><strong className="text-[#ecbb2c] font-none text-[17px]">Quienes somos</strong><br/> Te ayudamos a que puedas necesitar en tu casa
                    </h2>
                  </div>
                  <h3 className="text-[#0b0b0b] text-2xl font-bold py-6">TODO LO QUE NECESITAS, TIENE SOLUCION</h3>
                  <span className="text-[#ecbb2c] text-[17px] pt-6 uppercase ">Ponemos a disposicion una cartera de profecionales <br/> GARANTIZANDO EL TRABAJO</span>
                  <p className="text-[#0d0d0d] text-[17px] pt-6 pb-7 text-left">Carga tu inquitud, solicita presupuestos y selecciona el que mas te guste</p>

                  
                  <a href="{{ url('/dashboard') }}" className="hidden text-sm text-gray-700 dark:text-gray-500 underline">Panel del
                    Usuario</a>
                  
                  <span className="try text-[#ecbb2c] uppercase">Registrate y comenza</span>

                  <a className="read_morea mt-[7px] py-2 ml-10 bg-[#ecbb2c] px-10 inline-block text-center text-lg text-[#fff]" href="{{ route('register') }}">Registrarme<i className="fa fa-angle-right"
                        aria-hidden="true"></i><br/></a>
                </div>
              </div>
              <div className="">
                <div className="about_img">
                  <figure><Image src="/about_img2.jpg" width={517} height={346} alt="#" /></figure>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight  sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Solucionado</span> App
          </h1>
          <div className="flex flex-row flex-wrap gap-4">
            {isLoading && <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>}
            {categories?.map((categorie) => (
              <div key={categorie.id}>
                <div className="relative w-[320px] h-52  ">
                  <Link href={"/solucionar/" + categorie.slug}>

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