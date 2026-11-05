import Reveal from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "start" | "center";
}

/**
 * Consistent section header: mono index + label, big title with a
 * gradient-highlighted part and an optional subtitle.
 */
export default function SectionHeading({
  index,
  label,
  title,
  highlight,
  subtitle,
  align = "start",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-12 md:mb-16",
        centered && "items-center text-center"
      )}>
      <Reveal>
        <span className="font-mono text-sm tracking-widest text-accent flex items-center gap-3">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/60" />
          {index} — {label}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-3xl">
          {title}{" "}
          {highlight ? (
            <span className="text-gradient">{highlight}</span>
          ) : null}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.16}>
          <p className="text-muted max-w-2xl leading-relaxed md:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
