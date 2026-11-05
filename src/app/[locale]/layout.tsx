import { cn } from "@/lib/utils";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";
import AppProvider from "@/lib/AppProvider";
import Cursor from "@/components/site/Cursor";
import Preloader from "@/components/site/Preloader";
import ScrollProgress from "@/components/site/ScrollProgress";
import BackgroundFX from "@/components/site/BackgroundFX";
import BackToTop from "@/components/site/BackToTop";
import { EMAIL, PERSON_NAME, SITE_URL, contacts, skills } from "@/lib/data";

import { locales, type Locale } from "@/i18n";

/* ------------------------------------------------------------------ */
/*  Static generation per locale                                       */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/* ------------------------------------------------------------------ */
/*  SEO metadata                                                       */
/* ------------------------------------------------------------------ */

const META = {
  fa: {
    title: "موعود محمدی تبار | مهندس فرانت‌اند و سازنده پلتفرم‌های وب هوشمند",
    description:
      "موعود محمدی تبار — مهندس نرم‌افزار با بیش از ۴ سال تجربه در توسعه فرانت‌اند با React و Next.js، معماری سیستم و ساخت پلتفرم‌های پیچیده سازمانی و محصولات مبتنی بر هوش مصنوعی.",
    siteName: "موعود محمدی تبار | WebClare",
    locale: "fa_IR",
    altLocale: "en_US",
  },
  en: {
    title: "Mooud Mohammadi Tabar | Frontend Engineer & Web Platform Builder",
    description:
      "Mooud Mohammadi Tabar — Software engineer with 4+ years of experience building complex web platforms with React, Next.js and TypeScript: system architecture, enterprise products and AI-powered experiences.",
    siteName: "Mooud Mohammadi Tabar | WebClare",
    locale: "en_US",
    altLocale: "fa_IR",
  },
} as const;

const KEYWORDS = [
  "موعود محمدی تبار",
  "موعود محمدی",
  "mooud mohammadi",
  "mooud mohammadi tabar",
  "mooudmohammadi",
  "webclare",
  "webclare.ir",
  "frontend developer iran",
  "react developer",
  "next.js developer",
  "frontend engineer",
  "fullstack developer",
  "برنامه نویس فرانت اند",
  "طراح وب",
  "توسعه دهنده ریکت",
];

export async function generateMetadata({
  params,
}: {
  params: { locale: (typeof locales)[number] };
}): Promise<Metadata> {
  const { locale } = params;
  const m = META[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: m.title,
    description: m.description,
    keywords: KEYWORDS,
    authors: [{ name: PERSON_NAME, url: SITE_URL }],
    creator: PERSON_NAME,
    publisher: PERSON_NAME,
    applicationName: "webclare.ir",
    formatDetection: { telephone: false, email: false, address: false },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        fa: `${SITE_URL}/fa`,
        en: `${SITE_URL}/en`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      siteName: m.siteName,
      title: m.title,
      description: m.description,
      locale: m.locale,
      alternateLocale: m.altLocale,
      images: [
        {
          url: locale === "fa" ? "/og-fa.png" : "/og-en.png",
          width: 1200,
          height: 630,
          alt: m.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [locale === "fa" ? "/og-fa.png" : "/og-en.png"],
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "google",
      yandex: "yandex",
      other: {
        me: [EMAIL],
      },
    },
    category: "technology",
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#07070c" },
  ],
  colorScheme: "dark light",
};

/* ------------------------------------------------------------------ */
/*  JSON-LD structured data                                            */
/* ------------------------------------------------------------------ */

function buildJsonLd(locale: string, title: string, description: string) {
  const sameAs = contacts
    .filter((c) => c.key !== "email")
    .map((c) => c.url);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSON_NAME,
        alternateName: "موعود محمدی تبار",
        url: SITE_URL,
        email: `mailto:${EMAIL}`,
        jobTitle:
          locale === "fa"
            ? "مهندس فرانت‌اند و توسعه‌دهنده فول‌استک"
            : "Frontend Engineer & Fullstack Developer",
        image: `${SITE_URL}/photo_2024-06-03_10-29-54.jpg`,
        description,
        sameAs,
        knowsAbout: skills.map((s) => s.name),
        knowsLanguage: ["fa", "en"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: title,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Root layout                                                        */
/* ------------------------------------------------------------------ */

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!(locales as readonly string[]).includes(params.locale)) notFound();
  const locale = params.locale as Locale;
  unstable_setRequestLocale(locale);

  const m = META[locale];
  const jsonLd = buildJsonLd(locale, m.title, m.description);

  return (
    <html
      lang={params.locale}
      dir={params.locale === "fa" ? "rtl" : "ltr"}
      className="dark"
      suppressHydrationWarning>
      <body
        className={cn(
          "bg-bg text-ink overflow-x-clip",
          params.locale === "fa" ? "" : "antialiased"
        )}>
        {/* Enable scroll-reveal animations only when safe: JS present,
            IntersectionObserver available and no reduced-motion request. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)document.documentElement.classList.add('anim')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange>
          <AppProvider>
            <Preloader />
            <Cursor />
            <ScrollProgress />
            <BackgroundFX />
            {children}
            <BackToTop />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
