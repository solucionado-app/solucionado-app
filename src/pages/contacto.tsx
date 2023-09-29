import { type MyPage } from "~/components/types/types";
import ContactForm from "~/components/views/contact/ContactForm";
import { Contact } from "~/components/views/home";

const Contacto: MyPage = () => {

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center ">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <div className="titlepage py-5 text-start text-4xl font-bold  uppercase">
                        <h1 className="text-3xl font-bold  uppercase text-black md:text-3xl lg:text-4xl">
                            <strong className="yellow text-2xl font-semibold text-solYellow">
                                Contactenos
                            </strong>
                            <br />
                            Respondemos a la brevedad
                        </h1>
                    </div>
                    <ContactForm />

                </div>
            </main>
        </>
    );
};
export default Contacto;
Contacto.Layout = "Main";
Contacto.Title = "Contacto";
Contacto.Description = "Contacto";