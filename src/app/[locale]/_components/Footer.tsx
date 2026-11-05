import { contacts } from "@/lib/data";
import { getTranslations } from "next-intl/server";
import {
  FaDiscord,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";

const FOOTER_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  telegram: FaTelegram,
  instagram: FaInstagram,
  youtube: FaYoutube,
  discord: FaDiscord,
  email: FaEnvelope,
};

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-5 py-12 md:flex-row">
        {/* brand */}
        <div className="flex flex-col items-center gap-2 md:items-start">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient font-mono text-base font-bold text-black">
              M
            </span>
            <span className="font-bold">Mooud Mohammadi Tabar</span>
          </a>
          <p className="max-w-xs text-center text-sm text-muted md:text-start">
            {t("tagline")}
          </p>
        </div>

        {/* socials */}
        <ul className="flex items-center gap-2">
          {contacts.map(({ key, url, title }) => {
            const Icon = FOOTER_ICONS[key];
            return (
              <li key={key}>
                <a
                  href={url}
                  target={key === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={title}
                  title={title}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-all hover:-translate-y-1 hover:bg-accent-soft hover:text-accent">
                  <Icon className="text-lg" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-muted md:flex-row">
          <p>
            © {year} Mooud Mohammadi Tabar — {t("rights")}
          </p>
          <p className="font-mono">{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
