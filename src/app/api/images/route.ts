/********************************************************************/
/************* Routes that handle image uploads/retrieval ***********/
/********************************************************************/

import { NextRequest, NextResponse } from "next/server";
import { put } from '@vercel/blob';
import { createClient } from "@/lib/supabase/server";

/*
* Endpoint to retrieve the uploaded images from supabase
* method: GET
* @param req
*/
export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        
        

    } catch (err) {
        return NextResponse.json({err}, {status:404}) 
    }
    
}