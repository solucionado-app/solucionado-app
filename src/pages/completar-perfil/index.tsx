import { RegisterSolucionadorUser } from "~/components/auth/RegisterSolucionadorUser";
import RegisterUserDialog from "~/components/auth/RegisterUserDialog";
import { type MyPage } from "~/components/types/types";

import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
const Page: MyPage = () => {

    return (
        <>
            <div className=" flex items-baseline w-full min-h-screen justify-between ">
                <div className="w-full p-2  md:max-w-2xl lg:max-w-4xl  md:mx-auto">
                    <div className="items-center w-full">

                        <div className='flex flex-col justify-center text-orange-brand'>
                            <h2 className="flex justify-center text-5xl md:text-6xl font-bold leading-tighter mb-10">
                                <span className="bg-clip-text text-ellipsis text-center text-transparent bg-gray-700  dark:bg-gray-100 py-2">
                                    {'Registrate'}
                                </span>

                            </h2>
                            <span className=" flex justify-center text-xl md:text-xl font-medium leading-tighter mb-4 bg-clip-text text-center text-transparent bg-gray-700  dark:bg-gray-100 py-2">
                                {'Elige el tipo de cuenta que se adapte a tus necesidades'}
                            </span>
                        </div>
                        <div className="flex flex-col w-full mt-5 justify-center md:flex-row gap-10 items-center">
                            <RegisterUserDialog />
                            <Dialog>
                                <DialogTrigger className="w-full max-w-md h-72 flex flex-col justify-between items-center text-center p-5 bg-gray-100 border-4 border-orange-brand rounded-lg shadow-md dark:bg-gray-800 ">

                                    <h5 className="text-center  cursor-pointer text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Anunciarme y prestar mis servicios</h5>

                                    <div className='flex flex-col gap-3 justify-center items-center'>
                                        <div
                                            className={``}>

                                            <svg xmlns="http://www.w3.org/2000/svg" height="8em" viewBox="0 0 512 512"><path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" /></svg>
                                        </div>

                                        <div className="inline-flex items-center px-3 py-2  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                                            Registrarse gratis
                                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </div>

                                    </div>

                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="mb-2">Completa los datos para registrarte</DialogTitle>

                                    </DialogHeader>
                                    <RegisterSolucionadorUser />
                                </DialogContent>
                            </Dialog>

                        </div>

                    </div >
                </div>
            </div>
        </>
    );
}


export default Page;
Page.Layout = "Auth";