"use client"

import { type ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/app/ui/badge"
import { Checkbox } from "@/app/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { type Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { type Service } from "@/src/components/servicesComponents/ServicesTable"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { ServiceDataTableRowActions } from "./service-table-row-actions"
import { format } from "date-fns"
import { es } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"

export const serviceColumns: ColumnDef<Service>[] = [
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
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Servicio" />
        ),
        cell: ({ row }) => <div className="w-[80px] truncate">{row.getValue("id")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="category" />
        ),
        cell: ({ row }) => {
            const label = row.original.category.name
            console.log(row.getValue("description"))
            return (
                <div className="flex space-x-2">
                    {label && <Badge variant="outline">{label}</Badge>}
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("description")}
                    </span>
                </div>
            )
        },
    },
    // {
    //     accessorKey: "status",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Status" />
    //     ),
    //     cell: ({ row }) => {
    //         const status = statuses.find(
    //             (status) => status.value === row.getValue("status")
    //         )

    //         if (!status) {
    //             return null
    //         }

    //         return (
    //             <div className="flex w-[100px] items-center">
    //                 {status.icon && (
    //                     <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //                 )}
    //                 <span>{status.label}</span>
    //             </div>
    //         )
    //     },
    //     filterFn: (row, id, value) => {
    //         return value.includes(row.getValue(id))
    //     },
    // },
    // {
    //     accessorKey: "priority",
    //     header: ({ column }) => (
    //         <DataTableColumnHeader column={column} title="Priority" />
    //     ),
    //     cell: ({ row }) => {
    //         const priority = priorities.find(
    //             (priority) => priority.value === row.getValue("priority")
    //         )

    //         if (!priority) {
    //             return null
    //         }

    //         return (
    //             <div className="flex items-center">
    //                 {priority.icon && (
    //                     <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
    //                 )}
    //                 <span>{priority.label}</span>
    //             </div>
    //         )
    //     },
    //     filterFn: (row, id, value) => {
    //         return value.includes(row.getValue(id))
    //     },
    // },
    {
        accessorKey: "date",
        header: "fecha Estimada",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {format(row.original.budget.estimatedAt, "PPP", { locale: es })}
                </div>
            );
        },
    },
    {
        accessorKey: "author",
        header: "Solucionador",
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
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            return <div className="capitalize">{row.getValue("status")}</div>;
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
