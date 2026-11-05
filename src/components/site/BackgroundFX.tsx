"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed atmospheric background: grid, glow orbs, film grain and a
 * mouse-following spotlight.
 *
 * Performance notes:
 *  - Everything static here paints once; scrolling never repaints it.
 *  - The spotlight is a pre-rendered radial-gradient circle moved with
 *    a rAF-throttled `transform: translate3d(...)` (GPU-only, no repaint).
 *  - Orbs animate transform-only via CSS keyframes with will-change.
 *  - Disabled for touch devices and reduced-motion users.
 */
export default function BackgroundFX() {
  const spotRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (!fine || reduced || !spotRef.current) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (!spotRef.current) return;
        // translate so the circle is centered on the cursor
        spotRef.current.style.transform = `translate3d(${e.clientX - 350}px, ${
          e.clientY - 350
        }px, 0)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    // fade the spotlight in only when it is actually active
    if (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      spotRef.current?.style.setProperty("opacity", "1");
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* static painted-once layers */}
      <div className="bg-grid absolute inset-0 mask-fade-b" />
      <div className="bg-noise absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(0_0_0/0.25))] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.55))]" />

      {/* two transform-only animated orbs (GPU) */}
      <div className="orb-anim absolute -top-32 left-[8%] h-[440px] w-[440px] rounded-full bg-accent/15 blur-[100px] will-change-transform" />
      <div
        className="orb-anim-2 absolute top-[40%] -right-32 h-[480px] w-[480px] rounded-full bg-accent2/15 blur-[110px] will-change-transform"
      />

      {/* mouse spotlight — transform-only follower */}
      <div
        ref={spotRef}
        className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full opacity-0 will-change-transform [background:radial-gradient(circle,rgb(245_158_11/0.07)_0%,transparent_60%)]"
      />
    </div>
  );
}
