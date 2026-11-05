import { skills } from "@/lib/data";
import Image from "next/image";

/**
 * Infinite marquee of the core tech stack between hero and about.
 * Content is duplicated (second copy aria-hidden) for a seamless loop.
 */
export default function TechMarquee() {
  const core = skills.filter((s) => s.core);
  const doubled = [...core, ...core];

  return (
    <div
      dir="ltr"
      aria-label="Core technologies"
      className="group relative overflow-hidden border-y border-line bg-surface/40 py-6 backdrop-blur-sm">
      <div className="mask-fade-x flex">
        <div className="animate-marquee flex w-max shrink-0 items-center gap-14 pe-14 will-change-transform group-hover:[animation-play-state:paused]">
          {doubled.map((skill, i) => (
            <div
              key={`${skill.name}-${i}`}
              aria-hidden={i >= core.length}
              className="flex shrink-0 items-center gap-3 opacity-50 transition-opacity duration-300 hover:opacity-100">
              <Image
                src={skill.image}
                alt={i < core.length ? skill.name : ""}
                width={30}
                height={30}
                draggable={false}
                className="object-contain"
              />
              <span className="whitespace-nowrap font-mono text-sm font-semibold text-muted">
                {skill.name}
              </span>
              <span className="ms-10 text-accent/60">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
