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
    "videos-list",
    "login",
    "register",
    "reset-password",
    "request-reset-password",
  ];

  // Check if the current path is the payment route that should be accessible without login
  // This pattern now accounts for the locale prefix
  const isPaymentRoute = pathname.match(
    /\/(en|ar)\/out-pay\/course\/.*\/payment\/.*/
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(`/${locale}/${route}`)
  );

  console.log("Path:", pathname);
  console.log("Is payment route:", !!isPaymentRoute);

  // Only redirect to login if:
  // 1. User is not authenticated AND
  // 2. Not on an auth route AND
  // 3. Not on the payment route AND
  // 4. The locale is valid
  if (!accessToken && !isAuthRoute && !isPaymentRoute && isLocaleValid) {
    console.log("Redirecting to login page");
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

    const redirectURL =
      req.nextUrl.pathname == `/${locale}`
        ? `/${locale}/login`
        : `/login?redirect=${pathnameWithoutLocale}`;
    const response = NextResponse.redirect(new URL(redirectURL, req.url));

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
