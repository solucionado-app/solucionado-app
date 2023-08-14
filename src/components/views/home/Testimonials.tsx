import Image from "next/image";
import React from "react";

export const Testimonials = () => {
  return (
    <div id="client" className="flex w-full justify-center bg-white px-5 py-10">
      <div className="w-full max-w-7xl">
        <div className="titlepage text-start text-4xl font-bold uppercase">
          <h2 className="text-2xl font-bold  uppercase text-black md:text-3xl lg:text-4xl">
            <strong className="yellow text-lg font-semibold text-solYellow">
              Testimonios
            </strong>
            <br />
            de Nuestros Clientes
          </h2>
        </div>

        <div
          id="testimo"
          className="carousel slide testimonial_Carousel "
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#testimo"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#testimo" data-slide-to="1"></li>
            <li data-target="#testimo" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-caption ">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <div className="test_box p-3 pt-14 sm:px-[10%] md:px-[25%]">
                      <p className="border-solYbg-solYellow border p-3 text-[#383737] md:p-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis{" "}
                      </p>
                      <div className="flex items-center space-x-2 pt-7 text-[15px] font-semibold uppercase text-solYellow">
                        <Image
                          src="/cos.jpg"
                          width={83}
                          height={79}
                          alt="foto de prefil"
                          className="rounded-full"
                        />
                        <h1>Usuario</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#testimo"
            role="button"
            data-slide="prev"
          >
          </a>
          <a
            className="carousel-control-next"
            href="#testimo"
            role="button"
            data-slide="next"
          >
          </a>
        </div>
      </div>
    </div>
  );
};
