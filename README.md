# Mooud Mohammadi Tabar — Portfolio

Personal portfolio of **Mooud Mohammadi Tabar** — Frontend Engineer & Web Platform Builder.
Live: [webclare.ir](https://webclare.ir)

A cinematic, dark-first, fully animated single-page portfolio with **FA/EN** i18n (RTL/LTR), light/dark themes, and an SEO-complete setup.

## ✨ Features

- **Next.js 14 App Router** with SSG (`/fa`, `/en`) + next-intl
- **Framer Motion everywhere**: staggered reveals, parallax, layout animations, magnetic buttons, 3D tilt cards, custom cursor, scroll progress, cinematic preloader
- **Dark-first design system** (CSS variables, light theme included), Vazirmatn + Space Grotesk + JetBrains Mono variable fonts, film-grain + grid + glow-orb background
- **Sections**: Hero (kinetic typography, role rotator, animated counters) → Tech marquee → About → Services → Skills (filterable) → Projects (filterable + lightbox modal) → Process → Contact (copy-email + socials)
- **Zero heavy deps** — no UI framework; just React + Tailwind + framer-motion

## ⚡ Performance notes

All continuous animation is **transform/opacity-only** (GPU-composited) — nothing repaints gradients or blurs per frame:

- The mouse spotlight is a pre-rendered circle moved with `translate3d` (rAF-throttled), never a CSS-var repaint. Disabled on touch devices.
- Glow orbs, portrait glow, floating badges and the marquee are CSS keyframe transforms with `will-change`.
- The gradient ring behind the portrait is painted once (no `@property` angle animation).
- Scroll reveals animate opacity + translate only — no blur filters.
- Below-fold sections use `content-visibility: auto` for a fast first paint.
- `backdrop-filter` (glass) is limited to small elements / open states.
- Preloader skips for reduced-motion users, repeat visits and automated browsers.
- Test performance against a production build (`bun run build && bun start`) — `next dev` is always noticeably heavier.

## 🔍 SEO checklist

| Item | Where |
| --- | --- |
| Per-locale title/description/keywords | `src/app/[locale]/layout.tsx` (`META`) |
| Canonical + hreflang (`fa`, `en`, `x-default`) | `layout.tsx` → `alternates` |
| Open Graph + Twitter cards with static 1200×630 images | `public/og-fa.png`, `public/og-en.png` |
| JSON-LD (`Person` + `WebSite`) | `layout.tsx` → `buildJsonLd` |
| `robots.txt` / `sitemap.xml` / `manifest` | `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts` |
| Branded 404 | `src/app/not-found.tsx` |
| Semantic HTML, alt texts, aria labels, `prefers-reduced-motion` | all components |

> Replace the placeholder `verification.google` / `verification.yandex` values in `layout.tsx` with real Search Console / Yandex codes.

## 🛠 Development

```bash
bun install
bun run dev      # http://localhost:3000
bun run build    # production build (SSG)
bun run start
```

### Regenerating the OG images

The OG cards are static PNGs rendered from `scripts/og-card-template.html` (run from the repo root so the relative font paths resolve):

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new \
  --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot="public/og-fa.png" "file://$(pwd)/public/_og.html?lang=fa"
```

(Copy `scripts/og-card-template.html` to `public/_og.html` first, then delete it afterwards.)

## 📁 Structure

```
src/
├─ app/
│  ├─ layout.tsx            # pass-through root (for global 404)
│  ├─ not-found.tsx         # branded 404
│  ├─ robots.ts / sitemap.ts / manifest.ts
│  └─ [locale]/
│     ├─ layout.tsx         # SEO metadata + JSON-LD + providers
│     ├─ page.tsx           # section composition
│     ├─ globals.css        # design tokens & utilities
│     └─ _components/       # Navbar, Hero, About, Services, Skills, Projects, Process, Contact, Footer, TechMarquee
├─ components/site/         # reusable animation primitives (Reveal, TiltCard, Magnetic, Counter, Cursor, Preloader, …)
├─ lib/data.ts              # single source of truth for projects/skills/contacts
└─ i18n.ts                  # locales config
messages/                   # fa.json / en.json — all copy lives here
```

## 🌐 Deploying

Static-output friendly (`/fa` & `/en` are prerendered). After deploying, submit `https://webclare.ir/sitemap.xml` in Google Search Console and verify the hreflang tags.
