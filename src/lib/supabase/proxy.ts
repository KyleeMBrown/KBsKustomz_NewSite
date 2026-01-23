import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { whitelistColumns } from '../helpers'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims()

  const user = data?.claims
  const role: string = user?.user_metadata?.user_role
  const email: string = user?.email

    // TODO: uncomment out the below 
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/auth/private/login'
    console.log("not authorized")
    return NextResponse.redirect(url)
  }

  /*
  *  RBA SECURITY CHECK on route create a user tab in dashboard
 */

  // if the user is trying to request the create a user page and is NOT ADMIN role and is not the MASTER_EMAIL
  if (request.nextUrl.pathname.startsWith('/dashboard/users/create') && role !== "ADMIN") {
    // redirect the user to the unauthorized page
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard/unauthorized'
    console.log("not authorized")
    return NextResponse.redirect(url)
  }

  /*
  *  Whitelist column SECURITY CHECK on route create a user tab in dashboard
 */
  
  // if the user is trying to create a user using the local api (/api)
  if (request.nextUrl.pathname.startsWith('/api/user')) {
    // switch statement for request methods
    switch (request.method) {
      // if the method is POST
      case "POST":
        // request the data
        const data = await request.json();
        //create the array of allowed coluymns
        const allowed: string[] = ["first_name", "last_name", "email", "password", "role", "created_by"]

        // if the requested columns are NOT allowed
        if (!whitelistColumns(allowed, data)) {
          // return an error message with code:400
         return NextResponse.json({message:"Error unauthorized"}, {status: 400})
        }
    }
  }
  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}