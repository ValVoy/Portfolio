import { profile } from '@/data/profile'
import type { Dictionary } from '@/data/i18n/fr'

interface FooterProps {
  footer: Dictionary['footer']
}

export function Footer({ footer }: FooterProps) {
  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-8">
        <p className="font-body text-on-surface-variant text-xs">
          © {new Date().getFullYear()} {profile.name} — {footer.rights}
        </p>
      </div>
    </footer>
  )
}
