import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Define public routes that don't require authentication
    const publicPaths = ["/login", "/register"];

    // Check if the path is public
    const isPublicPath = publicPaths.includes(pathname);

    // If the user is not authenticated and the path is not public, redirect to /login
    if (!token && !isPublicPath) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If the user is authenticated or the path is public, allow the request to proceed
  },
  {
    callbacks: {
      authorized: () => true, // Allow all requests, we'll handle authorization in the middleware
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
