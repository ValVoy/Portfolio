import { profile } from '@/data/profile'

const translations = {
  fr: { rights: 'Tous droits réservés' },
  en: { rights: 'All rights reserved' },
} as const

interface FooterProps {
  lang: string
}

export function Footer({ lang }: FooterProps) {
  const t = translations[lang as keyof typeof translations] ?? translations.fr
  const github = profile.social.find((s) => s.platform === 'github')
  const linkedin = profile.social.find((s) => s.platform === 'linkedin')

  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between">
        <ul className="flex items-center gap-6">
          {github && (
            <li>
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-on-surface-variant text-sm hover:text-on-surface transition-colors duration-200"
                aria-label="GitHub"
              >
                GitHub
              </a>
            </li>
          )}
          {linkedin && (
            <li>
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-on-surface-variant text-sm hover:text-on-surface transition-colors duration-200"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
            </li>
          )}
        </ul>

        <p className="font-body text-on-surface-variant text-xs">
          © {new Date().getFullYear()} {profile.name} — {t.rights}
        </p>
      </div>
    </footer>
  )
}
