"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/app/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/app/ui/dropdown-menu"

import { type ServiceAdmin } from "@/src/components/servicesComponents/ServicesTable"
import { type paymentStatus, paymentStatuses } from "../data/serviceData"
import { api } from "@/src/utils/api"
import { trpc } from "@/src/utils/trpc"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader } from "@/src/components/ui/dialog"

interface DataTableRowActionsProps {
    row: Row<ServiceAdmin>
}

export function ServiceDataTableRowActions({
    row,
}: DataTableRowActionsProps) {
    const task = row.original
    const utils = trpc.useContext()
    const [open, setOpen] = useState(false)
    const notification = api.notification.createServicePayment.useMutation()
    const mutate = api.service.update.useMutation()
    const acredit = api.service.acredit.useMutation({
        onSuccess: () => {
            console.log('success')
            void utils.service.getEvery.invalidate()
        },
        onError: (error) => {
            console.log(error)
        }
    })
    function handlePaymentStatusChange(status: paymentStatus) {
        console.log(status, task.category)
        console.log(task.id, task.paymentStatus)
        if (status === 'ACREDITADO') {
            setOpen(true)
        }
        mutate.mutate({ id: task.id, paymentStatus: status ? status : 'PENDIENTE' }, {
            onSuccess: () => {
                console.log('success')
                void utils.service.getEvery.invalidate()
            },
            onError: (error) => {
                console.log(error)
            }
        })
    }
    const handleAcredit = () => {
        acredit.mutate({
            id: task.id,
            userId: task.budget.author.id,
            price: task.budget.price,
            categoryName: task.category.name,
        }, {
            onSuccess: () => {
                console.log('success')
                void utils.service.getEvery.invalidate()
                handleClose()
            },
            onError: (error) => {
                console.log(error)
                handleClose()

            }
        })
    }

    const handleClose = () => {
        setOpen(false)
        setTimeout(() => (document.body.style.pointerEvents = ""), 500)

    }

    return (
        <>
            <Dialog open={open}
                onOpenChange={handleClose}

            >
                <DropdownMenu>
                    <DropdownMenuTrigger >
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">

                <DropdownMenuRadioGroup value={task.paymentStatus ?? 'PENDIENTE'}>
                    {paymentStatuses.map((status) => (
                        <>
                            <DropdownMenuRadioItem key={status.value}
                                value={status.value ?? 'PENDIENTE'}
                                onSelect={() => handlePaymentStatusChange(status.value)}
                            >
                                <div className="flex w-[100px] items-center">
                                    {status.icon && (
                                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span>{status.label}</span>
                                </div>
                            </DropdownMenuRadioItem>
                        </>

                    ))}
                </DropdownMenuRadioGroup>

            </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent>
                    <DialogHeader>
                        <div className="text-2xl text-center font-bold text-gray-900">Esta opcion no es reversible!</div>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col text-center items-center justify-center">
                            <div>Esta opcion le enviara un mail a el usuario notificandole que se ha acredtado su pago.
                            </div>
                            <span>Precio: {task.budget.price}</span>
                            <span>Cbu: {task.budget.author.cbu}</span>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <Button
                                className="w-full"
                                variant="default"
                                onClick={handleAcredit}
                            >
                                Enviar mail
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>


        </>

    )
}
