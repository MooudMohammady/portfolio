"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { IoOpenOutline } from "react-icons/io5";
import SectionHeading from "@/components/site/SectionHeading";
import { Project, ProjectCategory, projects, techColors } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const FILTERS: Filter[] = ["all", "fullstack", "frontend", "desktop"];

const STATUS_STYLES: Record<Project["status"], string> = {
  completed: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  "in-progress": "bg-amber-500/15 text-amber-500 border-amber-500/30",
  paused: "bg-zinc-500/15 text-zinc-400 border-zinc-500/30",
};

/* ------------------------------ card ------------------------------- */

function ProjectCard({
  project,
  onOpen,
  index,
}: {
  project: Project;
  onOpen: () => void;
  index: number;
}) {
  const t = useTranslations("projects");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border border-line bg-card/70 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-glow",
        project.featured && "lg:col-span-2"
      )}>
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-surface/70 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span
          dir="ltr"
          className="ms-2 truncate rounded-md bg-ink/5 px-2.5 py-0.5 font-mono text-[10px] text-muted">
          {project.slug}.webclare.ir
        </span>
        <span
          className={cn(
            "ms-auto shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold",
            STATUS_STYLES[project.status]
          )}>
          {t(`status.${project.status}`)}
        </span>
      </div>

      {/* screenshot */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={t("details")}
        className="relative block w-full overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={`${project.title} — ${t(`descriptions.${project.slug}`)}`}
          width={1200}
          height={750}
          sizes="(min-width: 1024px) 33vw, 100vw"
          loading={index < 3 ? "eager" : "lazy"}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-bold text-black shadow-glow">
            <IoOpenOutline />
            {t("details")}
          </span>
        </span>
      </button>

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 dir="ltr" className="text-start font-bold leading-snug">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {t(`descriptions.${project.slug}`)}
        </p>

        <ul className="flex flex-wrap gap-1.5" dir="ltr">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className={cn(
                "rounded-md px-2 py-1 font-mono text-[10px] font-semibold",
                techColors[tech] ?? "bg-ink/10 text-ink"
              )}>
              {tech}
            </li>
          ))}
        </ul>

        {/* progress */}
        <div className="mt-auto flex items-center gap-3 pt-2">
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10"
            role="progressbar"
            aria-valuenow={project.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t("progress")}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="h-full rounded-full bg-brand-gradient"
            />
          </div>
          <span dir="ltr" className="font-mono text-xs font-bold text-accent">
            {project.progress}%
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------ modal ------------------------------ */

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const t = useTranslations("projects");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      key="project-modal"
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.94 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="glass relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl shadow-card">
        {/* header */}
        <div className="flex items-center gap-2 border-b border-line bg-surface/80 px-5 py-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </span>
          <span
            dir="ltr"
            className="ms-2 truncate rounded-md bg-ink/5 px-3 py-1 font-mono text-xs text-muted">
            {project.slug}.webclare.ir
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ms-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent/50 hover:text-accent">
            <HiXMark className="text-lg" />
          </button>
        </div>

        {/* content */}
        <div className="overflow-y-auto">
          <Image
            src={project.thumbnail}
            alt={`${project.title} — ${t(`descriptions.${project.slug}`)}`}
            width={1600}
            height={1000}
            className="aspect-[16/10] w-full object-cover object-top"
          />
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h3 dir="ltr" className="text-start text-2xl font-black">
                {project.title}
              </h3>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold",
                  STATUS_STYLES[project.status]
                )}>
                {t(`status.${project.status}`)}
              </span>
            </div>
            <p className="leading-relaxed text-muted md:text-lg">
              {t(`descriptions.${project.slug}`)}
            </p>

            <div className="flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                  className="h-full rounded-full bg-brand-gradient"
                />
              </div>
              <span dir="ltr" className="font-mono text-sm font-bold text-accent">
                {project.progress}%
              </span>
            </div>

            <ul className="flex flex-wrap gap-2" dir="ltr">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className={cn(
                    "rounded-lg px-3 py-1.5 font-mono text-xs font-semibold",
                    techColors[tech] ?? "bg-ink/10 text-ink"
                  )}>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ----------------------------- section ----------------------------- */

export default function Projects() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="cv-auto scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="05"
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* filters */}
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
                filter === f ? "text-black" : "text-muted hover:text-ink"
              )}>
              {filter === f && (
                <motion.span
                  layoutId="project-tab"
                  className="absolute inset-0 rounded-xl bg-brand-gradient shadow-glow"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t(`filters.${f}`)}</span>
            </button>
          ))}
        </div>

        {/* grid */}
        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                onOpen={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
