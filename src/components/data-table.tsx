import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<import("@tanstack/react-table").SortingState>([])
  const [filtering, setFiltering] = React.useState("")

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  // Function to get the pagination window (max 5 pages)
  const getPageNumbers = () => {
    const pageIndex = table.getState().pagination.pageIndex
    const pageCount = table.getPageCount()
    const current = pageIndex + 1
    const pages = []
    const maxVisible = 5

    let start = Math.max(1, current - 2)
    let end = Math.min(pageCount, current + 2)

    if (current <= 3) {
      start = 1
      end = Math.min(pageCount, maxVisible)
    } else if (current >= pageCount - 2) {
      start = Math.max(1, pageCount - maxVisible + 1)
      end = pageCount
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  const pages = getPageNumbers()
  const pageIndex = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()

  return (
    <div>
      {/* Filter Input */}
      <div className="flex items-center py-4 justify-end gap-4">
        <Input
          placeholder="Filter..."
          value={filtering ?? ""}
          onChange={(e) => setFiltering(e.target.value)}
          className="w-full md:w-96"
        />
        
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? "cursor-pointer select-none" : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                        {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-4 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(0)}
          disabled={pageIndex === 0}
        >
          «
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>

        {pages[0] > 1 && (
          <>
            <Button variant="outline" size="sm" onClick={() => table.setPageIndex(0)}>
              1
            </Button>
            {pages[0] > 2 && <span className="px-2">...</span>}
          </>
        )}

        {pages.map((p) => (
          <Button
            key={p}
            variant={p === pageIndex + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => table.setPageIndex(p - 1)}
          >
            {p}
          </Button>
        ))}

        {pages[pages.length - 1] < pageCount && (
          <>
            {pages[pages.length - 1] < pageCount - 1 && (
              <span className="px-2">...</span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(pageCount - 1)}
            >
              {pageCount}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={pageIndex === pageCount - 1}
        >
          »
        </Button>
      </div>
    </div>
  )
}
