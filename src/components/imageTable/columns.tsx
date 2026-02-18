"use client"

import { Images } from "@/lib/types/Types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate } from "@/lib/helpers/clientHelpers"


export const columns: ColumnDef<Images>[] = [
  {
    accessorKey: "image_url",
    header: "Image",
  },
  {
    accessorKey: "alt_text",
    header: "Alt Text",
  },
  {
    accessorKey: "image_order",
    header: "Order",
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
    id: "actions",
    cell: ({ row }) => {
 
      return (
        <>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer hover:bg-white hover:text-[#240d01]">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-black text-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>

        </>
      )
    },
  }
]