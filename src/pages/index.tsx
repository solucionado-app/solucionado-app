import { api } from "~/utils/api";
import React from "react";
import { type MyPage } from "~/components/types/types";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/cards/CardComponent";
import Image from "next/image";
import MainHead from "~/components/layouts/head/MainHead";
import Link from "next/link";
import HomeSelect from "~/components/formularios/HomeSelect";

// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const Home: MyPage = () => {
  const apitrcp = api.categories.getAll.useQuery();
  const { data: categories, isLoading } = apitrcp;
  // console.log(apitrcp);
  return (
    <>
      <MainHead title="Solucionado App" description="app solucionado" />

      <main className="flex min-h-screen flex-col items-center w-full  ">



        <div className="row d_flex flex items-center justify-around w-full py-11 bg-sol-yellow">
          <div className="hidden md:block text-[17px] font-semibold">
            <ul className="conta_icon">
              <li><a href="http://wa.me/5492994014514">Contacto: +01 1234567890</a> </li>
            </ul>
          </div>
          <div className="col-md-4 col-sm-4 ">
            <a className="logo" href="#"><Image src="/solucionado-transparente.png" width={248} height={81} alt="#" /></a>
          </div>
          <div className="hidden md:block text-[17px] font-semibold">
            <ul className="conta_icon ">
              <li><a href="#">info@solucionado.com.ar</a></li>
            </ul>
          </div>
        </div>

        <section className="banner_main text-white w-full bg-[url('/banner.jpg')] bg-no-repeat bg-cover ">
          <div className="container">
            <div className="row sm:flex justify-between">
              <div className="flex items-center">
                <div className="py-10">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold py-5">Solucionadores <br />y soluciones</h1>
                  <span className="text-solYellow text-3xl">Para tu hogar</span>
                  <p className="pb-16 text-lg py-3">Trabajos garantidos</p>
                  <a href="#" className="text-2xl">Sobre nosotros</a>
                  <p className="inline-flex border-t border-solid border-solYellow h-[1px] w-16 ml-3"></p>
                </div>
              </div>
              <div className="">
                <div className="">
                  <figure><Image src="/ba_ing.png" width={351} height={510} alt="#" /></figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="about" className="w-full py-10 px-5 max-w-7xl">
          <div className="container-fluid">
            <div className="grid md:flex">
              <div className="">
                <div className="about_box pb-2">
                  <div className="titlepage">
                    <h2 className="text-solBlue md:text-4xl font-bold uppercase"><strong className="text-solYellow font-semibold text-[17px]">Quienes somos</strong><br /> Te ayudamos a que puedas necesitar en tu casa
                    </h2>
                  </div>
                  <h3 className="text-[#0b0b0b] text-2xl font-bold py-6">TODO LO QUE NECESITAS, TIENE SOLUCION</h3>
                  <span className="text-solYellow text-[17px] pt-6 uppercase ">Ponemos a disposicion una cartera de profecionales <br /> GARANTIZANDO EL TRABAJO</span>
                  <p className="text-[#0d0d0d] text-[17px] pt-6 pb-7 text-left">Carga tu inquitud, solicita presupuestos y selecciona el que mas te guste</p>


                  <a href="{{ url('/dashboard') }}" className="hidden text-sm text-gray-700 dark:text-gray-500 underline">Panel del
                    Usuario</a>

                  <span className="try text-solYellow uppercase">Registrate y comenza</span>

                  <a className="read_morea mt-[7px] py-2 ml-10 bg-solYellow px-5 inline-block text-center text-lg text-[#fff]" href="{{ route('register') }}">Registrarme<i className="fa fa-angle-right"
                    aria-hidden="true"></i><br /></a>
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

        <div className="solucion flex justify-center bg-solBlue w-full px-5 py-2">
          <div className="max-w-7xl w-full">
            <div className="titlepage ">
              <h2 className="text-[#f0f8ff] uppercase md:text-4xl font-bold"><strong className="text-solYellow text-[17px] font-semibold">Profesionales</strong><br />SOLUCIONADORES</h2>
              <p className="text-[#f0f8ff] sm:text-xl pt-7">Tenes alguna especialidad, registrate y comenza a recibir solicitudes</p>
              <div className="flex gap-7 py-7">
                <p className="text-[#f0f8ff] text-xl">Registrate y comenza</p>
                <Link className="read_morea py-2  bg-solYellow  px-5 lg:px-5 text-center lg:text-lg text-[#fff]" href="/registro">Registrarme<i className="fa fa-angle-right"
                  aria-hidden="true"></i></Link>
              </div>
            </div>
          </div>
        </div>


        <div className="container flex flex-col items-center justify-center gap-12 p-5 ">
          <div className="titlepage text-left w-full">
            <h2 className="text-4xl text-solBlue font-bold"><strong className="text-solYellow text-[17px] font-semibold uppercase">Categorias</strong><br /> TODO LO QUE BUSCAS</h2>
          </div>
          {isLoading && <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>}
          {
            categories && <>Hola <HomeSelect categories={categories} isLoading={isLoading} /> </>
          }




          <div className="flex flex-row justify-center flex-wrap gap-4">
            {isLoading && <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>}
            {categories?.map((categorie) => (
              <Link key={categorie.id} href={"/solucionar/" + categorie.slug}>

                <div className="relative w-[319px] h-52  ">

                  {categorie.image_url && <Image className="rounded-t-sm rounded-none" src={categorie.image_url} alt={categorie.description} fill={true} />}

                </div>

                <Card className="w-[320px] border-2 h-36 text-gray-900 bg-slate-50 shadow-md rounded-sm rounded-t-none">
                  <CardHeader>
                    <CardTitle>{categorie.name}</CardTitle>
                    <CardDescription>{categorie.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>


        <div id="client" className="sm:p-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="titlepage uppercase text-4xl font-bold text-center">
                  <h2><strong className="yellow text-solYellow text-[17px] font-semibold">Testimonios</strong><br />de Nuestros Clientes</h2>
                </div>
              </div>
            </div>
          </div>
          <div id="testimo" className="carousel slide testimonial_Carousel " data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#testimo" data-slide-to="0" className="active"></li>
              <li data-target="#testimo" data-slide-to="1"></li>
              <li data-target="#testimo" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="carousel-caption ">
                  <div className="row">
                    <div className="col-md-6 offset-md-3">
                      <div className="test_box sm:px-[10%] md:px-[25%] pt-14 p-3">
                        <p className="text-[#383737] border border-solYbg-solYellow p-3 md:p-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis </p>
                        <div className="flex items-center space-x-2 pt-7 text-solYellow text-[15px] font-semibold uppercase">
                          <Image src="/cos.jpg" width={83} height={79} alt="foto de prefil" />
                          <h1>Usuario</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#testimo" role="button" data-slide="prev">
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </a>
            <a className="carousel-control-next" href="#testimo" role="button" data-slide="next">
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <div className="container w-full py-5 sm:px-10 lg:px-20">
          <div className="row">
            <div className="col-md-12">
              <div className="titlepage uppercase text-center font-bold text-4xl  py-5">
                <h2><strong className="yellow text-[17px] text-solYellow font-semibold">Contactenos</strong><br />Respondemos a la brevedad</h2>
              </div>
            </div>
          </div>
          <div className="row w-full">
            <div className="col-md-8 items-center justify-center offset-md-2 text-center ">
              <form id="post_form" className="contact_form">
                <div className="row">
                  <div className="col-md-12 mb-5">
                    <input className="border-b border-[#003471] mb-5 text-[18px] font-normal w-full bg-transparent placeholder:text-[#363636] h-14" placeholder=" Nombre" type="text" name="Name"></input>
                  </div>
                  <div className="col-md-12 mb-5">
                    <input className="border-b border-[#003471] mb-5 text-[18px] font-normal w-full bg-transparent placeholder:text-[#363636] h-14" placeholder="Email" type="email" name="Email"></input>
                  </div>
                  <div className="col-md-12 mb-5">
                    <input className="border-b border-[#003471] mb-5 text-[18px] font-normal w-full bg-transparent placeholder:text-[#363636] h-14" placeholder="Telefono" type="number" name="Phone Number "></input>
                  </div>
                  <div className="col-md-12 mb-5">
                    <textarea className="textarea border-b border-[#003471] mb-5 text-[18px] font-normal w-full bg-transparent placeholder:text-[#363636] h-36" defaultValue={"mensaje"} placeholder="Message"></textarea>
                  </div>
                  <div className="col-md-12 my-7">
                    <button className=" text-xl bg-solYellow text-[#fffefe] py-5 rounded-[40px] w-[217px] font-semibold uppercase">Enviar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <footer className="w-full pt-5">
          <div className=" bg-[url('/footer_bg.jpg')] bg-no-repeat bg-cover mx-auto pt-[90px] text-[#fff]">
            <div className="container">
              <div className="col-md-12">
                <a className="logo2" href="#"><Image src="/solucionado-transparente.png" width={248} height={81} alt="#" /></a>
              </div>
              <div className="md:flex">
                <div className="text-[17px] md:w-1/2">
                  <h3 className="text-xl my-5 font-semibold">Menu</h3>
                  <ul className="link_icon">
                    <li className="active mb-3"> <a href="index.html"> Inicio</a></li>
                    <li className="mb-3"><a href="#">Terminos y Condiciones</a></li>
                    <li className="mb-3"><a href="#">Ayuda</a></li>
                    <li className="mb-3"><a href="#">Convertite en Solucionador</a></li>
                    <li className="mb-3"><a href="#">Sobre Nosotros</a></li>
                    <li className="mb-3"><a href="#">Reclamos</a></li>
                  </ul>
                </div>
                <div className="md:w-1/2 ">
                  <h3 className="text-xl my-5 font-semibold">Contactanos</h3>
                  <ul className="location_icon flex flex-col space-y-3">
                    <li><a href="#"></a> Rivadavia 206, Neuquen</li>
                    <li><a href="#"></a>info@solucionado.com.ar</li>
                    <li><a href="#"></a>+54 1234567890</li>
                  </ul>
                  <ul className="social_icon flex justify-center space-x-3 py-5 md:py-0 md:pt-3">
                    <li>
                      <a href="#" className="w-10 h-10 text-[#0b2554] bg-white rounded-full flex justify-center items-center hover:bg-solYellow hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="2 0 20 20" fill="currentColor">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="w-10 h-10 text-[#0b2554] bg-white rounded-full flex justify-center items-center hover:bg-solYellow hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 50 50" fill="currentColor">
                          <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z" />
                        </svg></a></li>
                    <li>
                      <a href="#" className="w-10 h-10 text-[#0b2554] bg-white rounded-full flex justify-center items-center hover:bg-solYellow hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0,0,256,256" fillRule="nonzero"><g fill="currentColor" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(5.33333,5.33333)"><path d="M8.421,14h0.052v0c2.79,0 4.527,-2 4.527,-4.5c-0.052,-2.555 -1.737,-4.5 -4.474,-4.5c-2.737,0 -4.526,1.945 -4.526,4.5c0,2.5 1.736,4.5 4.421,4.5zM4,17h9v26h-9zM44,26.5c0,-5.247 -4.253,-9.5 -9.5,-9.5c-3.053,0 -5.762,1.446 -7.5,3.684v-3.684h-9v26h9v-15v0c0,-2.209 1.791,-4 4,-4c2.209,0 4,1.791 4,4v15h9c0,0 0,-15.045 0,-16.5z"></path></g></g></svg>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="w-10 h-10 text-[#0b2554] bg-white rounded-full flex justify-center items-center hover:bg-solYellow hover:text-white transition duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0,0,256,256" width="50px" height="50px" fillRule="nonzero"><g fill="currentColor" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none"><g transform="scale(5.12,5.12)"><path d="M12,3c-4.96,0 -9,4.04 -9,9v26c0,4.96 4.04,9 9,9h26c4.96,0 9,-4.04 9,-9v-26c0,-4.96 -4.04,-9 -9,-9zM38,8h3c0.55,0 1,0.45 1,1v3c0,0.55 -0.45,1 -1,1h-3c-0.55,0 -1,-0.45 -1,-1v-3c0,-0.55 0.45,-1 1,-1zM25,10c5.33,0 10.01969,2.8 12.67969,7h4.32031v20c0,2.76 -2.24,5 -5,5h-24c-2.76,0 -5,-2.24 -5,-5v-20h4.32031c2.66,-4.2 7.34969,-7 12.67969,-7zM25,12c-7.17,0 -13,5.83 -13,13c0,7.17 5.83,13 13,13c7.17,0 13,-5.83 13,-13c0,-7.17 -5.83,-13 -13,-13zM25,16c4.96,0 9,4.04 9,9c0,4.96 -4.04,9 -9,9c-4.96,0 -9,-4.04 -9,-9c0,-4.96 4.04,-9 9,-9z"></path></g></g></svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="py-5 text-center text-[#082557] text-[18px]">
            © 2023 Derechos Reservados.<a href="#"> Solucionado </a>
          </div>
        </footer>

      </main>
    </>
  );
}

export default Home;
Home.Layout = "Main";

// export function getStaticProps() {

// }