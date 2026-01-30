'use server'

import { createClient } from "../supabase/server";
// create supabase client agent
const supabase = await createClient();
export const logOut = async() => {
try {
    const { error } = await supabase.auth.signOut();   
} catch (e) {
     throw e;
}
}