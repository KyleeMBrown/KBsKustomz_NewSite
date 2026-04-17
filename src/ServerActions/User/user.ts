'use server'

/**
 * @file user.ts
 * @author Kylee Brown
 * @description File that handles retrieving user data from the Database client
 *
 */

import { createUser, deleteUserHelper, sendMagicLink, updateUserHelper } from "@/lib/helpers/supabaseHelpers";
import { createAdminClient } from "@/lib/supabase/admin";
import { User } from "@/lib/types/Types";
import { createClient } from "@/lib/supabase/server";
import { JwtPayload, SupabaseClient } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import { Database } from "@/lib/types/supabaseKbs";

type UpdateUser = Database["public"]["Tables"]["users"]["Update"]

/**
 * @name createNewUser
 * @description - Function that creates another user for the dashboard
 * @async
 * SERVER ACTION
 * @role - ADMIN
 */

export const createNewUser = async (user: User):Promise<{message:string}> => {
  try {
    // create supabase server client
    const supabase:SupabaseClient = await createAdminClient();

    // use the helper fucntion to create a user
    await createUser(supabase, user);

    // revalidate the users tag
    revalidateTag("users", "max");

    // return success message
    return { message: "User Successfully Created!" }
  } catch (error) {

    // throw error
    throw error;
  }
}


/**
 * @name getUser
 * @description - Function that retrieves the current user object via API fetch
 * @async
 * SERVER ACTION
 * @role - All roles
 */

export const getUser = async ():Promise<JwtPayload> => {
  try {
    // bug fix: create client needs to be inside component or else
    // the api pulls stale users
    const supabase = await createClient();


    // refresh session
    await supabase.auth.refreshSession()
    
    // trying getClaims() instead
    const { data, error } = await supabase.auth.getClaims();

    //if error retrieving user
    if (error) {
      // log to console for dev
      console.log(error)
    }
    // Get current user from claims
    const user: JwtPayload = data?.claims

    return user
  } catch (e) {
    throw e;
  }
};
  
/**
 * @name updateUser
 * @description - Function that updates a user
 * @async
 * SERVER ACTION
 * @role - ADMIN
 */

export const updateUser = async(user:UpdateUser, userId:string):Promise<{message:string}> => {
  try { 
// create supabase server client
    const supabase:SupabaseClient = await createAdminClient();

    // use helper to update user
    await updateUserHelper(supabase, user, userId)
    
    // revalidate the users tag
    revalidateTag("users", "max");

    // return success message
    return { message: "User Successfully Updated!" }
  } catch (e) {
    throw e;
  }
} 

/**
 * @name deleteUser
 * @param userId - the id of the user that is going to be deleted
 * @description - Function that deletes a user
 * @async
 * SERVER ACTION
 * @role - ADMIN
 */

export const deleteUser = async (userId:string):Promise<{message:string}> => {
  try {
    // create supabase admin client
    const supabase = await createAdminClient();

    //use the deleteUserHelper function
    await deleteUserHelper(supabase, userId);

    return {message: "User Successfully Deleted"}
  } catch (e) {
    // throw error
    throw e;
  }
}

/**
 * @name batchDeleteUser
 * @description - Function that deletes a user
 * @async
 * SERVER ACTION
 * @role - ADMIN
 */

export const batchDelete = async (userIdList:string[]):Promise<{message:string}> => {
  try {
    // create supabase admin client
    const supabase = await createAdminClient();
    // iterate through the list of ids and delete each user
    userIdList.forEach(async (id) => {
      try {
        //use the deleteUserHelper function
        await deleteUserHelper(supabase, id);
      } catch(e) {
        throw e;
      }
    })

    return {message: "All selected users Successfully Deleted"}
  } catch (e) {
    // throw error
    throw e;
  }
}
/**
 * @name sendMagicLinkEmail
 * @description - Function that sends a magic login link to the users email
 * @param email
 * @async
 * SERVER ACTION
 * @role - ADMIN
 */

export const sendMagicLinkEmail = async(email:string):Promise<{message:string}> => {
  try {
    // create the supabase client
    const supabse = await createClient();

    // send the magic link
    await sendMagicLink(supabse, email)

    // return a success message
    return {message:`Magic link has been successfully sent!\nPlease check your inbox at ${email}\nNote: you nay need to check your spam!`}
  } catch (e) {
    throw e;
  }
}

/**
 * @name updatePassword
 * @description - Function that sends a password reset email
 * @param newPassword - new user password
 * @async
 * SERVER ACTION
 * @role - ADMIN
 */

export const updatePassword = async (newPassword:string):Promise<{message:string}>=> {
  try {
    // create the supabase client
    const supabase = await createClient();

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })

    if (error) {
      throw error;
    }
      // return success message
      return { message: "Password Successfully Changed!" }
    
  } catch (e) {
    throw e;
  }
}