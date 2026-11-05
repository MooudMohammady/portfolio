"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDownload, FaMoon, FaSun } from "react-icons/fa6";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Magnetic from "@/components/site/Magnetic";

const SECTIONS = [
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "skills", key: "skills" },
  { id: "projects", key: "projects" },
  { id: "process", key: "process" },
  { id: "contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  /* theme sync */
  useEffect(() => {
    const update = () =>
      setMode(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  /* lock scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* active section tracking */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleColorMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  const toggleLanguage = () => {
    router.push(locale === "fa" ? "/en" : "/fa");
  };

  const resumeHref =
    locale === "fa" ? "/resume-fa.pdf" : "/resume-en.pdf";

  const linkCls = (id: string) =>
    `relative px-1 py-2 text-sm font-medium transition-colors ${
      active === id ? "text-accent" : "text-muted hover:text-ink"
    }`;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-[70] px-4 pt-4">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6 ${
            scrolled ? "glass shadow-card" : "border border-transparent"
          }`}>
          {/* logo */}
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="Mooud Mohammadi Tabar">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient font-mono text-lg font-bold text-black shadow-glow transition-transform duration-300 group-hover:rotate-6">
              M
              <span className="absolute inset-0 rounded-xl border border-white/20" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-bold">
                {locale === "fa" ? "موعود محمدی تبار" : "Mooud Mohammadi"}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted">
                webclare.ir
              </span>
            </span>
          </a>

          {/* desktop links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {SECTIONS.map(({ id, key }) => (
              <li key={id}>
                <a href={`#${id}`} className={linkCls(id)}>
                  {t(key)}
                  {active === id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand-gradient"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleColorMode}
              aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-muted transition-all hover:border-accent/50 hover:text-accent">
              {mode === "dark" ? <FaSun className="text-base" /> : <FaMoon className="text-base" />}
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Switch language"
              className="flex h-10 items-center justify-center rounded-xl border border-line px-3 font-mono text-xs font-bold uppercase text-muted transition-all hover:border-accent/50 hover:text-accent">
              {locale === "fa" ? "EN" : "فا"}
            </button>

            <Magnetic className="hidden lg:block" strength={0.25}>
              <a
                href={resumeHref}
                download
                className="flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-bold text-black shadow-glow transition-transform hover:scale-[1.03] active:scale-95">
                <FaDownload className="text-xs" />
                {t("resume")}
              </a>
            </Magnetic>

            {/* burger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink lg:hidden">
              <HiBars3 className="text-xl" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 6%)" }}
            animate={{ opacity: 1, clipPath: "circle(140% at 90% 6%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 6%)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[85] flex flex-col bg-bg/95 backdrop-blur-2xl lg:hidden">
            <div className="flex items-center justify-between p-6">
              <span className="font-mono text-sm tracking-widest text-muted">
                webclare.ir
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-ink">
                <HiXMark className="text-2xl" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-8">
              {SECTIONS.map(({ id, key }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.45 }}
                  className="group flex items-baseline gap-4 py-3 text-3xl font-extrabold text-ink transition-colors hover:text-accent">
                  <span className="font-mono text-sm text-accent">
                    0{i + 1}
                  </span>
                  {t(key)}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-3 p-8">
              <a
                href={resumeHref}
                download
                className="flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-bold text-black">
                <FaDownload />
                {t("resume")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
