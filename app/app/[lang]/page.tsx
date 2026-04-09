import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/data/i18n'
import { Hero } from '@/components/sections/Hero'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <main>
      <Hero lang={lang} hero={dict.hero} />
    </main>
  )
}
