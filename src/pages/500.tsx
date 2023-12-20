import Link from "next/link";

import { type MyPage } from "~/components/types/types";

// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
const ServerError: MyPage = () => {

    return (
        <>
            <div className="grid place-content-center h-screen">
                <div className="container mx-auto max-w-md text-center">
                    <h1 className="text-4xl font-bold text-zinc-700 my-4">
                        500 - Server error
                    </h1>
                    <p className="text-zinc-400">
                        Lo sentimos hubo un error en el servidor. Por favor, revisa
                        la URL o utiliza el botón de abajo para volver a la página de
                        inicio.
                    </p>
                    {/*TODO: List similar pages here */}
                    {/*TODO: Create Search bar component here */}
                    <div className="border border-b-gray-50 my-4"></div>
                    {/* Add navigation to important pages */}
                    <div>
                        <Link
                            className="hover:underline hover:text-indigo-400 text-indigo-500"
                            href="/"
                        >
                            Ir a la Home Page
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServerError;
ServerError.Layout = "Main";