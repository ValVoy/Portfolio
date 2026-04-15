import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/data/i18n'
import { siteUrl } from '@/lib/config'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Terminal } from '@/components/ui/Terminal'
import '../globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const viewport: Viewport = {
  themeColor: '#0e0e10',
  colorScheme: 'dark',
}

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
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        fr: '/fr',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isFr ? 'fr_FR' : 'en_US',
      alternateLocale: isFr ? 'en_US' : 'fr_FR',
      url: `${siteUrl}/${lang}`,
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
    <html
      lang={lang}
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <a href="#main-content" className="skip-link">
          {lang === 'fr' ? 'Aller au contenu principal' : 'Skip to main content'}
        </a>
        <Terminal />
        <Header lang={lang} nav={dict.nav} />
        <div className="pt-16">{children}</div>
        <Footer footer={dict.footer} />
      </body>
    </html>
  )
}
