"use client";

import Magnetic from "@/components/site/Magnetic";
import Reveal from "@/components/site/Reveal";
import { EMAIL, contacts } from "@/lib/data";
import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  FaDiscord,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";
import { HiCheck, HiOutlineClipboardDocument } from "react-icons/hi2";

const CONTACT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  telegram: FaTelegram,
  instagram: FaInstagram,
  youtube: FaYoutube,
  discord: FaDiscord,
  email: FaEnvelope,
};

export default function Contact() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — mailto link still works */
    }
  };

  return (
    <section id="contact" className="scroll-mt-28 py-24 md:py-36">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
        <Reveal>
          <span className="mb-6 flex items-center gap-3 font-mono text-sm tracking-widest text-accent">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/60" />
            06 — {t("label")}
            <span aria-hidden="true" className="inline-block h-px w-8 bg-accent/60" />
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="text-4xl font-black leading-[1.15] md:text-6xl">
            {t("titleA")}{" "}
            <span className="text-gradient drop-shadow-[0_0_35px_var(--accent-glow)]">
              {t("titleB")}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl leading-relaxed text-muted md:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        {/* email actions */}
        <Reveal delay={0.24} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-3 rounded-2xl bg-brand-gradient px-8 py-4 font-bold text-black shadow-glow transition-all hover:shadow-[0_0_60px_-10px_var(--accent-glow)] active:scale-95">
                <FaEnvelope className="transition-transform duration-300 group-hover:-rotate-12" />
                {t("emailCta")}
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={copyEmail}
                className="glass group flex items-center gap-3 rounded-2xl px-8 py-4 font-bold text-ink transition-all hover:border-accent/50 hover:text-accent active:scale-95">
                {copied ? (
                  <HiCheck className="text-emerald-400" />
                ) : (
                  <HiOutlineClipboardDocument />
                )}
                {copied ? t("copied") : EMAIL}
              </button>
            </Magnetic>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t("note")}
          </p>
        </Reveal>

        {/* socials */}
        <Reveal delay={0.32} className="mt-14 w-full">
          <p className="mb-6 font-mono text-xs tracking-widest text-muted uppercase">
            {t("socialsTitle")}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {contacts.map(({ key, url, title, color }) => {
              const Icon = CONTACT_ICONS[key];
              return (
                <li key={key}>
                  <a
                    href={url}
                    target={key === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={title}
                    title={title}
                    className="glass group flex h-13 w-13 items-center justify-center rounded-2xl p-3.5 text-muted transition-all duration-300 hover:-translate-y-1.5 hover:text-ink"
                    style={{ "--c": color } as React.CSSProperties}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = `0 8px 30px -8px ${color}66, inset 0 0 0 1px ${color}55`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "")
                    }>
                    <Icon className="text-xl transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
