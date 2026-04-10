import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/data/i18n'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { featuredProjects } from '@/data/projects'
import { skills } from '@/data/skills'
import { profile } from '@/data/profile'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <main>
      <Hero lang={lang} hero={dict.hero} />
      <Projects projects={featuredProjects} lang={lang} dict={dict.projects} />
      <About profile={profile} skills={skills} lang={lang} dict={dict.about} />
      <Contact social={profile.social} dict={dict.contact} />
    </main>
  )
}
