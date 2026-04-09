import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/data/i18n'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  return {
    title: {
      default: 'Portfolio',
      template: '%s | Portfolio',
    },
    description:
      lang === 'fr'
        ? 'Portfolio personnel — développeur fullstack.'
        : 'Personal portfolio — fullstack developer.',
    metadataBase: new URL('https://portfolio.vercel.app'),
    alternates: {
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params

  if (!locales.includes(lang as Locale)) notFound()

  const dict = await getDictionary(lang as Locale)

  return (
    <>
      <Header lang={lang} nav={dict.nav} />
      <div className="pt-16">{children}</div>
      <Footer lang={lang} footer={dict.footer} />
    </>
  )
}
