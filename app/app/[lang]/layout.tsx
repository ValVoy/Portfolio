import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'

const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

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

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params

  if (!locales.includes(lang as Locale)) notFound()

  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        {children}
      </body>
    </html>
  )
}
