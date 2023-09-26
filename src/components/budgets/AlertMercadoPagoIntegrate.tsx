import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useUser } from '@clerk/nextjs'

interface Props {
    open: boolean,
}

export default function AlertMercadoPagoIntegrate({ open }: Props) {
    const { user, isSignedIn } = useUser()
    if (isSignedIn && !user) return null


    return (
        <AlertDialog open={open} >

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Completa tu perfil!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Debes vincular tu cuenta de mercado pago a nuestra aplicación para poder recibir pagos de tus clientes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                    <AlertDialogAction onClick={() => window.location.replace(`https://auth.mercadopago.com/authorization?client_id=${process.env.NEXT_PUBLIC_MP_CLIENT_ID ?? ''}&response_type=code&platform_id=mp&state=${user ? user.id : ''}&redirect_uri=${process.env.NEXT_PUBLIC_MP_DOMAIN ?? ''}/api/webhooks/mercadopago/autorization`)
                    } >Continuar y vincular</AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
