import React from "react";
import { Button } from "~/components/ui/button";

export const Contact = () => {
  return (
    <div className="flex w-full justify-center px-5 py-10">
      <div className="w-full max-w-7xl">
        <div className="">
          <div className="titlepage py-5 text-start text-4xl font-bold  uppercase">
            <h2 className="text-2xl font-bold  uppercase text-black md:text-3xl lg:text-4xl">
              <strong className="yellow text-lg font-semibold text-solYellow">
                Contactenos
              </strong>
              <br />
              Respondemos a la brevedad
            </h2>
          </div>
        </div>
        <div className="row w-full">
          <div className="col-md-8 offset-md-2 items-center justify-center text-center ">
            <form id="post_form" className="contact_form">
              <div className="row">
                <div className="col-md-12 mb-5">
                  <input
                    className="mb-5 h-14 w-full border-b border-[#003471] bg-transparent text-[18px] font-normal placeholder:text-[#363636]"
                    placeholder=" Nombre"
                    type="text"
                    name="Name"
                  ></input>
                </div>
                <div className="col-md-12 mb-5">
                  <input
                    className="mb-5 h-14 w-full border-b border-[#003471] bg-transparent text-[18px] font-normal placeholder:text-[#363636]"
                    placeholder="Email"
                    type="email"
                    name="Email"
                  ></input>
                </div>
                <div className="col-md-12 mb-5">
                  <input
                    className="mb-5 h-14 w-full border-b border-[#003471] bg-transparent text-[18px] font-normal placeholder:text-[#363636]"
                    placeholder="Telefono"
                    type="number"
                    name="Phone Number "
                  ></input>
                </div>
                <div className="col-md-12 mb-5">
                  <textarea
                    className="textarea mb-5 h-36 w-full border-b border-[#003471] bg-transparent text-[18px] font-normal placeholder:text-[#363636]"
                    name="message"
                    placeholder="Mensaje"
                  ></textarea>
                </div>
                <div className="col-md-12 my-7">
                  <Button
                    type="submit"
                    className="bg-sol_lightBlue px-5 py-2 text-center text-lg font-bold text-white hover:bg-sol_lightBlue/80"
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
