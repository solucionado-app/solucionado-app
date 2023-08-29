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
import dynamic from "next/dynamic";
import { type BudgetsTableProps } from "./BudgetsTable";
import { useObservable } from "@legendapp/state/react";

const getDynamicMercadoPago = () => dynamic(() => import(`~/components/budgets/MercadoPagoDialog`), {
    loading: () => <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>,
})

interface Props {
    budget: BudgetsTableProps
}


export default function AlertDialogDemo({ budget }: Props) {

    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setisLoading] = useState(true)
    const DynamicMercadoPago = getDynamicMercadoPago()
    const preference$ = useObservable({ id: "" })

    const createPreference = async () => {
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
                    unit_price: budget.price,
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
            marketplace: process.env.NEXT_PUBLIC_MP_CLIENT_ID as string,
            marketplace_fee: budget.price * 0.1,
            notification_url: `${process.env.NEXT_PUBLIC_DOMAIN as string}/api/webhooks/mercadopago/notificacion`,
            back_urls: {
                success: `${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'localhost:3000'}/servicios`,
                failure: `${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'localhost:3000'}/error`,
                pending: `${process.env.NEXT_PUBLIC_MP_DOMAIN ?? 'localhost:3000'}/servicios`,
            },
            differential_pricing: {},
        };
        try {
            const response = await fetch(`https://api.mercadopago.com/checkout/preferences`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${budget.author.mpCode && typeof budget.author.mpCode === 'object' && 'access_token' in budget.author.mpCode ? JSON.stringify(budget.author.mpCode?.access_token) : ""}`,

                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            const data = await response.json();
            const { id } = data
            console.log(data);
            if (id && typeof id === 'string') {
                // setpreferenceId(id);
                preference$.set({ id: id })
                console.log(preference$.get().id)

                setIsOpen(true)
            }
        }
        catch (error) {
            console.log(error)
        }

    };
    preference$.use()
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

            {preference$.get().id !== "" && <DynamicMercadoPago
                open={isOpen}
                publickey={budget.author.mpCode && typeof budget.author.mpCode === 'object' && 'public_key' in budget.author.mpCode ?
                    JSON.stringify(budget.author.mpCode?.public_key) : ''}
                isLoading={isLoading}
                setIsloading={() => setisLoading(false)}
                onClose={() => setIsOpen(false)}
                preferenceId={preference$.get().id} />}
        </>
    )
}
