import { type Dispatch, type SetStateAction } from 'react'
import { useUser } from '@clerk/nextjs'
import { FormStepsProvider } from '../auth/FormSolucionador/ContextSolucionadorForm'
import MainForm from '../auth/FormSolucionador/MainForm'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AlertMercadoPagoIntegrate({ open, setOpen }: Props) {
    const { user, isSignedIn } = useUser()
    if (isSignedIn && !user) return null
    return (

        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Completa tu perfil!</DialogTitle>
                    <DialogDescription>
                        Debes completar tus datos para poder enviar presupuestos.
                    </DialogDescription>
                </DialogHeader>
                <FormStepsProvider setOpen={setOpen}>
                    <MainForm />
                </FormStepsProvider>

            </DialogContent>
        </Dialog>
    )
}
