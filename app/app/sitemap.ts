import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'

const baseUrl = 'https://portfolio.vercel.app'
const locales = ['fr', 'en'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages = locales.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: lang === 'fr' ? 1 : 0.9,
    alternates: {
      languages: { fr: `${baseUrl}/fr`, en: `${baseUrl}/en` },
    },
  }))

  const projectPages = locales.flatMap((lang) =>
    projects.map((p) => ({
      url: `${baseUrl}/${lang}/projects/${p.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/projects/${p.id}`,
          en: `${baseUrl}/en/projects/${p.id}`,
        },
      },
    }))
  )

  return [...homePages, ...projectPages]
}
