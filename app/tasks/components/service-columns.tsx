"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/app/ui/badge"
import { Checkbox } from "@/app/ui/checkbox"

import { DataTableColumnHeader } from "./data-table-column-header"
import { ServiceAdmin, type Service } from "@/src/components/servicesComponents/ServicesTable"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { ServiceDataTableRowActions } from "./service-table-row-actions"
import { differenceInMilliseconds, format } from "date-fns"
import { es } from "date-fns/locale";
import { normalizePaymentStatus, normalizeStatus, paymentStatuses, statuses } from "../data/serviceData"
import { Row } from "react-day-picker"

export const serviceColumns: ColumnDef<ServiceAdmin>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    className=""
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Precio
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(row.original.budget.price);
            // console.log(row.getValue("amount"))
            return <div className="font-medium">{formatted}</div>;
        },
        accessorFn: row => {

            return row.budget.price
        },
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Servicio" />
        ),
        cell: ({ row }) => <div className="w-14 truncate">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Categoria" />
        ),
        cell: ({ row }) => {
            const label = row.original.category.name
            console.log(row.getValue("category"))
            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label}</Badge>}
                    {/* <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("category").name}
                    </span> */}
                </div>
            )
        },
        accessorFn: row => row.category.name,
        filterFn: (row: { getValue: (id: string) => string }, id: string, value: string[]) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Fecha estimada" />
        ),
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {format(row.original.budget.estimatedAt, "P", { locale: es })}
                </div>
            );
        },
        sortingFn: (rowA, rowB) => {
            return differenceInMilliseconds(rowA.original.budget.estimatedAt, rowB.original.budget.estimatedAt)
        },
    },
    {
        accessorKey: "author",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Solucionador" />
        ),
        cell: ({ row }) => {
            const author = row.original.budget.author;

            return (
                <div className="flex items-center space-x-2">

                    <div className="text-sm font-medium">
                        {author.first_name} {author.last_name}
                    </div>
                </div>
            );
        },
        accessorFn: row => {
            const author = row.budget.author
            const name = (author.first_name ? author.first_name : ' ') + (author.last_name ? author.last_name : ' ')
            console.log(name)
            return (author.first_name ? author.first_name : ' ') + (author.last_name ? author.last_name : ' ')
        },
        sortingFn: (rowA, rowB) => {
            const nameA: string = rowA.getValue("author")
            const nameB: string = rowB.getValue("author")


            return nameA.localeCompare(nameB)
        }
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            )
            if (!status) {
                return null
            }

            return (
                <div className="flex  items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        },

        filterFn: (row: { getValue: (id: string) => string }, id: string, value: string[]) => {
            console.log(value, row.getValue(id))
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "payment",
        header: "Pago",
        cell: ({ row }) => {
            const paymetStatus = paymentStatuses.find(
                (status) => status.value === row.getValue("payment")
            )
            if (!paymetStatus) {
                return null
            }

            return (
                <div className="flex  items-center">
                    {paymetStatus.icon && (
                        <paymetStatus.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{paymetStatus.label}</span>
                </div>
            )
        },
        accessorFn: row => {
            return normalizePaymentStatus(row.paymentStatus)
        },
        filterFn: (row: { getValue: (id: string) => string }, id: string, value: string[]) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "cbu",
        header: "cbu",
        cell: ({ row }) => {
            return <div className="">{row.getValue("cbu")}</div>;
        },
        accessorFn: row => {
            return row.budget.author.cbu
        },
        filterFn: (row: { getValue: (id: string) => string }, id: string, value: string[]) => {
            return value.includes(row.getValue(id));
        },
    },

    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const payment = row.original;

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Acciones</DropdownMenuLabel>
    //                     {/* <DropdownMenuItem
    //           onClick={() => navigator.clipboard.writeText(payment.id)}
    //         >
    //           Copy payment ID
    //         </DropdownMenuItem> */}
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>Finalizar</DropdownMenuItem>
    //                     <DropdownMenuItem>Aceptar</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     },
    // },
    {
        id: "actions",
        cell: ({ row }) => <ServiceDataTableRowActions row={row} />,
    },
]
