import { useTranslations } from "next-intl";
import React from "react";

const LandingSection2 = () => {
  const t = useTranslations("landing.section2");

  return (
    <section className="flex flex-col gap-3 pt-16" id="bio">
      <div className="flex gap-2">
        <span className="bg-amber-500 h-7 w-1"></span>
        <h2 className="text-2xl font-bold ">{t("title")}</h2>
      </div>
      <p className="opacity-70 text-justify">{t("description")}</p>
    </section>
  );
};

export default LandingSection2;
