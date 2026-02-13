'use server'

/**
 * @file images.ts
 * @author Kylee Brown
 * @description File that handles images
 */

import { createClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { PutBlobResult, put } from "@vercel/blob";
import { revalidateTag } from "next/cache";




/**
 * @name uploadImages
 * @description - Function that uploads images to the CDN + Database
 * @async
 * SERVER ACTION
 */

export const uploadImage = async (file: File, index:number, totalImageCount:number): Promise<void> => {
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
            .insert([{ image_url: blob.url, alt_text: "KB's Kustomz Gallery Image", image_order:(index) + totalImageCount }])

        // handle error
        if (error) {
            const e = new Error(error.message);
            (e as any).code = error.code;
            (e as any).details = error.details;
            throw e;
        }
        
        index === totalImageCount ? revalidateTag("images", "max"):null
    } catch (err) {
        
        throw err;
    }
}

/**
 * @name getImageCount
 * @description - Function that retrieves the total number of images
 * @async
 * SERVER ACTION
 */
export const getImageCount = async (): Promise<number> => {
    // create a supabase client
    const supabase = await createClient();
    try {
        const { count, error } = await supabase
        .from('images')
        .select('*', { count: 'exact', head: true })
        
        // if supabase error
        if (error) {
            // rebuild the error object
            const e = new Error(error.message);
            (e as any).code = error.code;
            (e as any).details = error.details;
            // throw error
            throw e;
        }

        // return the count
        return count;
    } catch (err) {
        throw err;
    }
}
