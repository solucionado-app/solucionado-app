import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useRouter } from 'next/router'

interface DialogAuthConfirmationProps {
    open: boolean
    setOpen: (open: boolean) => void

}

export default function DialogAuthConfirmation({ open, setOpen, }: DialogAuthConfirmationProps) {
    const router = useRouter()
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Inicia Sesion!</DialogTitle>
                        <DialogDescription>
                            Inicia Sesion para Seguir con la cotizacion.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                        <Button onClick={() => void router.push({
                            pathname: "/login",
                            query: {
                                redirect: router.asPath,
                            }
                        })} type="button">Continuar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
