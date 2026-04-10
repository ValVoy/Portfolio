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
  const isFr = lang === 'fr'

  const title = isFr
    ? 'Valentin Chéron — Développeur web fullstack junior'
    : 'Valentin Chéron — Junior fullstack web developer'
  const description = isFr
    ? 'Portfolio de Valentin Chéron, développeur web fullstack junior formé à The Hacking Project. Ruby on Rails, Next.js, TypeScript.'
    : 'Portfolio of Valentin Chéron, junior fullstack web developer trained at The Hacking Project. Ruby on Rails, Next.js, TypeScript.'

  return {
    title: {
      default: title,
      template: `%s | Valentin Chéron`,
    },
    description,
    metadataBase: new URL('https://portfolio.vercel.app'),
    alternates: {
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isFr ? 'fr_FR' : 'en_US',
      alternateLocale: isFr ? 'en_US' : 'fr_FR',
      url: `https://portfolio.vercel.app/${lang}`,
      siteName: 'Valentin Chéron',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
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
      <Footer footer={dict.footer} />
    </>
  )
}
