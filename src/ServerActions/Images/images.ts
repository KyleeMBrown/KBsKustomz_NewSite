'use server'

/**
 * @file images.ts
 * @author Kylee Brown
 * @description File that handles image uploads & retrievals
 */

import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { PutBlobResult, put } from "@vercel/blob";

/**
 * @name uploadImages
 * @description - Function that uploads images to the CDN + Database
 * @async
 * SERVER ACTION
 */

export const uploadImage = async (file: File): Promise<void> => {
    try {
       
        const supabase: SupabaseClient = await createClient();

        // upload the image to the CDN
        const blob: PutBlobResult = await put(file.name, file, {
            access: 'public',
            addRandomSuffix:true
        });
            
        // insert the urls into the database
        const { data, error } = await supabase
            .from('images')
            .insert([{ image_url: blob.url, alt_text: "KB's Kustomz Gallery Image" }])

        // handle error
        if (error) {
            const e = new Error(error.message);
            (e as any).code = error.code;
            (e as any).details = error.details;
            throw e;
        }
        
        
    } catch (err) {
        
        throw err;
    }
}