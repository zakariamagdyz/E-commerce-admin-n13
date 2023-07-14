import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  //request: NextRequestWithAuth
  function middleware() {
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token)
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
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)"],
}
