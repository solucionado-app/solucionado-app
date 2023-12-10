import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { AlertDialogHeader } from '../ui/alert-dialog'
import { RegisterSolucionadorUser } from './RegisterSolucionadorUser'
import { Card } from '../ui/card'
import Link from 'next/link'

export default function DialogRegisterSolucionador() {
    return (
        <Link href='/registro/solucionador'>
            <Card className=" bg-white group overflow-hidden shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1  hover:shadow-xl cursor-pointer w-full max-w-md h-full  flex flex-col justify-between gap-4 items-center text-center p-5  ">


                <h5 className="text-center  cursor-pointer text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Quiero ser un Solucionador</h5>

                <div className='flex flex-col gap-3 justify-center items-center'>
                    <div
                        className={``}>

                        <svg xmlns="http://www.w3.org/2000/svg" height="4rem" viewBox="0 0 512 512"><path d="M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z" /></svg>
                    </div>

                    {/* <div className="inline-flex items-center px-3 py-2  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                    Registrarse gratis
                    <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </div> */}

                </div>

            </Card>
        </Link>
    )
}
