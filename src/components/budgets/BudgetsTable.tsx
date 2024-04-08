/* eslint-disable */
import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import format from "date-fns/format";
import { es } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AlertCompleteBudgetDialog from "./AlertCompleteBudgetDialog";
import { JSONObject, JSONValue } from "superjson/dist/types";
import { Input } from "../ui/input";
import StatusTranslate from "../servicerequest/StatusTranslate";
import SolucionadorRating from "../profile/SolucionadorTabs/SolucionadorRating";


export interface BudgetsTableProps {
  id: string;
  description: string;
  price: number;
  estimatedAt: Date;
  serviceRequestId: string;
  author: Author;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
type Author = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  mpCode?: JSONValue | JSONObject | undefined;
  image_url: string | null;

};
export const columns: ColumnDef<BudgetsTableProps>[] = [
  {
    id: "Precio",
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button

          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("Precio"));


      // Format the price as a dollar price
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price * 1.11);

      return <div className="font-medium whitespace-nowrap ">{formatted}</div>;
    },
  },

  {
    id: "Solucionador",
    accessorKey: "author",
    header: "Solucionador",
    enableColumnFilter: true,
    cell: ({ row }) => {
      const author: Author = row.getValue("Solucionador");
      const { rating, count } = author?.mpCode as { rating: number, count: number };
      return (
        <SolucionadorRating user={author} rating={rating} count={count} />
      );
    },
  },
  {
    id: "Descripción",
    accessorKey: "description",
    header: () => <div className="">Descripción</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("Descripción")}</div>
    ),
  },
  {
    id: "FechaEstimada",
    accessorKey: "estimatedAt",
    header: "Fecha Estimada",
    cell: ({ row }) => (
      <div className="capitalize">
        {format(row.getValue("FechaEstimada"), "PPP", { locale: es })}
      </div>
    ),
  },

  {
    id: "Estado",
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return <div className="capitalize"> <StatusTranslate status={row.getValue("Estado")} /></div>;
    },
  },

  {

    id: "Acciones",
    cell: ({ row }) => {
      const budget = row.original;
      return (
        <AlertCompleteBudgetDialog budget={budget} />
      );
    },
  },
];
type Status = "PENDING" | "ACEPTED" | "REJECTED" | "FINISHED"

interface Props {
  budgets: BudgetsTableProps[] | undefined;
  status: Status;
  isSolucionador?: boolean;
}

export default function BudgetsTable({ budgets, status, isSolucionador }: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      Descripción: window.innerWidth > 780 ? true : false,
      FechaEstimada: window.innerWidth > 780 ? true : false,
      Estado: window.innerWidth > 780 ? true : false,
    });
  const [rowSelection, setRowSelection] = React.useState({
  });
  if (status === 'ACEPTED' || isSolucionador) columnVisibility["Acciones"] = false;
  const table = useReactTable({
    data: budgets ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });


  return (
    <>

      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center gap-5 py-4">
          {/* <Input
            placeholder="filtrar por solucionador"
            value={(table.getColumn("Solucionador")?.getFilterValue() as string) ?? ""}
            onChange={(event) => (
              console.log(table.getColumn("Solucionador")?.columnDef),
              table.getColumn("Solucionador")?.setFilterValue(()

                table.getRowModel().rows.filter((row) => (console.log(row.original.author.first_name),
                  row.original.author.first_name?.toLowerCase().includes(event.target.value.toLowerCase()))

                )
              )
            )
            }
            className="max-w-sm"
          /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columnas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  if (column.id === 'Acciones' && status === 'ACEPTED') return null;
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border w-auto ">
          <Table className="w-full ">
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className="px-2 w-fit" key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="w-full">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="w-full"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (

                        (<TableCell className={`p-3 px-1.5 w-fit whitespace-nowrap `} key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                        )
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Aun no hay presupuestos para tu solicitud.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} Fila(s) seleccionadas.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
      <div>

      </div>
    </>
  );
}
