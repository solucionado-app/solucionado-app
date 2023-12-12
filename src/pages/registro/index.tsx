import DialogRegisterSolucionador from "@/src/components/auth/DialogRegisterSolucionador";
import RegisterUserDialog from "@/src/components/auth/RegisterUserDialog";
import { Button } from "@/src/components/ui/button";
import { SignUp, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { type MyPage } from "~/components/types/types";


const Page: MyPage = () => {
    const { user } = useUser()
    return (
        <>
            <div className=" flex items-baseline w-full min-h-screen justify-between ">
                <div className="w-full p-2  md:max-w-2xl lg:max-w-4xl  md:mx-auto">
                    <div className="flex flex-col justify-center items-center w-full">
                        <Link
                            id='logo'
                            className="  py-4 px-2 md:p-4 z-10"
                            href="/"
                        >
                            <Image

                                src="/solucionado.svg"
                                height={48}
                                width={250}
                                className={`object-contain bg-solBlue p-5 `}
                                alt="logo solucionado"
                            />

                        </Link>
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
                        <div className="flex flex-col md:grid md:grid-cols-2 w-full mt-5 justify-center  gap-10 items-center">
                            <RegisterUserDialog />

                            <DialogRegisterSolucionador />
                        </div>

                    </div >
                </div>
            </div>
        </>
    );
}

{/* <Button onClick={() => window.location.replace(`https://auth.mercadopago.com/authorization?client_id=${process.env.NEXT_PUBLIC_MP_CLIENT_ID ?? ''}&response_type=code&platform_id=mp&state=${user ? user.id : ''}&redirect_uri=${process.env.NEXT_PUBLIC_MP_DOMAIN ?? ''}/api/webhooks/mercadopago/autorization`)}> Mercado pago </Button> */ }
export default Page;
Page.Layout = "Auth";
Page.Title = "Registro";
Page.Description = "registro";