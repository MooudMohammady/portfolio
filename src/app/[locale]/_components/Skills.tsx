"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import SectionHeading from "@/components/site/SectionHeading";
import { SkillCategory, skills } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = "all" | SkillCategory;

const FILTERS: Filter[] = ["all", "frontend", "backend", "database", "tools"];

export default function Skills() {
  const t = useTranslations("skills");
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="cv-auto scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="03"
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* filter tabs */}
        <div
          role="tablist"
          aria-label={t("label")}
          className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "text-black"
                  : "text-muted hover:text-ink"
              )}>
              {filter === f && (
                <motion.span
                  layoutId="skill-tab"
                  className="absolute inset-0 rounded-xl bg-brand-gradient shadow-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t(`filters.${f}`)}</span>
            </button>
          ))}
        </div>

        {/* skills grid */}
        <motion.ul layout className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 md:gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((skill) => (
              <motion.li
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}>
                <div
                  className={cn(
                    "group flex flex-col items-center gap-2.5 rounded-2xl border border-line bg-card/60 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-glow",
                    skill.core && "border-accent/25"
                  )}>
                  <Image
                    src={skill.image}
                    alt={skill.name}
                    width={44}
                    height={44}
                    draggable={false}
                    className="object-contain transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6"
                  />
                  <span className="whitespace-nowrap text-center text-xs font-semibold text-muted transition-colors group-hover:text-ink">
                    {skill.name}
                  </span>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
