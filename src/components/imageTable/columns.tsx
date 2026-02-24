"use client"

import { Images } from "@/lib/types/Types"
import { ColumnDef } from "@tanstack/react-table"

import { formatDate, useIsMobile } from "@/lib/helpers/clientHelpers"
import { Checkbox } from "../ui/checkbox"


export const columns: ColumnDef<Images>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => {
     const isAll = table.getIsAllPageRowsSelected()
     
      return (
       <> <Checkbox
        checked={
          isAll
          ? true
          : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-white bg-[#ffffff5f] hover:bg-[#150a045e] mr-3 cursor-pointer text-white transition-all duration-350 ease-in w-5 h-5 max-[768px]:h-7 max-[768px]:w-7"
        />
          <p className="pr-2">Select All</p>
        </>)
      },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-0 bg-[#150a042a] hover:bg-[#150a045e] cursor-pointer text-[#150a04] transition-all duration-350 ease-in w-5 h-5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image_url",
    header: "Image",
  },
  {
    accessorKey: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => {
      return formatDate(row.getValue('updated_at') as string)
    }
  },
  {
    accessorKey: "upload_date",
    header: "Upload Date",
    cell: ({ row }) => {
      return formatDate(row.getValue('upload_date') as string)
    }
  },
  {
    id: "delete",
    cell: ({ table, row }) => {
      
        return (
          <>
            <svg onClick={() => { table.setRowSelection({ [row.id]: true }), table.options.meta?.setDeleteOpen(true), console.log(table.getFilteredSelectedRowModel().rows) }} key={row.id} xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-trash cursor-pointer hover:fill-red-600 p-2 border border-transparent hover:border-red-600 rounded" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </>
        )
    },
  },
  {
    id: "move",
    cell: ({ row }) => {
 
      return (
        <>
        <svg key={row.id} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrows-move cursor-grab active:cursor-grabbing hover:fill-gray-400 active:fill-gray-400" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
        </svg>
        </>
      )
    },
  }
]