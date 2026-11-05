/**
 * Pass-through root layout.
 * The real <html>/<body> lives in [locale]/layout.tsx so each locale
 * gets its own lang/dir. This file exists so global not-found works.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
