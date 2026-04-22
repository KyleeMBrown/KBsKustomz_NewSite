// Route: /users/
/*****************************************************************************/
/**************** Route that handles retrieval of ALL users *****************/
/***************************************************************************/

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
    // create the supabase server client
    const supabase = await createAdminClient();
    try {

        // fetch the data using the client
        const { data, error } = await supabase
        .from('users')
        .select()
        
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