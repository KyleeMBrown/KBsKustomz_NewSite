import { Database } from "./supabaseKbs";

export type User =
    {
        first_name: string,
        last_name:string
        email: string,
        password: string,
        role: string,
        created_by:string
    }