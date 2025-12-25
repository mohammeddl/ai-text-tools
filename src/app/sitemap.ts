import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const locales = ['en', 'ar']
  
  const routes = ["", "/tools", "/contact"];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    routes.forEach(page => {
      entries.push({ 
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      })
    })
  })

  return entries
}