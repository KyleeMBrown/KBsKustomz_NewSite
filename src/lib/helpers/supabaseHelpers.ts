/**
 * @file supabaseHelpers.ts
 * @author Kylee Brown
 * @date 01/21/26
 * @description File to hold all SUPABASE helpers
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "../types/Types";
import { Database } from "@/lib/types/supabaseKbs";

type UpdateUser = Database["public"]["Tables"]["users"]["Update"]


/********************************************************************/
/**************************** USER HELPERS **************************/
/********************************************************************/

/**
 * Helper function to create a user in the Database
 * @param supabase - the client used to handle user signup
 * @param user {User} - the user object requested
 * @description The fucntion creates a user in the auth databse 
 *              the inserts a user in to the users table
 * @throws errors produced by the supabase API
 */

export const createUser = async (supabase:any, user:User) => {
    try {
        // sign up the user to the DB using the requested information
        const { data, error } = await supabase.auth.admin.createUser({
            email: user.email,
            email_confirm:true,
            password: user.password,
            user_metadata: { user_role: user.role }
        })
   
        // if there is an error creating the user
        // throw the error
        if (error) { throw error }
    
        // insert the user into the users table
        
        const { data:res, error:err } = await supabase
        .from('users')
        .insert([
            {
                id: data?.user?.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
                created_by: user.created_by
            },
        ])
        .select()
        .single()
        
        // if error throw error
        if (err) { throw err }
        
    } catch (err) {
        // throw error
        throw err
    }
    

}

/**
 * Helper function to help update a user
 * @param supabase 
 * @param user 
 * @param userId 
 * @description - helper function used to update a user in supabase
 * 
 * @throws any errors caught from supabase
 */
export const updateUserHelper = async (supabase:SupabaseClient<Database>, user:UpdateUser, userId:string):Promise<void> => {
    try { 
        // update the user in the AUTH table first
        const { data, error } = await supabase.auth.admin.updateUserById(
            userId,
            {
                email:user.email,
                user_metadata: {
                user_role: user.role
                }
            }
        )

        // if error throw error
        if (error) { throw error }
        
        // update the user in the users table
        const { data:userData, error:userError } = await supabase
        .from('users')
        .update(user)
        .eq("id", userId)
        
        // if error throw error
        if(userError){throw userError}
        
    } catch (e) {
        // throw error
        throw e;
    }
}

/**
 * Helper function to help delete a user
 * @param supabase 
 * @param userId 
 * @description - helper function used to delete a user from the application 
 * 
 * @throws any errors caught from supabase
 */

export const deleteUserHelper = async (supabase:SupabaseClient, userId:string):Promise<void> => {
    try {
        const { data, error } = await supabase.auth.admin.deleteUser(
            userId
        )

        if (error) {
            throw error;
        }
    } catch (err) {
        throw(err)
    }
}
 
/********************************************************************/
/**************************** AUTH HELPERS **************************/
/********************************************************************/
/**
 * Helper function to help send a password reset request email
 * @param {SupabaseClient} supabase 
 * @param {string} email - email to send the request to
 * @description - helper function used to trigger a reset email
 * 
 * @throws any errors caught from supabase
 */

export const sendPassResetRequest = async (supabase:any, email: string): Promise<void> => {
    try {
        // send password reset email via Supabase
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:3000/auth/private/update-password',
        })

        // handle error
        if (error) {
            throw error;
        }
    } catch (e) {
        throw e;
    }
}


