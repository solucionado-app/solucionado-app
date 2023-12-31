"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/app/ui/button"
import { Input } from "@/app/ui/input"
import { DataTableViewOptions } from "@/app/tasks/components/data-table-view-options"

import { statuses } from "../data/serviceData"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { api } from "@/src/utils/api"
import { ServiceTableFacetedFilter } from "./service-table-faceted-filter"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const { data: categories } = api.categories.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
  })



  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center flex-wrap gap-2 md:space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("category") && categories && (
          <ServiceTableFacetedFilter
            column={table.getColumn("category")}
            title="category"
            options={categories}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
