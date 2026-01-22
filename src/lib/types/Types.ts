import { Database } from "./supabaseKbs";

export type User =
    {
        email: string,
        password: string,
        role:string
    }