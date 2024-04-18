import { type Dispatch, type SetStateAction } from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,  AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { useUser } from '@clerk/nextjs'
import { FormStepsProvider } from '../auth/FormSolucionador/ContextSolucionadorForm'
import MainForm from '../auth/FormSolucionador/MainForm'
import {X} from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function AlertMercadoPagoIntegrate({ open, setOpen }: Props) {
    const { user, isSignedIn } = useUser()
    if (isSignedIn && !user) return null
    return (
        // <AlertDialog open={open} onOpenChange={setOpen} >
        //     <AlertDialogContent>
        //         <AlertDialogHeader>
        //             <AlertDialogTitle>Completa tu perfil!</AlertDialogTitle>
        //             <AlertDialogDescription>
        //                 Debes completar tus datos para poder enviar presupuestos.
        //             </AlertDialogDescription>
        //         </AlertDialogHeader>
        //         <FormStepsProvider>
        //             <MainForm />
        //         </FormStepsProvider>
        //             <AlertDialogCancel className="fixed top-1 right-1 border-0 p-2"><X/></AlertDialogCancel>
        //     </AlertDialogContent>
        // </AlertDialog>
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
