"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

/** Floating back-to-top button that appears after scrolling down. */
export default function BackToTop() {
  const t = useTranslations("footer");
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", (v) => setVisible(v > 600)), [scrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          aria-label={t("backToTop")}
          title={t("backToTop")}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          whileHover={{ y: -4 }}
          className="glass fixed bottom-6 left-6 z-[80] flex h-12 w-12 items-center justify-center rounded-full text-accent shadow-glow transition-colors hover:bg-accent-soft">
          <FaArrowUp className="text-lg" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
