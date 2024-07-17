import { useTranslations } from "next-intl";
import React from "react";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const contacts = [
  {
    icon: FaGithub,
    url: "https://github.com/MooudMohammady",
    title: "Github",
  },
  {
    icon: FaTelegram,
    url: "https://t.me/mooudmohammady",
    title: "Telegram",
  },
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/webclare.ir",
    title: "Instagram",
  },
  {
    icon: FaDiscord,
    url: "https://discord.com/channels/@me/718730365199712283",
    title: "Discord",
  },
  {
    icon: FaYoutube,
    url: "https://www.youtube.com/channel/UCY8EUIoJ889pYZ7ptsePLwg",
    title: "Youtube",
  },
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/mooud-mohammadi-tabar-29624b266/",
    title: "Linkedin",
  },
  {
    icon: MdEmail,
    url: "mailto:mooudmohammadi@gmail.com",
    title: "Gmail",
  },
];

const LandingSection5 = () => {
  const t = useTranslations("landing.section5");

  return (
    <section className="flex flex-col gap-3 pt-16" id="contact">
      <div className="flex gap-2">
        <span className="bg-amber-500 h-7 w-1"></span>
        <h2 className="text-2xl font-bold ">{t("title")}</h2>
      </div>
      <ul className="flex gap-3 flex-wrap justify-between">
        {contacts.map(({ icon: Icon, url, title }, i) => (
          <li
            key={i}
            className="dark:bg-gray-500/20 bg-white shadow-md rounded-md dark:border border-gray-500/40 hover:opacity-70 transition-all max-md:flex-1">
            <a
              href={url}
              className="flex gap-2 justify-center items-center py-2 px-6">
              <Icon className="text-xl text-amber-500" />
              <span className="h-full font-sans font-semibold">{title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LandingSection5;
