/*eslint-disable  */
import { initMercadoPago } from '@mercadopago/sdk-react'

import { Payment } from '@mercadopago/sdk-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Skeleton } from '../ui/skeleton';
import { observable } from '@legendapp/state';
import { Reactive } from "@legendapp/state/react"
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents"
enableReactComponents()
interface Props {
    publickey: string
    open: boolean
    onClose?: () => void
    preferenceId: string
    isLoading?: boolean
    setIsloading: () => void
    amount: number
    token: string
    metadata: any

}

export default function MercadoPago({ publickey, open, onClose, preferenceId, metadata, amount, token, setIsloading, isLoading }: Props) {

    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string, { locale: 'es-AR' });

    const isloading$ = observable(true)


    //eslint disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async (formData: any) => {
        // callback llamado al hacer clic en el botón enviar datos
        console.log(formData);
        formData.formData.access_token = token
        formData.formData.metadata = metadata
        if (formData.formData) {
            return new Promise<void>((resolve, reject) => {
                fetch("/api/mercadopago/payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                })
                    .then((response) => {
                        console.log(response)


                        response.json()
                    })
                    .then((response) => {
                        // recibir el resultado del pago
                        console.log(response);
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
        isloading$.set(false);
        console.log('inicalizado')
    };



    return (
        <Dialog defaultOpen={true}  >
            <DialogContent >

                {/* <div>
                        <h1 className="text-5xl font-extrabold tracking-tight">Pagar presupuesto</h1>

                    </div> */}
                {/* <Reactive.div
                    $style={() => ({ display: isloading$.get() ? 'block' : 'none' })}
                >
                    {<Skeleton className='h-96' />}
                </Reactive.div> */}
                <div className='overflow-y-auto max-h-[650px]'>
                    <Payment
                        initialization={{
                            amount: amount,
                            preferenceId: preferenceId,
                            marketplace: true,
                        }}
                        customization={{
                            paymentMethods: {
                                debitCard: 'all',
                                creditCard: 'all',
                                mercadoPago: 'all',
                            },

                        }}
                        onSubmit={onSubmit}
                        onReady={onReady}
                        onError={onError}
                    />
                </div>



            </DialogContent>
        </Dialog >

    )
}
