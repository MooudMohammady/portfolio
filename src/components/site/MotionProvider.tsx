"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/** Client boundary for MotionConfig — respects the OS reduced-motion setting. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
