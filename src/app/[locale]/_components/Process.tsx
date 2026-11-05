import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { useTranslations } from "next-intl";

export default function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; desc: string }[];

  return (
    <section id="process" className="cv-auto scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="04"
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {/* connector line (desktop) */}
          <span
            aria-hidden="true"
            className="absolute start-0 end-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent md:block"
          />

          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={0.12 * i} className="flex flex-col items-center text-center">
                <span className="relative z-10 mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-line bg-card shadow-card">
                  <span className="bg-brand-gradient bg-clip-text font-mono text-2xl font-black text-transparent">
                    0{i + 1}
                  </span>
                  <span className="absolute inset-0 rounded-2xl bg-accent/0 transition-colors duration-300 hover:bg-accent-soft" />
                </span>
                <h3 className="mb-2 font-bold">{step.title}</h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted">
                  {step.desc}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
