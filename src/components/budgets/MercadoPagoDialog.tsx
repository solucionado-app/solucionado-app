/*eslint-disable  */
import { initMercadoPago } from '@mercadopago/sdk-react'

import { Payment } from '@mercadopago/sdk-react';
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog';
import { Skeleton } from '../ui/skeleton';

import { enableReactComponents } from "@legendapp/state/config/enableReactComponents"
import { Reactive, Show, useObservable } from '@legendapp/state/react';
import { Dispatch, SetStateAction } from 'react';
import { confettiAni } from '../auth/FormSolucionador/ConfettiStep';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
enableReactComponents()
interface Props {
    preferenceId: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    requestData: any

}

export default function MercadoPagoDialog({ preferenceId, requestData ,open,setOpen }: Props) {

    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string, { locale: 'es-AR' });
    const state$ = useObservable({ isLoading: true, showSuccess: false})
    const isLoading = state$.isLoading.use()
    const showSuccess = state$.showSuccess.use()
    const router = useRouter()
    //eslint disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (formData: any) => {
        // callback llamado al hacer clic en el botón enviar datos
        console.log(formData);
        formData.formData.metadata = requestData.metadata
        formData.statement_descriptor = 'Solucionado SA'
        formData.notification_url = requestData.notification_url
        formData.description = requestData.items[0].description
        if (formData.formData) {
            return new Promise<void>((resolve, reject) => {

                fetch("/api/mercadopago/payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData.formData),
                })
                    .then((response) => {
                        console.log(response)
                        if (!response.ok) {
                            throw new Error("Error al crear el pago");
                        }

                        return response.json()
                    })
                    .then((response) => {
                        // recibir el resultado del pago
                        console.log(response);
                        state$.showSuccess.set(true)
                        setTimeout(async () => {
                            await confettiAni()
                        }, 500);
                        resolve();
                    })
                    .catch((error) => {
                        // manejar la respuesta de error al intentar crear el pago
                        console.log(error);
                        reject();
                    });
            });
        }
    };
    const onError = async (error: any) => {
        // callback llamado para todos los casos de error de Brick
        console.log(error);


    };
    const onReady = () => {
        /*
          Callback llamado cuando el Brick está listo.
          Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
        state$.isLoading.set(false)

        console.log('inicalizado')
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal>
            <DialogContent >

                {/* <div>
                        <h1 className="text-5xl font-extrabold tracking-tight">Pagar presupuesto</h1>

                    </div> */}
                <Show if={!showSuccess} else={
                    <div className="flex items-center gap-2 justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-3xl font-extrabold tracking-tight text-center">¡Pago exitoso!</h1>
                            <p className="text-lg text-center">Gracias por confiar en nosotros</p>
                            <p className="text-lg text-center">Se ha notificado al solucionador y pronto estara llendo al domicilio que nos proporcionaste
                            </p>
                            <Button onClick={() => router.push('/servicios')}>
                                   Ir a mi panel de servicios
                            </Button>

                        </div>
                    </div>
                }>
                    <div className={`  ${isLoading ? '' : 'overflow-y-auto'} max-h-[650px]`}>
                        <Reactive.div $className={`min-h-64  ${isLoading ? ' mx-6 animate-pulse' : ' animate-none '} `} >

                            <Show if={isLoading}>
                                <div role="status" className="w-full flex flex-col gap-4 animate-pulse   ">
                                    <div className="boder max-h-72 divide-y-2 divide-stone-300/20  border-stone-300 rounded shadow ">
                                        <div className="flex items-center p-4 space-x-4  w-full  ">
                                            <Skeleton className="w-6 bg-stone-300 h-6 rounded-full"></Skeleton>
                                            <Skeleton className="w-10 bg-stone-200 grow-1 h-10 rounded-full"></Skeleton>
                                            <div className='grow'>
                                                <div className="h-3 bg-stone-200 rounded-sm w-full mb-2.5"></div>
                                                <div className="w-1/2 h-3 bg-stone-200 rounded-sm "></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 space-x-4  w-full ">
                                            <Skeleton className="w-6 bg-stone-300 h-6 rounded-full"></Skeleton>
                                            <Skeleton className="w-10 bg-stone-200 grow-1 h-10 rounded-full"></Skeleton>

                                            <div className='grow'>
                                                <div className="h-3 bg-stone-200 rounded-sm w-full mb-2.5"></div>
                                                <div className="w-1/2 h-3 bg-stone-200 rounded-sm "></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 space-x-4  w-full ">
                                            <Skeleton className="w-6 bg-stone-300 h-6 rounded-full"></Skeleton>
                                            <Skeleton className="w-10 bg-stone-200 grow-1 h-10 rounded-full"></Skeleton>
                                            <div className='grow'>
                                                <div className="h-3 bg-stone-200 rounded-sm w-full mb-2.5"></div>
                                                <div className="w-1/2 h-3 bg-stone-200 rounded-sm "></div>
                                            </div>
                                        </div>
                                    </div>
                                    <Skeleton className="w-full h-10 bg-stone-200 rounded"></Skeleton>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </Show>

                            {<div className={` ${!isLoading ? ' animate-in  fade-in-0 h-auto ' : 'animate-out fade-out-0 h-0 opacity-0 '} duration-300 `}>
                                <Payment
                                    initialization={{
                                        amount: requestData.items[0].unit_price < 30 ? 30 : requestData.items[0].unit_price,
                                        preferenceId: preferenceId,
                                        items: {
                                            totalItemsAmount: requestData.items[0].unit_price < 30 ? 30 : requestData.items[0].unit_price,
                                            itemsList: [
                                                {
                                                    name: requestData.items[0].title,
                                                    description: requestData.items[0].description,
                                                    units: 1,
                                                    value: requestData.items[0].unit_price < 30 ? 30 : requestData.items[0].unit_price,
                                                }
                                            ]
                                        },

                                    }}
                                    customization={{
                                        visual: {
                                            defaultPaymentOption: {
                                                debitCardForm: true
                                            },
                                        },
                                        paymentMethods: {
                                            debitCard: 'all',
                                            creditCard: 'all',
                                            mercadoPago: [ 'wallet_purchase'],
                                        },
                                        enableReviewStep: true,
                                    }}
                                    onSubmit={onSubmit}
                                    onReady={onReady}
                                    onError={onError}
                                />
                            </div>}



                        </Reactive.div>
                    </div>

                </Show>




            </DialogContent>
        </Dialog >

    )
}
