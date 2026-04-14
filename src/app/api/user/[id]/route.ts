// Route: /user/[id]
/***************************************************************************************/
/**************** Route that handles retrieval of a single user by ID *****************/
/*************************************************************************************/

import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
         // create the supabase server client
        const supabase = await createClient();

        const {id} = await params;

        // fetch the data using the client
        const { data, error } = await supabase
            .from('users')
            .select('first_name, last_name, role, email, created_at, updated_at, created_by')
            .eq("id", id)
            .single()
        
        // if error
        if (error) {
             // return the error
             return NextResponse.json(error, { status: 404 })
        }

        // return the data + successful status
        return NextResponse.json(data, {status:200})
    } catch (e) {
         // return the error
             return NextResponse.json(e, { status: 404 })
    }
} 