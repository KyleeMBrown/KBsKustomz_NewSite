'use server'
import { createClientBrowser } from "@/lib/supabase/client";
/**
 * @file images.ts
 * @author Kylee Brown
 * @description File that handles images
 */
import { createClient } from "@/lib/supabase/server";
import { PutBlobResult, put } from "@vercel/blob";
import { revalidateTag, unstable_cache } from "next/cache";

/**
 * @name uploadImages
 * @description - Function that uploads images to the CDN + Database
 * @async
 * SERVER ACTION
 */

export const uploadImage = async (file: File, index:number, totalImageCount:number): Promise<void> => {
    try {
       
        const supabase = await createClient();

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
        
        if (index === totalImageCount - 1) {
            revalidateTag("images", "max");
          }
    } catch (err) {
        // throw error
        throw err;
    }
}


/**
 * @name saveImages
 * @description - Function that updates the order of images
 * @async
 * SERVER ACTION
 */

export const saveImages = async (images:any) => { 
    // create a supabase client
    const supabase = await createClient();
    try { 
    
    const { data, error } = await supabase
        .from('images')
        .upsert(images)
        .select()
    
        // if error inserting into DB
        if (error) {
        // create a new error obj
            const e = new Error(error.message);
            (e as any).code = error.code;
            (e as any).details = error.details;
            throw e;
        }    
        // revalidate the image fetch tag
        revalidateTag("images", "max");
        return data;
    } catch (err) {
         // handle error
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