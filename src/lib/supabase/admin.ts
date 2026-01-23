/**
 * @author Kylee Brown
 * @date 01/22/26
 * @description File that holds the function to create an admin client for 
 *              bypassing the RLS and ADMIN level privleges
 */

import { createClient } from '@supabase/supabase-js'

export async function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_SECRET_KEY!, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}