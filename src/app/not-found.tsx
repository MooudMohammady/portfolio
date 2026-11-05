/**
 * Global 404 — rendered outside the [locale] layout, so it renders
 * its own minimal HTML shell with bilingual content.
 */
export default function NotFound() {
  return (
    <html lang="en" dir="ltr" className="dark">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          backgroundColor: "#07070c",
          color: "#f4f4f5",
          fontFamily:
            "'Space Grotesk', 'Vazirmatn', ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
          padding: 24,
        }}>
        <p
          style={{
            margin: 0,
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1,
            backgroundImage:
              "linear-gradient(120deg, #f59e0b, #fb923c, #8b5cf6)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}>
          404
        </p>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
          Page not found
        </h1>
        <p style={{ margin: 0, fontSize: 18, color: "#a1a1aa" }}>
          صفحه‌ای که دنبالش بودی پیدا نشد.
        </p>
        <a
          href="/fa"
          style={{
            marginTop: 12,
            display: "inline-block",
            padding: "14px 32px",
            borderRadius: 16,
            backgroundImage:
              "linear-gradient(120deg, #f59e0b, #fb923c, #8b5cf6)",
            color: "#000",
            fontWeight: 700,
            textDecoration: "none",
          }}>
          Back to home — بازگشت به خانه
        </a>
      </body>
    </html>
  );
}
