import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { RegisterUser } from './RegisterUser'
import { Card } from '../ui/card'
import Link from 'next/link'

export default function RegisterUserDialog() {
    return (
        <Link href='/registro/usuario'>

            <Card className=" bg-white group overflow-hidden shadow-lg rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1  hover:shadow-xl cursor-pointer w-full max-w-md h-full  flex flex-col justify-between gap-4 items-center text-center p-5  ">


                <h5 className="text-center   text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Quiero contratar Servicios  </h5>

                <div className='flex flex-col gap-3 justify-center items-center'>


                    <svg xmlns="http://www.w3.org/2000/svg" height="4rem" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>



                </div>

            </Card>

        </Link>
    )
}
