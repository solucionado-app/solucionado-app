import Head from "next/head";

import { PlomerosForm } from "~/components/formularios/plomeros";


import { type MyPage } from "~/components/types/types";

const Contacto: MyPage = () => {

    return (
        <>
            <Head>
                <title>Contacto</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center ">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                        Plomeros
                    </h1>
                    <PlomerosForm />

                </div>
            </main>
        </>
    );
};
export default Contacto;
Contacto.Layout = "Main";