"use client";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaLanguage, FaMoon, FaSun } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const LandingHeader = () => {
  const [mode, setMode] = useState<"light" | "dark">();

  const { theme } = useTheme();
  const t = useTranslations("landing.header");
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    setMode(theme as "light" | "dark");
  }, [theme]);

  const toggleColorMode = () => {
    document.documentElement.classList.toggle("dark");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    locale === "fa" ? router.push("/en") : router.push("/fa");
  };

  const sidebarBtn = useRef(null) as React.RefObject<HTMLInputElement>;

  const sideBarCloser = () => {
    sidebarBtn.current!.checked = false;
  };

  return (
    <header className="p-5 w-full">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <ul className="flex text-lg max-md:hidden">
          <li>
            <a
              href="#bio"
              className="px-4 py-3 flex justify-center relative after:absolute after:h-1 after:bg-amber-500 after:bottom-0 after:w-0 hover:after:w-full after:transition-all hover:text-amber-500 transition-colors">
              {t("summary")}
            </a>
          </li>
          <li>
            <a
              href="#samples"
              className="px-4 py-3 flex justify-center relative after:absolute after:h-1 after:bg-amber-500 after:bottom-0 after:w-0 hover:after:w-full after:transition-all hover:text-amber-500 transition-colors">
              {t("projects")}
            </a>
          </li>
          <li>
            <a
              href="#skills"
              className="px-4 py-3 flex justify-center relative after:absolute after:h-1 after:bg-amber-500 after:bottom-0 after:w-0 hover:after:w-full after:transition-all hover:text-amber-500 transition-colors">
              {t("skills")}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="px-4 py-3 flex justify-center relative after:absolute after:h-1 after:bg-amber-500 after:bottom-0 after:w-0 hover:after:w-full after:transition-all hover:text-amber-500 transition-colors">
              {t("social")}
            </a>
          </li>
        </ul>
        <div className="flex md:hidden items-center relative">
          <FaBars className="text-3xl" />
          <input
            type="checkbox"
            className="absolute w-9 h-9 peer/draft opacity-0"
            ref={sidebarBtn}
          />
          <div className="top-0 z-20 fixed right-[-300px] peer-checked/draft:-translate-x-[300px] dark:bg-[#23252E] bg-white h-[100vh] w-[250px] transition-all duration-300 ease-out p-2">
            <div className="flex flex-col items-center w-full">
              <nav className="w-full">
                <ul className="w-full divide-y divide-zinc-400/50 felx flex-col list-none m-0 p-0 text-xl">
                  <li className="flex w-full justify-between items-center">
                    <button className="p-2 text-3xl" onClick={sideBarCloser}>
                      <IoMdClose />
                    </button>
                  </li>
                  <li className="px-2 py-4 !border-t-0">
                    <a
                      href="#bio"
                      className="hover:text-amber-500 w-full pe-32 py-4"
                      onClick={sideBarCloser}>
                      {t("summary")}
                    </a>
                  </li>
                  <li className="px-2 py-4">
                    <a
                      href="#skills"
                      className="hover:text-amber-500 w-full pe-32 py-4"
                      onClick={sideBarCloser}>
                      {t("skills")}
                    </a>
                  </li>
                  <li className="px-2 py-4">
                    <a
                      href="#samples"
                      className="hover:text-amber-500 w-full pe-32 py-4"
                      onClick={sideBarCloser}>
                      {t("projects")}
                    </a>
                  </li>
                  <li className="px-2 py-4">
                    <a
                      href="#contact"
                      className="hover:text-amber-500 w-full pe-32 py-4"
                      onClick={sideBarCloser}>
                      {t("social")}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div
            className="bg-black/80 w-full h-[100vh] hidden fixed left-0 top-0 peer-checked/draft:block z-10"
            onClick={sideBarCloser}></div>
        </div>
        <div className="flex gap-2">
          <button
            className="p-4 text-xl rounded-md bg-gray-500/20 flex justify-center items-center"
            onClick={toggleColorMode}>
            {mode === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <button
            className="p-4 text-xl rounded-md bg-gray-500/20 flex justify-center items-center"
            onClick={toggleLanguage}
            title="Change Language">
            <FaLanguage />
          </button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
