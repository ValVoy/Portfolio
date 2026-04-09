import { profile } from '@/data/profile'
import { t } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import type { Dictionary } from '@/data/i18n/fr'

interface HeroProps {
  lang: string
  hero: Dictionary['hero']
}

export function Hero({ lang, hero }: HeroProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      {/* Ambient glow — kinetic luminescence */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 40%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24">
        {/* Availability badge */}
        <div className="mb-8 inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-primary animate-pulse"
          />
          <span className="font-body text-xs uppercase tracking-[0.1em] text-primary">
            {hero.availability}
          </span>
        </div>

        {/* Name */}
        <h1 className="font-display text-5xl font-bold tracking-tight text-on-surface sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>

        {/* Title */}
        <p className="font-display mt-4 text-2xl text-on-surface-variant sm:text-3xl">
          {t(profile.title, lang)}
        </p>

        {/* Bio */}
        <p className="font-body mt-6 max-w-xl text-base leading-relaxed text-on-surface-variant">
          {t(profile.bio, lang)}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={`/${lang}#projects`} variant="primary" size="lg">
            {hero.cta}
          </Button>
          <Button href={`/${lang}#contact`} variant="tertiary" size="lg">
            {hero.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  )
}
