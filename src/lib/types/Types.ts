import { Sidebar } from "@/Components/ui/sidebar";
import { Database } from "./supabaseKbs";
import React from 'react'
import { AuthUser, UserResponse } from "@supabase/supabase-js";

export type User =
    {
        first_name: string,
        last_name:string
        email: string,
        password: string,
        role: string,
        created_by:string
    }

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
        user: AuthUser
}