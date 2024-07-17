"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa6";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useLocale, useTranslations } from "next-intl";

const LandingSection1 = () => {
  const t = useTranslations("landing.section1");
  const locale = useLocale();

  return (
    <section className="md:py-32 py-10 flex justify-between max-md:flex-col max-md:px-2 relative">
      <a
        href="#bio"
        className="absolute bottom-0 max-md:-bottom-7 left-1/2 -translate-x-1/2 px-1 py-4 border-2 border-gray-500 rounded-full overflow-hidden">
        <motion.span
          initial={{
            y: -33,
          }}
          animate={{
            y: 30,
            opacity: 0.2,
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 0.8,
            },
          }}
          className="block">
          <FaArrowDown />
        </motion.span>
      </a>
      <div className="flex flex-col gap-4 md:w-8/12 max-md:order-2 max-md:text-center max-md:mt-10">
        <h1 className="opacity-70">{t("sub-title")}</h1>
        <p className="text-4xl md:text-7xl font-bold">
          {t("title-start") + " "}
          <span className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            {t("title-middle")}
          </span>{" "}
          {t("title-end")}
        </p>
        <p className="opacity-70">{t("description")}</p>
        <div className="flex gap-3 font-semibold max-md:w-full">
          <a
            href="#samples"
            className="block bg-amber-500 text-gray-800 ring-4 ring-amber-500/50 px-6 py-2 rounded-md max-md:flex-1 transition-all hover:ring-2 hover:bg-amber-500/90 active:ring-4 active:bg-amber-500/70">
            {t("like-what")}
          </a>
          <a
            href={
              locale === "fa"
                ? "/موعود محمدی تبار - فرانت اند.pdf"
                : "/MooudMohammadi-(europe).pdf"
            }
            download
            className="block border border-amber-500 text-amber-500 px-6 py-2 rounded-md max-md:flex-1 hover:bg-amber-500/30 active:bg-amber-500/10 transition">
            {t("download-resume")}
          </a>
        </div>
      </div>
      <div className="relative flex justify-center items-center md:w-7/12 max-md:order-1">
        <motion.img
          animate={{
            rotate: "360deg",
            transition: {
              repeatType: "loop",
              repeat: Infinity,
              ease: "linear",
              duration: 6,
            },
          }}
          src="/images/circular-name.png"
          alt=""
          draggable="false"
          className="absolute w-[270px] md:w-[500px]"
        />
        <CardContainer containerClassName="py-0">
          <CardBody className="h-full w-full">
            <CardItem
              as={"img"}
              src="/photo_2024-06-03_10-29-54.jpg"
              alt="'webclare', 'webclare.ir', 'موعود محمدی تبار'"
              className="rounded-full w-44 md:w-80 hover:grayscale"
              rotateZ={10}
              translateZ={60}
            />
          </CardBody>
        </CardContainer>
      </div>
    </section>
  );
};

export default LandingSection1;
