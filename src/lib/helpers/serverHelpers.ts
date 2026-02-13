/**
 * @file serverHelpers.ts
 * @author Kylee Brown
 * @description File to hold all server helper functions
 * SERVER HELPERS
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "../supabase/client"
import { Database } from "../types/supabaseKbs";

import { unstable_cache } from "next/cache";

type Images = Database["public"]["Tables"]["images"]["Row"]

/**
 * Generates a local url from the client uploaded file
 * @param file
 * @returns a string representing the lcoal url path of that file
 */

export const generateLocalURL = (file: File):string => { 
  const url = URL.createObjectURL(file);
  return url;
}

/**
 * Function to make sure all columns are authorized in request
 * @param {string[]} allowedColumns 
 * @param {any} userObject
 * @returns {boolean} wether the request is on authorized columns or not
 */
export const whitelistColumns = (allowedColumns: string[], userObject:any): boolean => {
    // check if all requested columns are allowed
    for (let key of Object.keys(userObject)) {  
        if (allowedColumns.includes(key)) {
          // continue checking
          continue
        } else {
          // else restricted key was found respond with false
          return false
        }
    }

    return true
}