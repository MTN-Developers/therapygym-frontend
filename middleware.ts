// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const pathname = req.nextUrl.pathname;

  if (!accessToken && pathname !== "/login" && pathname !== "/register") {
    const loginUrl = new URL("/login", req.url);
    const response = NextResponse.redirect(loginUrl);

    // Optionally delete cookies if needed
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    response.cookies.delete("user");
    return response;
  }

  if (accessToken && (pathname === "/login" || pathname === "/register")) {
    const dashboardUrl = new URL("/", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
