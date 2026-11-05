import { MetadataRoute } from "next";
import { PERSON_NAME, SITE_URL } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSON_NAME} | Frontend Engineer`,
    short_name: "Mooud Mohammadi",
    description:
      "Portfolio of Mooud Mohammadi Tabar — Frontend Engineer & Web Platform Builder",
    start_url: "/fa",
    display: "standalone",
    background_color: "#07070c",
    theme_color: "#07070c",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
