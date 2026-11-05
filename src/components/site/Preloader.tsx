"use client";

import { AnimatePresence, animate, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const SESSION_KEY = "mm-preloaded";

/**
 * Cinematic one-time preloader: name reveal + progress counter,
 * then a curtain slide-up. Shows once per session and is skipped
 * entirely for reduced-motion users, repeat visits and automated
 * browsers/crawlers.
 *
 * The name animates word-by-word (not letter-by-letter) to preserve
 * Persian/Arabic letter shaping.
 */
export default function Preloader() {
  const t = useTranslations("preloader");
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // skip for reduced-motion users, repeat visits and automated browsers/crawlers
    if (
      reduced ||
      sessionStorage.getItem(SESSION_KEY) ||
      (navigator as Navigator & { webdriver?: boolean }).webdriver
    )
      return;

    setVisible(true);
    document.body.style.overflow = "hidden";

    const controls = animate(0, 100, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
        window.setTimeout(() => setVisible(false), 250);
      },
    });
    return () => {
      controls.stop();
      document.body.style.overflow = "";
    };
  }, [reduced]);

  const words = (t("name") as string).split(" ");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-8 bg-bg"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
          {/* name words */}
          <div dir="auto" className="flex gap-x-4 text-3xl md:text-5xl font-extrabold">
            {words.map((word, i) => (
              <span key={i} className="overflow-hidden py-1">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.15 + i * 0.12,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`block ${i % 2 === 1 ? "text-gradient" : ""}`}>
                  {word}
                </motion.span>
              </span>
            ))}
          </div>

          {/* progress */}
          <div className="flex w-56 flex-col items-center gap-3">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full bg-brand-gradient"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex w-full items-center justify-between font-mono text-xs text-muted">
              <span>{t("loading")}</span>
              <span dir="ltr" className="text-accent">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
