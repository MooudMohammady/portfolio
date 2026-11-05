import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  // Used when no locale matches
  defaultLocale: "fa",
  // Auto detect language
  localeDetection: true,
});

export const config = {
  matcher: ["/(en|fa)/:path*", "/"],
};
