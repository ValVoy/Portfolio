import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/data/i18n'

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)

  return (
    <main className="flex flex-1 items-center justify-center">
      <p className="font-body text-on-surface-variant text-sm tracking-widest uppercase">
        {dict.home.tagline}
      </p>
    </main>
  )
}
