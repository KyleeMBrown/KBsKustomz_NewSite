/********************************************************************/
/***************************** Custom Types *************************/
/********************************************************************/
import { Dispatch, SetStateAction } from "react"
import { Database } from "./supabaseKbs"

export type User =
    {
        first_name: string,
        last_name:string
        email: string,
        password: string,
        role: string,
        created_by:string
    }

export type Images = Database["public"]["Tables"]["images"]["Row"]
export type Users = Database["public"]["Tables"]["users"]["Row"]
 
import { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    setDeleteOpen: Dispatch<SetStateAction<boolean>>
  }
}