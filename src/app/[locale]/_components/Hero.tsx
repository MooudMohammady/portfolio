"use client";

import Counter from "@/components/site/Counter";
import Magnetic from "@/components/site/Magnetic";
import { stats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaArrowDown, FaDownload } from "react-icons/fa6";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------- typing role rotator --------------------- */

function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2600
    );
    return () => window.clearInterval(id);
  }, [roles.length]);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: EASE }}
          className="inline-block text-gradient">
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ------------------------------ hero ------------------------------- */

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* subtle scroll parallax for the portrait */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

  const nameA = t("nameA");
  const nameB = t("nameB");
  const roles = t.raw("roles") as string[];
  const statLabels = t.raw("statsLabels") as string[];
  const resumeHref = locale === "fa" ? "/resume-fa.pdf" : "/resume-en.pdf";

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[min(100svh,1100px)] flex-col justify-center overflow-hidden pb-16 pt-32 md:pt-36">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* ------------------------------ left ------------------------------ */}
        <div className="flex flex-col items-start gap-6 text-start">
          {/* status pill — translucent solid (no backdrop blur) */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-4 py-2 text-xs font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t("status")}
          </motion.div>

          {/* greeting */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            className="font-mono text-sm tracking-widest text-muted md:text-base">
            {"// "}
            {t("greeting")}
          </motion.p>

          {/* name — the H1 */}
          <h1 className="flex flex-col text-5xl font-black leading-[1.05] md:text-7xl lg:text-8xl">
            {[nameA, nameB].map((part, line) => (
              <span key={part} className="overflow-hidden pb-1">
                <motion.span
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.35 + line * 0.12 }}
                  className={cn(
                    "block",
                    line === 1 && "text-gradient drop-shadow-[0_0_35px_var(--accent-glow)]"
                  )}>
                  {part}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* rotating role */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
            className="text-xl font-bold md:text-2xl">
            {t("rolePrefix")} <RoleRotator roles={roles} />
          </motion.p>

          {/* description */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
            className="max-w-xl leading-relaxed text-muted md:text-lg">
            {t("description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.95 }}
            className="mt-2 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group flex items-center gap-3 rounded-2xl bg-brand-gradient px-7 py-4 text-sm font-bold text-black shadow-glow transition-all hover:shadow-[0_0_60px_-10px_var(--accent-glow)] active:scale-95">
                {t("ctaProjects")}
                <FaArrowDown className="text-xs transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={resumeHref}
                download
                className="glass group flex items-center gap-3 rounded-2xl px-7 py-4 text-sm font-bold text-ink transition-all hover:border-accent/50 hover:text-accent active:scale-95">
                <FaDownload className="text-xs transition-transform duration-300 group-hover:translate-y-1" />
                {t("ctaResume")}
              </a>
            </Magnetic>
          </motion.div>

          {/* stats */}
          <motion.dl
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.1 }}
            className="mt-6 flex items-stretch gap-6 md:gap-10">
            {stats.map((s, i) => (
              <div
                key={i}
                className={cn(
                  "flex flex-col gap-1",
                  i > 0 && "border-s border-line ps-6 md:ps-10"
                )}>
                <dd className="text-3xl font-black text-ink md:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="text-xs text-muted md:text-sm">
                  {statLabels[i]}
                </dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ------------------------------ right ------------------------------ */}
        <motion.div
          style={reduced ? undefined : { y: portraitY, rotate: portraitRotate }}
          className="relative mx-auto hidden w-full max-w-md sm:block lg:max-w-none">
        {/* rotating circular name — CSS transform animation (GPU) */}
        <div
          aria-hidden="true"
          className="animate-spin-slower absolute inset-[-14%] flex items-center justify-center will-change-transform">
          <Image
            src="/images/circular-name.png"
            alt=""
            width={620}
            height={620}
            priority
            draggable={false}
            className="w-full max-w-none opacity-25 dark:opacity-20"
          />
        </div>

        {/* rotating gradient glow behind the portrait (transform-only) */}
        <div
          aria-hidden="true"
          className="spin-glow absolute inset-6 rounded-[3rem] will-change-transform"
          style={{
            background:
              "conic-gradient(from 90deg, rgb(245 158 11 / 0.28), rgb(139 92 246 / 0.28), transparent 55%, rgb(245 158 11 / 0.28))",
            filter: "blur(48px)",
          }}
        />

          {/* portrait with gradient ring */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.5 }}
            className="gradient-ring relative mx-auto aspect-square w-[78%] rounded-[2.5rem] p-[3px] shadow-card">
            <div className="relative h-full w-full overflow-hidden rounded-[calc(2.5rem-3px)] bg-surface">
              <Image
                src="/6bd370c5-2500-4223-ad7b-ed54d05f129c.png"
                alt="'Mooud Mohammadi Tabar', 'موعود محمدی تبار' — Frontend Engineer"
                fill
                priority
                sizes="(min-width: 1024px) 34vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* floating tech badges — solid cards (no backdrop blur), transform-only float */}
          {[
            { src: "/images/react.png", alt: "React.js", cls: "-left-2 top-[12%]", anim: "animate-float" },
            { src: "/images/next.png", alt: "Next.js", cls: "-right-3 top-[38%]", anim: "animate-float-delayed" },
            { src: "/images/ts.png", alt: "TypeScript", cls: "bottom-[10%] left-[10%]", anim: "animate-float-slow" },
          ].map((b, i) => (
            <motion.div
              key={b.alt}
              initial={reduced ? false : { opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.2 + i * 0.15 }}
              className={cn("absolute z-10", b.cls)}>
              <div
                className={cn(
                  "flex items-center justify-center rounded-2xl border border-line bg-surface/90 p-3.5 shadow-card",
                  b.anim,
                  "will-change-transform"
                )}>
                <Image src={b.src} alt={b.alt} width={34} height={34} className="object-contain" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label={t("scroll")}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent md:flex">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
          {t("scroll")}
        </span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-current p-1.5">
          <motion.span
            animate={reduced ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-current"
          />
        </span>
      </motion.a>
    </section>
  );
}
