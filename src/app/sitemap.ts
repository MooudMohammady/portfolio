import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://webclare.ir',
      lastModified: new Date(),
    },
  ]
}