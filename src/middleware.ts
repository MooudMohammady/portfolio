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
  return languageMiddleware(request);
}

export const config = {
  matcher: ["/(en|fa)/:path*", "/"],
};
