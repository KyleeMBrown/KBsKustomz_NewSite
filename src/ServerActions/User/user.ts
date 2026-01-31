'use server'

/**
 * @file user.ts
 * @author Kylee Brown
 * @description File that handles fetching the API for USER Data
 *
 */

import { createUser } from "@/Lib/helpers/supabaseHelpers";
import { createAdminClient } from "@/Lib/supabase/admin";
import { createClient } from "@/Lib/supabase/server";
import { User } from "@/Lib/types/Types";
import { JwtPayload, SupabaseClient } from "@supabase/supabase-js";

/**
 * @name createNewUser
 * @description - Function that creates another user for the dashboard
 * @async
 */

export const createNewUser = async (user: User):Promise<{message:string}> => {
  try {
    // create supabase server client
    const supabase:SupabaseClient = await createAdminClient();

    // use the helper fucntion to create a user
    await createUser(supabase, user);

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
 */

export const getUser = async ():Promise<JwtPayload> => {
  try {
    // bug fix: create client needs to be inside component or else
    // the api pulls stale users
    const supabase = await createClient();

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