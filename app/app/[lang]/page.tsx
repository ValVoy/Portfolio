import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/data/i18n'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { featuredProjects } from '@/data/projects'
import { skills } from '@/data/skills'
import { profile } from '@/data/profile'
import { t } from '@/lib/i18n'

const baseUrl = 'https://portfolio.vercel.app'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `${baseUrl}/${lang}`,
    jobTitle: t(profile.title, lang),
    description: t(profile.bio, lang),
    sameAs: [
      profile.social.find((s) => s.platform === 'github')?.url,
      profile.social.find((s) => s.platform === 'linkedin')?.url,
    ].filter(Boolean),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero lang={lang} hero={dict.hero} />
        <Projects projects={featuredProjects} lang={lang} dict={dict.projects} />
        <About profile={profile} skills={skills} lang={lang} dict={dict.about} />
        <Contact social={profile.social} dict={dict.contact} />
      </main>
    </>
  )
}
