"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Scroll reveal with a soft blur-in effect, built on a tiny
 * IntersectionObserver + CSS transition.
 *
 * Resilience guarantees:
 *  - without JS  -> content is fully visible (the `anim` html class is
 *                    only added by an inline script)
 *  - reduced motion -> content is fully visible (media query in CSS)
 *  - no IntersectionObserver -> content is fully visible
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("reveal-in");
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
