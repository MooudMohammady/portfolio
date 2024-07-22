import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useTranslations } from "next-intl";
import React from "react";

const skills = [
  {
    id: 0,
    title: "HTML",
    image: "html.png",
  },
  {
    id: 1,
    title: "CSS",
    image: "css.png",
  },
  {
    id: 2,
    title: "SASS",
    image: "sass.png",
  },
  {
    id: 3,
    title: "JavaScript",
    image: "js.png",
  },
  {
    id: 4,
    title: "TypeScript",
    image: "ts.png",
  },
  {
    id: 5,
    title: "React.js",
    image: "react.png",
  },
  {
    id: 6,
    title: "ReactNative",
    image: "ReactNative.png",
  },
  {
    id: 7,
    title: "Next.js",
    image: "next.png",
  },
  {
    id: 8,
    title: "Material UI",
    image: "mui.png",
  },
  {
    id: 9,
    title: "ReactQuery",
    image: "reactquery.png",
  },
  {
    id: 10,
    title: "Redux",
    image: "redux.png",
  },
  {
    id: 11,
    title: "Tailwind.css",
    image: "tailwind.png",
  },
  {
    id: 12,
    title: "Node.js",
    image: "node-js.png",
  },
  {
    id: 13,
    title: "Socket.io",
    image: "socket-io.png",
  },
  // {
  //   id: 14,
  //   title: "Docker",
  //   image: "docker.webp",
  // },
  {
    id: 15,
    title: "Electron.js",
    image: "electornjs.png",
  },
  {
    id: 16,
    title: "Express.js",
    image: "express.png",
  },
  {
    id: 17,
    title: "Figma",
    image: "figma.png",
  },
  {
    id: 18,
    title: "FramerMotion",
    image: "framer.png",
  },
  {
    id: 19,
    title: "Graphql",
    image: "graphql.png",
  },
  // {
  //   id: 20,
  //   title: "NextAuth",
  //   image: "logo-sm.png",
  // },
  {
    id: 21,
    title: "MongoDB",
    image: "mongodb.png",
  },
  {
    id: 22,
    title: "MySQL",
    image: "mysql.png",
  },
  {
    id: 23,
    title: "PrismaORM",
    image: "prisma.webp",
  },
  {
    id: 24,
    title: "Websocket",
    image: "websocket.png",
  },
  {
    id: 25,
    title: "Postgresql",
    image: "postgres.png",
  },
];

const LandingSection3 = () => {
  const t = useTranslations("landing.section3");

  return (
    <section className="flex flex-col gap-3 pt-16" id="skills">
      <div className="flex gap-2">
        <span className="bg-amber-500 h-7 w-1"></span>
        <h2 className="text-2xl font-bold ">{t("title")}</h2>
      </div>
      <ul className="flex gap-3 flex-wrap max-md:justify-between">
        <AnimatedTooltip items={skills} />
      </ul>
    </section>
  );
};

export default LandingSection3;
