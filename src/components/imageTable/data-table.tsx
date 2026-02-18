"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Images } from "@/lib/types/Types"
import { Spinner } from "../ui/spinner"
import Image from "next/image"

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
    data: TData[]
    loading:boolean
}

export function DataTable<TData>({
    columns,
    data,
    loading
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  },
  )


    return (

    <div className="h-[38.5em] overflow-auto relative rounded-md border bg-[#0f0500]">
      <Table className="">
        <TableHeader className="border-b-white sticky top-0 z-20 bg-[#0f0500]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center align-middle ">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="">
                  {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                          <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                          >
                              {row.getVisibleCells().map((cell, i) => (
                                  
                                  cell.column.id !== "image_url" ? <TableCell key={cell.id} className="text-center align-middle">
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </TableCell> :
                                      <TableCell key={cell.id} className="flex justify-center items-center">
                                          <a href={cell.getValue() as string} target="_blank"><Image loading="lazy" alt="" style={{ objectFit: "cover", width: "50px", height: "40px" }} src={cell.getValue() as string} width={30} height={30} /></a>
                                      
                                  </TableCell>
                              ))}
                          </TableRow>
                      ))
                  ) : (
                      <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                              {loading ? <center><Spinner /></center> : "Please Upload Images"}
                          </TableCell>
                      </TableRow>
                  )}
        </TableBody>
      </Table>
            </div>
  )
}