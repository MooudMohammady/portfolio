import Reveal from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import TiltCard from "@/components/site/TiltCard";
import { useTranslations } from "next-intl";
import {
  HiOutlineCommandLine,
  HiOutlineServerStack,
  HiOutlineSquare3Stack3D,
  HiOutlineSparkles,
} from "react-icons/hi2";

const SERVICE_ICONS = [
  HiOutlineCommandLine,
  HiOutlineServerStack,
  HiOutlineSquare3Stack3D,
  HiOutlineSparkles,
];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section id="services" className="cv-auto scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          index="02"
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            return (
              <Reveal key={item.title} delay={0.08 * i}>
                <TiltCard className="h-full rounded-3xl">
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card/60 p-7 transition-colors duration-300 hover:border-accent/40">
                    {/* ghost number */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-4 end-3 font-mono text-7xl font-black text-ink/5 transition-colors duration-300 group-hover:text-accent/10">
                      0{i + 1}
                    </span>

                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-black shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="text-2xl" />
                    </div>
                    <h3 className="mb-2.5 text-xl font-bold">{item.title}</h3>
                    <p className="leading-relaxed text-muted">{item.desc}</p>

                    {/* hover bottom line */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 start-0 h-[3px] w-0 rounded-full bg-brand-gradient transition-all duration-500 group-hover:w-full"
                    />
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
