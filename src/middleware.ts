import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";
import { getToken } from "next-auth/jwt";

let languageMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // Used when no locale matches
  defaultLocale: "fa",
  // Auto detect language
  localeDetection: true,
  // Used to make the default lang as root
  // localePrefix: "as-needed",
});

export async function middleware(request: NextRequest) {
  const loginPage = "/auth/sign-in";
  const protectedPaths = ["/admin", "/api/upload"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const token = await getToken({ req: request });

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = loginPage;
      return NextResponse.redirect(url);
    }

    // بررسی نقش کاربر
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      token.role !== "admin"
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return languageMiddleware(request);
}

export const config = {
  matcher: ["/(en|fa)/:path*", "/"],
};
