import Image from "next/image";
import React from "react";

export const Footer = () => {
  return (
    <footer className="w-full pt-5">
      <div className=" mx-auto bg-[url('/footer_bg.jpg')] bg-cover bg-no-repeat pt-[90px] text-[#fff]">
        <div className="container">
          <div className="col-md-12">
            <a className="logo2" href="#">
              <Image
                src="/solucionado-transparente.png"
                width={248}
                height={81}
                alt="#"
              />
            </a>
          </div>
          <div className="md:flex">
            <div className="text-lg md:w-1/2">
              <h3 className="my-5 text-xl font-semibold">Menu</h3>
              <ul className="link_icon">
                <li className="active mb-3">
                  {" "}
                  <a href="index.html" className="text-[1rem] underline">
                    Inicio
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="text-[1rem] underline">
                    Términos y Condiciones
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="text-[1rem] underline">
                    Ayuda
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="text-[1rem] underline">
                    Convertite en Solucionador
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="text-[1rem] underline">
                    Sobre Nosotros
                  </a>
                </li>
                <li className="mb-3">
                  <a href="#" className="text-[1rem] underline">
                    Reclamos
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 ">
              <h3 className="my-5 text-xl font-semibold">Contactanos</h3>
              <ul className="location_icon flex flex-col space-y-3">
                <li>
                  <a href="#"></a> Rivadavia 206, Neuquen
                </li>
                <li>
                  <a href="#"></a>info@solucionado.com.ar
                </li>
                <li>
                  <a href="#"></a>+54 1234567890
                </li>
                <li>
                  <ul className="social_icon flex space-x-3 py-5 md:py-0 md:pt-3">
                    <li>
                      <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b2554] transition duration-500 hover:bg-solYellow hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="2 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"></path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b2554] transition duration-500 hover:bg-solYellow hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 50 50"
                          fill="currentColor"
                        >
                          <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b2554] transition duration-500 hover:bg-solYellow hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0,0,256,256"
                          fillRule="nonzero"
                        >
                          <g
                            fill="currentColor"
                            fillRule="nonzero"
                            stroke="none"
                            strokeWidth="1"
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit="10"
                            strokeDasharray=""
                            strokeDashoffset="0"
                            fontFamily="none"
                            fontWeight="none"
                            fontSize="none"
                            textAnchor="none"
                          >
                            <g transform="scale(5.33333,5.33333)">
                              <path d="M8.421,14h0.052v0c2.79,0 4.527,-2 4.527,-4.5c-0.052,-2.555 -1.737,-4.5 -4.474,-4.5c-2.737,0 -4.526,1.945 -4.526,4.5c0,2.5 1.736,4.5 4.421,4.5zM4,17h9v26h-9zM44,26.5c0,-5.247 -4.253,-9.5 -9.5,-9.5c-3.053,0 -5.762,1.446 -7.5,3.684v-3.684h-9v26h9v-15v0c0,-2.209 1.791,-4 4,-4c2.209,0 4,1.791 4,4v15h9c0,0 0,-15.045 0,-16.5z"></path>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b2554] transition duration-500 hover:bg-solYellow hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0,0,256,256"
                          width="50px"
                          height="50px"
                          fillRule="nonzero"
                        >
                          <g
                            fill="currentColor"
                            fillRule="nonzero"
                            stroke="none"
                            strokeWidth="1"
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit="10"
                            strokeDasharray=""
                            strokeDashoffset="0"
                            fontFamily="none"
                            fontWeight="none"
                            fontSize="none"
                            textAnchor="none"
                          >
                            <g transform="scale(5.12,5.12)">
                              <path d="M12,3c-4.96,0 -9,4.04 -9,9v26c0,4.96 4.04,9 9,9h26c4.96,0 9,-4.04 9,-9v-26c0,-4.96 -4.04,-9 -9,-9zM38,8h3c0.55,0 1,0.45 1,1v3c0,0.55 -0.45,1 -1,1h-3c-0.55,0 -1,-0.45 -1,-1v-3c0,-0.55 0.45,-1 1,-1zM25,10c5.33,0 10.01969,2.8 12.67969,7h4.32031v20c0,2.76 -2.24,5 -5,5h-24c-2.76,0 -5,-2.24 -5,-5v-20h4.32031c2.66,-4.2 7.34969,-7 12.67969,-7zM25,12c-7.17,0 -13,5.83 -13,13c0,7.17 5.83,13 13,13c7.17,0 13,-5.83 13,-13c0,-7.17 -5.83,-13 -13,-13zM25,16c4.96,0 9,4.04 9,9c0,4.96 -4.04,9 -9,9c-4.96,0 -9,-4.04 -9,-9c0,-4.96 4.04,-9 9,-9z"></path>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-5 text-center text-[18px] text-solYellow">
          © 2023 Derechos Reservados.
        </div>
      </div>
    </footer>
  );
};
