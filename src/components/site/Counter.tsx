"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Animated number counter that starts when it enters the viewport. */
export default function Counter({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const locale = useLocale();

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  const formatted = display.toLocaleString(
    locale === "fa" ? "fa-IR" : "en-US"
  );

  return (
    <span ref={ref} className={className} dir="ltr">
      {formatted}
      {suffix}
    </span>
  );
}
