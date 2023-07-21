import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { RegisterUser } from './RegisterUser'

export default function RegisterUserDialog() {
    return (
        <>
            <Dialog>
                <DialogTrigger className="w-full max-w-md h-72 flex flex-col justify-between items-center text-center p-5 bg-gray-100 border-4 border-orange-brand rounded-lg shadow-md dark:bg-gray-800 ">


                    <h5 className="text-center cursor-pointer  text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Contratar Servicios  </h5>

                    <div className='flex flex-col gap-3 justify-center items-center'>


                        <svg xmlns="http://www.w3.org/2000/svg" height="8rem" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>

                        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">

                            Registrarse gratis
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </div>

                    </div>

                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="mb-2">Completa los datos para registrarte</DialogTitle>

                    </DialogHeader>
                    <RegisterUser />
                </DialogContent>
            </Dialog>
        </>
    )
}
