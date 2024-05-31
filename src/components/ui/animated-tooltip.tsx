"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    title: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="relative group"
          key={item.title}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-10 -right-2 flex text-xs flex-col items-center justify-center rounded-md bg-white dark:bg-gray-700 z-50 shadow-xl px-4 py-2">
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                <div className="font-bold relative z-30 text-base">
                  {item.title}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <li className="dark:bg-gray-500/20 bg-white shadow-md dark:border border-gray-500/40 rounded-md flex justify-center items-center p-4 text-xl">
            <Image
              onMouseMove={handleMouseMove}
              height={50}
              width={50}
              src={`/images/${item.image}`}
              alt={item.title}
              className="!m-0 !p-0 group-hover:scale-105 relative transition duration-500 w-7 aspect-square object-contain select-none"
              draggable="false"
            />
          </li>
        </div>
      ))}
    </>
  );
};
