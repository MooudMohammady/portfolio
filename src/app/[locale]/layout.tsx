import { cn } from "@/lib/utils";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { useLocale } from "next-intl";
import AppProvider from "@/lib/AppProvider";
import { notFound } from "next/navigation";

export function generateMetadata({
  params,
}: {
  params: { locale: "fa" | "en" };
}): Metadata {
  return params.locale === "fa"
    ? {
        title: "webclare | موعود محمدی تبار",
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
          images: "https://webclare.ir/photo_2024-06-03_10-29-54.jpg",
          locale: "fa_IR",
          type: "website",
          title: "webclare | موعود محمدی تبار",
          description:
            "من موعود محمدی تبار با 2 سال سابقه کاری به صورت فول استک  در توسعه وب هستم که تخصصم پیاده سازی انواع پلتفرم های پیچیده هستش.",
          siteName: "webclare | موعود محمدی تبار",
        },
        metadataBase: new URL("https://webclare.ir"),
        verification: {
          google: "google",
          yandex: "yandex",
          yahoo: "yahoo",
          other: {
            me: ["my-email", "mooudmohammadi@gmail.com"],
          },
        },
      }
    : {
        title: "webclare | Mooud Mohammdi tabar",
        description:
          "I am Mooud Mohammadi Tabar with 2 years of fullstack work experience in web development, which is the expertise of implementing a variety of complex & large-scale platforms.",
        keywords: [
          "mooudmohammadi",
          "webclare",
          "mooud mohammadi",
          "mooud mohammady",
        ],
        robots:
          "index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
        openGraph: {
          images: "https://webclare.ir/photo_2024-06-03_10-29-54.jpg",
          locale: "en",
          type: "website",
          title: "webclare | Mooud Mohammadi Tabar",
          description:
            "I am Mooud Mohammadi Tabar with 2 years of fullstack work experience in web development, which is the expertise of implementing a variety of complex & large-scale platforms.",
          siteName: "webclare | Mooud Mohammadi Tabar",
        },
        metadataBase: new URL("https://webclare.ir"),
        verification: {
          google: "google",
          yandex: "yandex",
          yahoo: "yahoo",
          other: {
            me: ["my-email", "mooudmohammadi@gmail.com"],
          },
        },
      };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html
      lang={locale === "fa" ? "fa-IR" : "en"}
      dir={locale === "fa" ? "rtl" : "ltr"}>
      <body
        className={cn(
          "dark:bg-[#23252E] bg-gray-50 dark:text-gray-100 text-gray-800 overflow-x-hidden",
          locale === "fa" ? "font-yekan" : "font-sans"
        )}>
        <ThemeProvider attribute="class">
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
