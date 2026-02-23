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
import {DragDropProvider} from '@dnd-kit/react';
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { isSortable} from '@dnd-kit/react/sortable';
import { Button } from "../ui/button"
import { cn } from "@/Styling configs/utils"
import ModalPopup from "../ModalPopup"
import { saveImages } from "@/ServerActions/Images/images"
import { Images } from "@/lib/types/Types"

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: Images[]
  loading: boolean,
  refresh:Function
  
}

export function DataTable<TData>({
    columns,
    data,
  loading, refresh
}: DataTableProps<TData>) {


  // handles the state of items in the table
  const [items, setItems] = useState([...data]);
  // handles the state of disabled cta's 
  const [disabled, setDisabled] = useState(true);
  // handle the popup modal state
  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
  // handle load state of save
  const [load, setLoad]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

  // handle the error state
  const [error, setError]: [Error, Dispatch<SetStateAction<Error>>] = useState(null);
   // handle the success state
  const [success, setSuccess]:[boolean, Dispatch<SetStateAction<boolean>>]  = useState(false);
  

  // create table 
  const table = useReactTable({
    data:items,// use items
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row: any) => row.id // id for each item
  });

  // set items after images are fetched
  useEffect(() => {
    const same =
    items.length === data.length &&
    items.every((item, i) => item.id === data[i]?.id);

    if (!same) {
      setItems([...data]);
      setDisabled(true);
    }
  }, [data])

  const handleSave = async () => { 
    try { 
      // start load
      setLoad(true)
      // Recalculate image_order
      const reordered = items.map((item, i) => ({
        ...item,
        image_order: (items.length - i)-1,
      }));

      // update image orders
      await saveImages([...reordered]);
      // stop load
      setLoad(false)
      setSuccess(true)
      // re-fetch the images
      await refresh();
      setDisabled(true);

    } catch (e) {
      setLoad(false)
      setError(e)
    }
  }

  const handleDelete = async () => {
   
    try {
       //TODO: handle deleting the selected images
    } catch {
      
    }
  }

    return (

    <div className="h-[38.5em] overflow-y-auto relative rounded-md border custom-scrollbar">
      <Table className="bg-[#150a04] border-separate border-spacing-x-0 border-spacing-y-3 p-4 pt-0">
          {/* HEADER */}
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
              {/* Buttons */}
              <TableCell className="absolute -right-2">
                {/* SAVE Button */}
                <Button disabled={disabled} onClick={() => { setOpen(true), setSuccess(false), setError(null) }} className={cn(disabled ? 'text-gray-700' : 'text-green-600', "bg-white  hover:bg-green-600 hover:text-white mr-2 cursor-pointer")}>Save</Button>
                {/* RESET BUTTON */} 
                <Button disabled={disabled} onClick={() => {setItems([...data]), setDisabled(true) }} className={cn(disabled ? 'text-gray-700' : 'text-red-600', "bg-white  hover:bg-red-600 hover:text-white pr-8 pl-8 cursor-pointer")}>Reset</Button>
              </TableCell>
            </TableRow>
          ))}     
          </TableHeader>
          {/* TABLE (DRAG N DROP) */}
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

                      // set disabled to true if the list hasn't changed
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
        <ModalPopup className="bg-white border-0" open={open} setOpen={setOpen}
          title={!success || !load ? <p className="font-medium">Are you sure?</p>:null}
          description={load ?
        <Spinner className="w-4" color="black" /> :
            <span className={cn(error?"text-black":null, success?'text-green-500':null)}>{error ? error?.message: success?"Images Saved Successfully":null}</span>
            
          }
          customClose={<Button variant="outline" className="cursor-pointer" onClick={() => { setOpen(false) }}>{success || error ? "Ok": "Cancel"}</Button>} footer={!success ? <Button onClick={()=>{handleSave()}} className="bg-green-500 text-white cursor-pointer">Save</Button>: null} />
        </div>
  )
}