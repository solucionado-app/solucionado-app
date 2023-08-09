/*eslint-disable  */
import { initMercadoPago } from '@mercadopago/sdk-react'

import { Payment } from '@mercadopago/sdk-react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Skeleton } from '../ui/skeleton';

interface Props {
    open: boolean
    onClose?: () => void
    preferenceId?: string
    isLoading?: boolean
    setIsloading: () => void
}

export default function MercadoPago({ open, onClose, preferenceId, setIsloading, isLoading }: Props) {


    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY as string);
    const initialization = {
        amount: 10000,
        preferenceId: preferenceId ? preferenceId : undefined,
    };




    //eslint disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = async ({ formData }) => {
        // callback llamado al hacer clic en el botón enviar datos
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
                    reject();
                });
        });
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
        setIsloading();

    };



    return (
        <div className='flex flex-col gap-5'>
            <Dialog open={open} onOpenChange={onClose} >
                <DialogContent>

                    <div>
                        <h1 className="text-5xl font-extrabold tracking-tight">Pagar presupuesto</h1>

                    </div>
                    {isLoading && <Skeleton className='h-96' />}
                    <Payment
                        initialization={initialization}
                        customization={{
                            paymentMethods: {
                                debitCard: "all",
                                mercadoPago: ['wallet_purchase']
                            },

                        }}
                        onSubmit={onSubmit}
                        onReady={onReady}
                        onError={onError}
                    />


                </DialogContent>
            </Dialog>
        </div>
    )
}
