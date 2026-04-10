import Link from 'next/link'
import type { Dictionary } from '@/data/i18n/fr'

interface HeaderProps {
  lang: string
  nav: Dictionary['nav']
}

export function Header({ lang, nav }: HeaderProps) {
  const otherLang = lang === 'fr' ? 'en' : 'fr'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'color-mix(in srgb, var(--color-surface-container) 97%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)',
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={`/${lang}`}
          className="font-display text-on-surface font-semibold text-lg tracking-tight hover:text-primary transition-colors duration-200"
        >
          Valentin Chéron
        </Link>

        <ul className="flex items-center gap-8">
          <li>
            <Link
              href={`/${lang}#projects`}
              className="font-body text-on-surface-variant text-sm hover:text-on-surface transition-colors duration-200"
            >
              {nav.projects}
            </Link>
          </li>
          <li>
            <Link
              href={`/${lang}#about`}
              className="font-body text-on-surface-variant text-sm hover:text-on-surface transition-colors duration-200"
            >
              {nav.about}
            </Link>
          </li>
          <li>
            <Link
              href={`/${lang}#contact`}
              className="font-body text-on-surface-variant text-sm hover:text-on-surface transition-colors duration-200"
            >
              {nav.contact}
            </Link>
          </li>
          <li>
            <Link
              href={`/${otherLang}`}
              className="font-body text-primary-fixed-dim text-xs font-medium uppercase tracking-[0.1em] hover:text-primary transition-colors duration-200"
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {nav.langSwitch}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
