/**
 * @author Kylee Brown
 * @date 01/21/26
 * @description File to hold all SUPABASE helpers
 */

import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./types/supabaseKbs";
import { User } from "./types/Types";

/********************************************************************/
/**************************** USER HELPERS **************************/
/********************************************************************/

/**
 * Helper function to create a user in the Database
 * @param supabase - the client used to handle user signup
 * @param {User} - the user object request from the client
 * @description The fucntion creates a user in the auth databse 
 *              the inserts a user in to the users table
 */

export const createUser = async (supabase, user: User) => {
    try {
        // sign up the user to the DB using the requested information
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: {
                    user_role: user.role
                }
            }
        })
   
        // if there is an error creating the user
        // throw the error
        if (error) { throw error }
    
        // insert the user into the users table
        const { data:response, error:err } = await supabase
    } catch (err) {
        
    }
    

}