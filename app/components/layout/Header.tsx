'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import type { Dictionary } from '@/data/i18n/fr'

interface HeaderProps {
  lang: string
  nav: Dictionary['nav']
}

const navLinks = (lang: string, nav: Dictionary['nav']) => [
  { href: `/${lang}#projects`, label: nav.projects },
  { href: `/${lang}#about`, label: nav.about },
  { href: `/${lang}#contact`, label: nav.contact },
]

export function Header({ lang, nav }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const otherLang = lang === 'fr' ? 'en' : 'fr'
  // Remplace le segment de langue dans l'URL courante → /fr/projects/x → /en/projects/x
  const otherLangHref = pathname.replace(new RegExp(`^/${lang}`), `/${otherLang}`)
  const links = navLinks(lang, nav)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'color-mix(in srgb, var(--color-nav-bg) 97%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--color-outline-variant) 30%, transparent)',
      }}
    >
      <nav aria-label="Navigation principale" className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="font-display text-on-surface font-semibold text-lg tracking-tight hover:text-primary transition-colors duration-200"
          onClick={() => setIsOpen(false)}
        >
          Valentin Chéron
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-body text-on-surface-variant text-sm hover:text-on-surface transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={otherLangHref}
              className="font-body text-primary-fixed-dim text-xs font-medium uppercase tracking-[0.1em] hover:text-primary transition-colors duration-200"
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {nav.langSwitch}
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile — hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center gap-1.5 p-2 -mr-2"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-5 rounded-full"
            style={{ backgroundColor: 'var(--color-on-surface)' }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="block h-0.5 w-5 rounded-full"
            style={{ backgroundColor: 'var(--color-on-surface)' }}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
            className="block h-0.5 w-5 rounded-full"
            style={{ backgroundColor: 'var(--color-on-surface)' }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
            style={{
              borderTop: '1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)',
            }}
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-on-surface-variant text-base hover:text-on-surface transition-colors duration-200 block py-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 mt-1" style={{ borderTop: '1px solid color-mix(in srgb, var(--color-outline-variant) 20%, transparent)' }}>
                <Link
                  href={otherLangHref}
                  className="font-body text-primary-fixed-dim text-xs font-medium uppercase tracking-[0.1em] hover:text-primary transition-colors duration-200 block py-3"
                  aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
                  onClick={() => setIsOpen(false)}
                >
                  {nav.langSwitch}
                </Link>
              </li>
              <li className="py-2">
                <ThemeToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
