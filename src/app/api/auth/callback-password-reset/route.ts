/********************************************************************/
/************* Callback Func that handles password reset *************/

import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { notFound } from "next/navigation";




export async function GET(request: Request) { 
    const supabase = await createClient()
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event == "PASSWORD_RECOVERY") {
         const { origin } = new URL(request.url)
        const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
        const isLocalEnv = process.env.NODE_ENV === 'development'
        if (isLocalEnv) {
            // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
            return NextResponse.redirect(`${origin}/auth/private/update-password`)
        } else if (forwardedHost) {
            return NextResponse.redirect(`https://${forwardedHost}/auth/private/update-password`)
        } else {
            return NextResponse.redirect(`${origin}/auth/private/update-password`)
        }
     } else {
        return new NextResponse("Not Found", { status: 404 });
     }
   })
}