import React from "react";

export const Contact = () => {
  return (
    <div className="container w-full py-5 sm:px-10 lg:px-20">
      <div className="row">
        <div className="col-md-12">
          <div className="titlepage py-5 text-center text-4xl font-bold  uppercase">
            <h2>
              <strong className="yellow text-lg font-semibold text-solYellow">
                Contactenos
              </strong>
              <br />
              Respondemos a la brevedad
            </h2>
          </div>
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
                  defaultValue={"mensaje"}
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="col-md-12 my-7">
                <button className=" w-[217px] rounded-[40px] bg-solYellow py-5 text-xl font-semibold uppercase text-[#fffefe]">
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
