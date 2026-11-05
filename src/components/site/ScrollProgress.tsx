"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useLocale } from "next-intl";

/** Thin gradient progress bar fixed to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });
  const locale = useLocale();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-top bg-brand-gradient"
      style={{
        scaleX,
        transformOrigin: locale === "fa" ? "right" : "left",
      }}
    />
  );
}
