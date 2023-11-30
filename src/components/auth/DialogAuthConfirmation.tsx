import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

interface DialogAuthConfirmationProps {
    open: boolean
    setOpen: (open: boolean) => void

}

export default function DialogAuthConfirmation({ open, setOpen, }: DialogAuthConfirmationProps) {
    const pathName = usePathname()
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
                        <Link
                            href={{
                                pathname: "/login",
                                query: {
                                    redirect: pathName,
                                }   
                            }}>
                            <Button type="button">Continuar</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
