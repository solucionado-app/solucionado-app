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
import { paymentStatuses } from "../data/serviceData"

interface DataTableRowActionsProps {
    row: Row<ServiceAdmin>
}

export function ServiceDataTableRowActions({
    row,
}: DataTableRowActionsProps) {
    const task = row.original
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
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

                            <DropdownMenuRadioItem key={status.value} value={status.value}>
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
    )
}
