import { cn } from "@/lib/utils";
import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "webclare | موعود محمدی تبار | Mooud Mohammdi",
  description:
    "من موعود محمدی تبار با 2 سال سابقه کاری به صورت فول استک  در توسعه وب هستم که تخصصم پیاده سازی انواع پلتفرم های پیچیده هستش.",
  keywords: [
    "موعود محمدی تبار",
    "موعود محمدی",
    "mooudmohammadi",
    "webclare",
    "mooud mohammadi",
    "mooud mohammady",
  ],
  robots:
    "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
  openGraph: {
    images: "https://webclare.ir/photo.jpg",
    locale: "fa_IR",
    type: "website",
    title: "webclare | موعود محمدی تبار",
    description:
      "من موعود محمدی تبار با 2 سال سابقه کاری به صورت فول استک  در توسعه وب هستم که تخصصم پیاده سازی انواع پلتفرم های پیچیده هستش.",
    siteName: "webclare | موعود محمدی تبار",
  },
  metadataBase: new URL("https://webclare.ir"),
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["my-email", "my-link"],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body
        className={cn(
          "dark:bg-[#23252E] bg-gray-50 dark:text-gray-100 text-gray-800 overflow-x-hidden font-yekan"
        )}>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
