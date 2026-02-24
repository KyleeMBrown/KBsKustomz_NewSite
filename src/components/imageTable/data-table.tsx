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
import { deleteImages } from "@/ServerActions/Images/images"
import { useIsMobile } from "@/lib/helpers/clientHelpers"
import SortableMobile from "./SortableMobile"

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
  const [items, setItems]:[Images[], Dispatch<SetStateAction<Images[]>>]  = useState<Images[]>([...data]);
  // handles the state of disabled cta's 
  const [disabled, setDisabled]:[boolean, Dispatch<SetStateAction<boolean>>]  = useState<boolean>(true);
  // handle the popup modal state
  const [open, setOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
  // handle load state of save
  const [load, setLoad]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

  // handle the error state
  const [error, setError]: [Error, Dispatch<SetStateAction<Error>>] = useState<Error>(null);
   // handle the success state
  const [success, setSuccess]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
  // handle selected rows
  const [rowSelection, setRowSelection] = useState({});
   // handle the delete popup modal state
  const [deleteOpen, setDeleteOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // create table 
  const table = useReactTable({
    data:items,// use items
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    meta: { setDeleteOpen },
    getRowId: (row: any) => row.id // id for each item
  });

const imagesToDelete = table.getFilteredSelectedRowModel().rows.map(row=>row.original)


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
      setRowSelection({})
      await refresh();
      setDisabled(true);

    } catch (e) {
      setLoad(false)
      setError(e)
    }
  }

  const handleDelete = async () => {
   
    try {
      setLoad(true)
      //TODO: handle deleting the selected images
      await deleteImages([...imagesToDelete])
      refresh()
      setLoad(false)
      setSuccess(true)
    } catch(e) {
      setError(e);
      setLoad(false)
    }
  }

    return (
      <>
        {/* Save & Reset Action Buttons */}
        <div className="w-full mb-2">
          {table.getFilteredSelectedRowModel().rows.length === 0 ?
            <>
              {/* SAVE Button */}
              <Button disabled={disabled} onClick={() => { setOpen(true), setSuccess(false), setError(null) }} className={cn(disabled ? 'text-gray-700' : 'text-green-600', "bg-white  hover:bg-green-600 hover:text-white mr-2 cursor-pointer")}>Save</Button>
              {/* RESET BUTTON */}
              <Button disabled={disabled} onClick={() => { setItems([...data]), setSuccess(false), setDisabled(true) }} className={cn(disabled ? 'text-gray-700' : 'text-red-600', "bg-white  hover:bg-red-600 hover:text-white pr-8 pl-8 cursor-pointer")}>Reset</Button>
            </> :
            /* DELETE SELECTED BUTTON */
            <Button onClick={() => { setDeleteOpen(true), setSuccess(false), console.log(imagesToDelete) }} className="bg-red-500 text-white hover:bg-red-600 transition-all ease-in duration-200 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-trash cursor-pointer" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
              {table.getFilteredSelectedRowModel().rows.length}
            </Button>
          }</div>
         {/* TABLE WRAPPER */}
      <div className="h-[38.5em] max-[768px]:h-[35em] max-[440px]:h-[46em]  max-[400px]:h-[43em] max-[380px]:h-[35em]  max-[376px]:h-[32em] max-[350px]:h-[45em]  max-[330px]:h-[32em] overflow-y-auto bg-[#150a04] relative max-[768px]:overflow-x-hidden  rounded-md border no-scrollbar">
        {/* TABLE */}
        <Table className="bg-[#150a04] border-separate border-spacing-x-0 border-spacing-y-3 max-[768px]:border-spacing-y-2 p-4 max-[768px]:p-2 pt-0">
          {/* HEADER */}
          <TableHeader className="sticky top-0 z-20 bg-transparent w-full h-[4em]">
          
            {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                 !isMobile? <TableHead key={header.id} className="text-center bg-[#150a04]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>:<TableHead key={header.id} className="text-center bg-[#150a04]">
                    {header.column.id !== "select"
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
                    !isMobile ? <Sortable key={row.id} id={row.id} row={row} index={index} />
                      : <SortableMobile row={ row} id={row.id} key={row.id} index={index} />
                  ))
              ) : (
                  <TableRow>
                      <TableCell colSpan={columns.length} className="h-[73vh] text-center">
                          {loading ? <center><Spinner /></center> : "Loading Images..."}
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
          customClose={<Button variant="outline" className="cursor-pointer" onClick={() => { setOpen(false) }}>{success || error ? "Ok" : "Cancel"}</Button>} footer={!success ? <Button onClick={() => { handleSave() }} className="bg-green-500 text-white cursor-pointer">Save</Button> : null} />
        
        <ModalPopup className="bg-white border-0" open={deleteOpen} setOpen={setDeleteOpen}
          title={<p>Are you sure?</p>}
          description={load ? <Spinner className="w-4" color="black" /> : <span className="text-red-400">{error ? error?.message : success ? "Image(s) deleted" : "This cannot be undone"}</span>}
          customClose={<Button variant="outline" className="cursor-pointer" onClick={() => { setDeleteOpen(false), setRowSelection({}) }}>{success || error ? "Ok" : "Cancel"}</Button>} footer={!success ? <Button onClick={() => {handleDelete()}} className="bg-red-500 text-white cursor-pointer">Confirm Delete</Button> : null}
        
        />
        </div>
        </>
  )
}