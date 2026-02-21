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
import { Spinner } from "../ui/spinner"
import Sortable from "./Sortable"
import {DragDropProvider, DragOverlay} from '@dnd-kit/react';
import { useEffect, useState } from "react"
import { isSortable} from '@dnd-kit/react/sortable';
import { Button } from "../ui/button"
import { cn } from "@/Styling configs/utils"

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  loading: boolean
}

export function DataTable<TData>({
    columns,
    data,
  loading
}: DataTableProps<TData>) {


  // items in the table
  const [items, setItems] = useState([...data]);
  // disabled cta's 
   const [disabled, setDisabled] = useState(true);

  // create table 
  const table = useReactTable({
    data:items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row: any) => row.id
  });

  useEffect(() => {
   
      setItems([...data]);

  }, [data])

    return (

    <div className="h-[38.5em] overflow-y-auto relative rounded-md border">
      <Table className="bg-[#150a04] border-separate border-spacing-x-0 border-spacing-y-3 p-4 pt-0">
        <TableHeader className=" sticky top-0 z-20 bg-transparent w-full h-[4em]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center bg-[#150a04]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
              <TableCell className="absolute -right-2">
                {/* SAVE Button */}
                
                <Button disabled={disabled} className={cn(disabled ? 'text-gray-700' : 'text-green-600', "bg-white  hover:bg-green-600 hover:text-white mr-2 cursor-pointer")}>Save</Button>
                <Button disabled={disabled} onClick={() => {setItems([...data]), setDisabled(true)}} className={cn(disabled ? 'text-gray-700' : 'text-red-600', "bg-white  hover:bg-red-600 hover:text-white pr-8 pl-8 cursor-pointer")}>Reset</Button>
              </TableCell>
            </TableRow>
          ))}     
          </TableHeader>
          <TableBody>
            <DragDropProvider
              onDragEnd={(event) => {
              
              if (event.canceled) return;

               const {source} = event.operation;

              if (isSortable(source)) {
                const {initialIndex, index} = source;

              if (initialIndex !== index) {
                setItems((items) => {
                  const newItems = [...items];
                  const [removed] = newItems.splice(initialIndex, 1);
                  newItems.splice(index, 0, removed);
                  console.log(data, newItems)
                  setDisabled(JSON.stringify(newItems) === JSON.stringify(data));
                  return newItems;
                });
                }            
                }
              }}
            >
            
              {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <Sortable key={row.id} id={row.id} row={row} index={index} />
                  ))
              ) : (
                  <TableRow>
                      <TableCell colSpan={columns.length} className="h-[73vh] text-center">
                          {loading ? <center><Spinner /></center> : "Please Upload Images"}
                      </TableCell>
                  </TableRow>
                )}
              
          </DragDropProvider>
            </TableBody>
            
      </Table>
            </div>
  )
}