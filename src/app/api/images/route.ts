import { NextRequest, NextResponse } from "next/server";
import { put } from '@vercel/blob';
import { createClient } from "@/lib/supabase/server";
 


export async function POST(request: NextRequest): Promise<void> {
    try {
    
        const files: File[] = await request.json()
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
        
    }
    
}