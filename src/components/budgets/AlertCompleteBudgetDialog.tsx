/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import MercadoPagoDialog from "./MercadoPagoDialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import dynamic from "next/dynamic";

const getDynamicMercadoPago = () => dynamic(() => import(`~/components/budgets/MercadoPagoDialog`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})


export default function AlertDialogDemo() {

    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const DynamicMercadoPago = getDynamicMercadoPago()

    const [preferenceId, setpreferenceId] = useState<null | string>();
    const createPreference = async () => {
        const requestData = {
            items: [
                {
                    title: "Dummy Title",
                    description: "Dummy description",
                    picture_url: "http://www.myapp.com/myimage.jpg",
                    category_id: "car_electronics",
                    quantity: 1,
                    currency_id: "ARS",
                    unit_price: 10,
                },
            ],
            payer: {
                name: user?.firstName as string,
                surname: user?.lastName as string,
            },
            payment_methods: {
                excluded_payment_methods: [{}],
                excluded_payment_types: [{}],
            },
            shipments: {
                free_methods: [{}],
                receiver_address: {},
            },
            back_urls: {
                success: "localhost:3000/success",
                failure: "localhost:3000/error",
                pending: "localhost:3000/pending",
            },
            differential_pricing: {},
        };
        try {
            const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MP_SECRET_TOKEN as string}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const data = await response.json();
            const { id } = data
            console.log(data);
            if (id && typeof id === 'string') {
                setpreferenceId(id);
                setIsOpen(true)
            }
        }
        catch (error) {
            console.log(error)
        }

    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild >
                    <Button className="w-full" variant={"ghost"} > Aceptar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Estas completamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta accion no puede ser revertida y se rechazaran los demas presupuestos de la solicitud actual.
                            Ademas no podran llegar nuevos presupuestos a esta solicitud
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                        <AlertDialogAction onClick={() => createPreference()} >Continuar y Pagar</AlertDialogAction>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {preferenceId && <DynamicMercadoPago
                open={isOpen}
                isLoading={isLoading}
                setIsloading={() => setisLoading(false)}
                onClose={() => setIsOpen(false)}
                preferenceId={preferenceId} />}
        </>
    )
}
