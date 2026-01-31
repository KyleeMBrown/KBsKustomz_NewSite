/**
 * @file user.ts
 * @author Kylee Brown
 * @description File that handles fetching the API for USER Data
 *
 */

import { createClient } from "@/Lib/supabase/server";
import { JwtPayload } from "@supabase/supabase-js";

/**
 * @name getUser
 * @description - Function that retrieves the current user object via API fetch
 * @async
 */

export const getUser = async () => {
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