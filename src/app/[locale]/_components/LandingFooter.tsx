import { useTranslations } from "next-intl";
import React from "react";

const LandingFooter = () => {
  const t = useTranslations("landing.footer");

  return (
    <footer className="px-2 flex justify-center items-center mt-5">
      <ul className="flex text-lg">
        <li>
          <a
            href="#bio"
            className="px-4 py-3 flex justify-center hover:text-amber-500 transition-colors">
            {t("summary")}
          </a>
        </li>
        <li>
          <a
            href="#samples"
            className="px-4 py-3 flex justify-center hover:text-amber-500 transition-colors">
            {t("projects")}
          </a>
        </li>
        <li>
          <a
            href="#skills"
            className="px-4 py-3 flex justify-center hover:text-amber-500 transition-colors">
            {t("skills")}
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="px-4 py-3 flex justify-center hover:text-amber-500 transition-colors">
            {t("social")}
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default LandingFooter;
