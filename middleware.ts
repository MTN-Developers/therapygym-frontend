// // // middleware.ts
// // import { NextRequest, NextResponse } from "next/server";

// // export function middleware(req: NextRequest) {
// //   // export function middleware() {
// //   const accessToken = req.cookies.get("access_token")?.value;
// //   const pathname = req.nextUrl.pathname;

// //   if (
// //     !accessToken &&
// //     pathname !== "/login" &&
// //     pathname !== "/register" &&
// //     pathname !== "/reset-password" &&
// //     pathname !== "/request-reset-password"
// //   ) {
// //     const loginUrl = new URL("/login", req.url);
// //     const response = NextResponse.redirect(loginUrl);

// //     // Optionally delete cookies if needed
// //     response.cookies.delete("access_token");
// //     response.cookies.delete("refresh_token");
// //     response.cookies.delete("user");
// //     return response;
// //   }

// //   if (accessToken && (pathname === "/login" || pathname === "/register")) {
// //     const dashboardUrl = new URL("/", req.url);
// //     return NextResponse.redirect(dashboardUrl);
// //   }

// //   // Allow the request to continue
// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: [
// //     "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
// //   ],
// // };

// // export default createMiddleware({
// //   locales: ["en", "ar"],
// //   defaultLocale: "ar",
// // });

// // export const config = {
// //   matcher: ["/", "/(ar|en)/:path*"],
// // };

// import { NextRequest, NextResponse } from "next/server";
// import createMiddleware from "next-intl/middleware";

// // Localization Middleware
// const intlMiddleware = createMiddleware({
//   locales: ["en", "ar"],
//   defaultLocale: "ar",
// });

// export function middleware(req: NextRequest) {
//   const accessToken = req.cookies.get("access_token")?.value;
//   const pathname = req.nextUrl.pathname;

//   // Step 1: Auth Middleware Logic
//   if (
//     !accessToken &&
//     pathname !== "/login" &&
//     pathname !== "/register" &&
//     pathname !== "/reset-password" &&
//     pathname !== "/request-reset-password"
//   ) {
//     const loginUrl = new URL("/login", req.url);
//     const response = NextResponse.redirect(loginUrl);

//     // Optionally delete cookies if needed
//     response.cookies.delete("access_token");
//     response.cookies.delete("refresh_token");
//     response.cookies.delete("user");
//     return response;
//   }

//   if (accessToken && (pathname === "/login" || pathname === "/register")) {
//     const dashboardUrl = new URL("/", req.url);
//     return NextResponse.redirect(dashboardUrl);
//   }

//   // Step 2: Apply Localization Middleware
//   const intlResponse = intlMiddleware(req);
//   if (intlResponse) {
//     return intlResponse; // Return localization response if applicable
//   }

//   // Step 3: Proceed to Next Response if no redirects are needed
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // Match both localization and auth-controlled routes
//     "/",
//     "/(ar|en)/:path*",
//     "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
//   ],
// };

import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

// Localization Middleware
const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "ar",
});

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const pathname = req.nextUrl.pathname;

  // Step 1: Extract Locale from Path
  const locale = pathname.split("/")[1]; // Extract the first part of the path
  const supportedLocales = ["en", "ar"];
  const isLocaleValid = supportedLocales.includes(locale);

  // Step 2: Handle Auth Middleware with Locale Support
  const authRoutes = [
    "login",
    "register",
    "reset-password",
    "request-reset-password",
  ];
  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(`/${locale}/${route}`)
  );

  if (!accessToken && !isAuthRoute && isLocaleValid) {
    const loginUrl = new URL(`/${locale}/login`, req.url);
    const response = NextResponse.redirect(loginUrl);

    // Optionally delete cookies if needed
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    response.cookies.delete("user");
    return response;
  }

  if (
    accessToken &&
    (pathname === `/${locale}/login` || pathname === `/${locale}/register`)
  ) {
    const dashboardUrl = new URL(`/${locale}/`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Step 3: Apply Localization Middleware
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse; // Return localization response if applicable
  }

  // Step 4: Proceed to Next Response if no redirects are needed
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match both localization and auth-controlled routes
    "/",
    "/(ar|en)/:path*",
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
