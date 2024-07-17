import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://webclare.ir",
      lastModified: new Date(),
    },
    {
      url: "https://webclare.ir/fa",
      lastModified: new Date(),
    },
    {
      url: "https://webclare.ir/en",
      lastModified: new Date(),
    },
  ];
}
