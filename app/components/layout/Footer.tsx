'use client'

import { profile } from '@/data/profile'
import type { Dictionary } from '@/data/i18n/fr'

interface FooterProps {
  footer: Dictionary['footer']
}

export function Footer({ footer }: FooterProps) {
  const openTerminal = () => {
    window.dispatchEvent(new CustomEvent('open-terminal'))
  }

  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
        <p className="font-body text-on-surface-variant text-xs">
          © {new Date().getFullYear()} {profile.name}, {footer.rights}
        </p>

        <button
          onClick={openTerminal}
          aria-label="Ouvrir le terminal"
          className="font-body text-xs transition-opacity hover:opacity-100"
          style={{
            color: 'rgba(148,170,255,0.3)',
            fontFamily: "'SF Mono', 'Fira Code', monospace",
            letterSpacing: '0.05em',
          }}
        >
          &gt;_
        </button>
      </div>
    </footer>
  )
}
