import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const locales = ['en', 'ar']
  
  // Base pages for each locale
  const pages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/tools'
  ]

  const routes: MetadataRoute.Sitemap = []

  // Add routes for each locale
  locales.forEach(locale => {
    pages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
      })
    })
  })

  return routes
}