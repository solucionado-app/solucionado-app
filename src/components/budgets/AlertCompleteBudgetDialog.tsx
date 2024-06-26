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
// import dynamic from "next/dynamic";
import { type BudgetsTableProps } from "./BudgetsTable";
import { useObservable } from "@legendapp/state/react";

//  const getDynamicMercadoPago = () => dynamic(() => import(`~/components/budgets/MercadoPagoDialog`), {
//      loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
//  })

interface Props {
    budget: BudgetsTableProps
}
import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import MercadoPagoDialog from "./MercadoPagoDialog";
enableReactUse();

export default function AlertDialogDemo({ budget }: Props) {

    const { user } = useUser()
    const [open, setOpen] = useState(true)
    //  const DynamicMercadoPago = getDynamicMercadoPago()
    const preference$ = useObservable({ id: "" })

    const requestData = {
        items: [
            {
                id: budget.id,
                title: `Pagar Presupuesto a ${budget.author.first_name || ""} por ${budget.price} `,
                description: budget.description,
                picture_url: "http://www.myapp.com/myimage.jpg",
                category_id: "car_electronics",
                quantity: 1,
                currency_id: "ARS",
                unit_price: budget.price * 1.11,
            },
        ],
        payer: {
            name: user?.firstName as string,
            surname: user?.lastName as string,
        },
        metadata: {
            user_id: user?.id as string,
            budget_id: budget.id,
            description: budget.description,
            price: budget.price,
        },
        notification_url: `${process.env.NEXT_PUBLIC_MP_DOMAIN as string}/api/webhooks/mercadopago/notificacion`,
        back_urls: {
            success: `${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'localhost:3000'}/servicios`,
            failure: `${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'localhost:3000'}/error`,
            pending: `${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'localhost:3000'}/solicitudes-de-servicio`,
        },
        differential_pricing: {},
    };
    const createPreference = async () => {
        if (preference$.get().id){
            setOpen(true)
            return
        }

        try {
            const response = await fetch(`https://api.mercadopago.com/checkout/preferences`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MP_SECRET_TOKEN as string}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            console.log(response)
            const data = await response.json();
            const { id } = data
            console.log(data);
            if (id && typeof id === 'string') {
                // setpreferenceId(id);
                preference$.set({ id: id })
                console.log(preference$.get().id)

            }
        }
        catch (error) {
            console.log(error)
        }

    };
    preference$.use()
    return (
        <>
            <AlertDialog >
                <AlertDialogTrigger asChild >
                    <Button className="w-full bg-solYellow" variant={"ghost"} > Aceptar</Button>
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
            {preference$.get().id !== "" && <MercadoPagoDialog
                open={open}
                setOpen={setOpen}
                requestData={requestData}
                preferenceId={preference$.get().id} />}

        </>
    )
}
