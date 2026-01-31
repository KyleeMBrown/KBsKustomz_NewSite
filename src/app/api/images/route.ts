/********************************************************************/
/************* Routes that handle image uploads/retrieval ***********/
/********************************************************************/

import { NextRequest, NextResponse } from "next/server";
import { put } from '@vercel/blob';
import { createClient } from "@/Lib/supabase/server";


export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
    
        const files: File[] = await req.json();

        const supabase = await createClient();

        files.forEach(async (file) => {
            const blob = await put(file.name, file, {
                access: 'public',
            });
        
        

        const { data, error } = await supabase
            .from('images')
            .insert([
                {image_url: blob, alt_text:"KB's Kustomz Gallery Image"},
            ])

        })

        
    } catch (err) {
        return 
    }
    
}