/**
 * @file client.ts
 * @author Kylee Brown
 * @date 01/22/26
 * @description File that holds the function to create a browser client 
 *              for any client side supabase operations (Login). 
 *              - Obeys RLS
 */
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}