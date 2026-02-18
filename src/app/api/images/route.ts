/********************************************************************/
/**************** Routes that handle image retrieval ****************/
/********************************************************************/

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/*
* Endpoint to retrieve the uploaded images from supabase
* method: GET
* @param req
*/
export async function GET(req: NextRequest): Promise<NextResponse> {
    // create the spabase server client
    const supabase = await createClient()

    try {
        //get search params
        const params = req.nextUrl.searchParams;
        const page = Number(params.get("page"))
        const limit = 9;

        if (page != -1) {
            // query the databse using the client
            let { data: images, error } = await supabase
                .from('images')
                .select('*')
                .order("image_order", { ascending: true })
                .range(page * limit, page * limit + (limit - 1))
            
            // if supabase error
            if (error) {
                // return the error
                return NextResponse.json(error, { status: 404 })
            }
            
            // return 
            return NextResponse.json({ message: "Images Successfully Retrieved!", images }, { status: 200 })
        } else {
            // query the databse using the client
            let { data: images, error } = await supabase
                .from('images')
                .select('*')
                .order("image_order", { ascending: true })
        
         // if supabase error
        if (error) {
            // return the error
            return NextResponse.json(error, {status:404})
        }

        // return 
        return NextResponse.json({ message:"Images Successfully Retrieved!", images }, {status:200})
        }


    } catch (err) {
        return NextResponse.json(err, {status:404}) 
    }
    
}