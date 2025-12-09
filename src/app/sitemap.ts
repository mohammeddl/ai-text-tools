import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const locales = ['en', 'ar']
  
  // Base routes
  const routes = ["", "/tools", "/contact"];

  // Generate localized URLs
  const entries: MetadataRoute.Sitemap = [];

  // Add routes for each locale
  locales.forEach(locale => {
    routes.forEach(page => { // Changed 'pages' to 'routes' here
      entries.push({ // Changed 'routes' to 'entries' here
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      })
    })
  })

  return entries
}