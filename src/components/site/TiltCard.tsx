"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactNode, useRef } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * 3D tilt-on-hover card with a moving glare highlight.
 * The glare is a fixed-size pre-rendered gradient circle that follows the
 * cursor via transform (GPU-only) — no per-move background repaint.
 * Falls back to a static card on touch devices.
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 180,
    damping: 20,
  });

  /* glare circle: 320px, centered on the pointer via translate */
  const glareX = useSpring(useTransform(px, [0, 1], [-160, 160]), {
    stiffness: 120,
    damping: 20,
  });
  const glareY = useSpring(useTransform(py, [0, 1], [-160, 160]), {
    stiffness: 120,
    damping: 20,
  });
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => glareOpacity.set(1)}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group/tilt relative [perspective:1000px] ${className ?? ""}`}>
      {children}
      {/* moving glare — transform-only follower */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -ml-[160px] -mt-[160px] h-[320px] w-[320px] rounded-full will-change-transform"
        style={{
          x: glareX,
          y: glareY,
          opacity: glareOpacity,
          background:
            "radial-gradient(circle, rgb(255 255 255 / 0.09) 0%, transparent 65%)",
        }}
      />
    </motion.div>
  );
}
