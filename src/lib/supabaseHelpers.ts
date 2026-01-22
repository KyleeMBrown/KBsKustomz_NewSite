/**
 * @author Kylee Brown
 * @date 01/21/26
 * @description File to hold all SUPABASE helpers
 */

import { User } from "./types/Types";

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

export const createUser = async (supabase:any, user: User) => {
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
        
        const { data:res, error:err } = await supabase
        .from('users')
        .insert([
        { first_name: user.first_name, last_name: user.last_name },
        ])
        .select()
        .single()
        
        if (err) { throw err }
        
    } catch (err) {
        throw err
    }
    

}