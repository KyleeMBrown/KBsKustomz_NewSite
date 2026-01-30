/********************************************************************/
/************* Routes that handle users of the Dashboard ************/
/********************************************************************/

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/Lib/supabase/admin";
import { User } from "@/Lib/types/Types";
import { createUser } from "@/Lib/helpers/supabaseHelpers";
import { createClient } from "@/Lib/supabase/server";

/**
 * Route that creates a user in the Database
 * @param request
 * @method POST
 * @description creates a user in the auth database 
 *              then adds the user to the users table
 */
export async function POST(req: NextRequest):Promise<NextResponse> {
    try {
        // request the user object from the client
        const user:User = await req.json();
        // create a server client to handle user creation
        const supabase = await createAdminClient();

        // use the helper fucntion to create a user
        await createUser(supabase, user);
        // return success message and staus code
        return NextResponse.json({message:"User Successfully created!"}, {status:200})
    } catch (err) {
        // log error to the console
        console.error(err.message)
        // return an error message and status code
        return NextResponse.json({ message: err.message }, { status: 400 })
        
    }    
}