import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { useTranslations } from "next-intl";
import {
  HiOutlineSquares2X2,
  HiOutlineCodeBracket,
  HiOutlineBolt,
  HiOutlineCpuChip,
} from "react-icons/hi2";

const HIGHLIGHT_ICONS = [
  HiOutlineSquares2X2,
  HiOutlineCodeBracket,
  HiOutlineBolt,
  HiOutlineCpuChip,
];

export default function About() {
  const t = useTranslations("about");
  const highlights = t.raw("highlights") as {
    title: string;
    desc: string;
  }[];
  const facts = [
    { label: t("facts.focus"), value: t("facts.focusValue") },
    { label: t("facts.domain"), value: t("facts.domainValue") },
    { label: t("facts.now"), value: t("facts.nowValue") },
  ];

  return (
    <section id="about" className="cv-auto scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* sticky heading */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="01"
            label={t("label")}
            title={t("title")}
          />
          {/* quick facts */}
          <Reveal delay={0.2} className="mt-2 flex flex-col gap-3">
            {facts.map((f) => (
              <div
                key={f.label}
                className="glass flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5">
                <span className="text-xs text-muted md:text-sm">{f.label}</span>
                <span className="font-mono text-xs font-semibold text-accent md:text-sm">
                  {f.value}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        {/* content */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <p className="text-justify leading-loose text-muted md:text-lg">
              {t("p1")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-justify leading-loose text-muted md:text-lg">
              {t("p2")}
            </p>
          </Reveal>

          {/* highlights grid */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {highlights.map((h, i) => {
              const Icon = HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length];
              return (
                <Reveal key={h.title} delay={0.08 * i}>
                  <div className="group h-full rounded-2xl border border-line bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow">
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                      <Icon className="text-xl" />
                    </div>
                    <h3 className="mb-1 font-bold">{h.title}</h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {h.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
