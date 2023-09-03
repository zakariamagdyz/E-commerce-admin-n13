import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

/* 
In middlwware you can:
- Redirect to a different page: exa (redirect to login page if not logged in)
- Rewrite the URL: exa (redirect to a denied page with the same URL)
- Return a different response (exa: return a 403 for non authunticated users)
- Modify the response and continue to the next middleware  (exa: add a header for cors)
- Throw an error to return a 500 status code (exa: throw new Error("Something went wrong"))

*/

// const allowedOrigins =
//   process.env.NODE_ENV === "production" ? [process.env.NEXT_PUBLIC_FRONTEND_STORE_URL] : ["http://localhost:3000"]

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  //request: NextRequestWithAuth
  function middleware() {
    // const origin = request.headers.get("origin")

    // if (origin && !allowedOrigins.includes(origin)) {
    //   return new NextResponse(null, { status: 403, statusText: "Forbidden", headers: { "Content-Type": "text/html" } })
    // }

    // if (
    //   request.nextUrl.pathname.startsWith("/extra") &&
    //   request.nextauth.token?.role !== "admin"
    // ) {
    //   return NextResponse.rewrite(new URL("/denied", request.url));
    // }
    // if (
    //   request.nextUrl.pathname.startsWith("/client") &&
    //   request.nextauth.token?.role !== "admin" &&
    //   request.nextauth.token?.role !== "manager"
    // ) {
    //   console.log(new URL("/denied", request.url).href);
    //   return NextResponse.rewrite(new URL("/denied", request.url));
    // }
    // const url = new URL(request.url)
    // if (!request.nextauth.token) {
    //   console.log({ hola: url.pathname })
    //   // redirect to login page with callback URL
    //   return NextResponse.redirect("/signin?callbackUrl=" + url.pathname)
    // }
    return NextResponse.next({ headers: corsHeaders })
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)'],
}
