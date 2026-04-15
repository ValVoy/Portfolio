'use client'

import { motion } from 'framer-motion'
import { now } from '@/data/now'
import { Chip } from '@/components/ui/Chip'
import type { Dictionary } from '@/data/i18n/fr'

interface NowProps {
  lang: string
  dict: Dictionary['now']
}

export function Now({ lang, dict }: NowProps) {
  const l = lang as 'fr' | 'en'

  return (
    <section id="now" className="relative w-full py-20 lg:py-[160px]">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, color-mix(in srgb, var(--color-primary) 5%, transparent), transparent)',
        }}
      />

      <div className="relative mx-auto w-full max-w-2xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {/* Carte principale */}
          <div
            className="p-8 sm:p-10"
            style={{
              backgroundColor: 'var(--color-surface-container)',
              borderRadius: '2rem',
              boxShadow:
                '0 0 0 1px color-mix(in srgb, var(--color-primary) 12%, transparent), 0 8px 40px color-mix(in srgb, var(--color-primary) 5%, transparent)',
            }}
          >
            {/* En-tête */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                  <span
                    className="relative inline-flex h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                </span>
                <h2
                  className="font-display text-xl font-bold tracking-tight"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  {dict.title}
                </h2>
              </div>
              <span
                className="font-body text-xs"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {dict.updated} {now.updatedAt}
              </span>
            </div>

            {/* ── Card projet LifeOs ── */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
              className="mb-8 p-6"
              style={{
                backgroundColor: 'var(--color-surface-container-high)',
                borderRadius: '1.25rem',
                border: '1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)',
              }}
            >
              {/* Titre + badge */}
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3
                  className="font-display text-lg font-bold"
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  {now.project.title}
                </h3>
                <span
                  className="font-body shrink-0 rounded-full px-2.5 py-1 text-xs uppercase tracking-[0.08em]"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
                    color: 'var(--color-primary)',
                  }}
                >
                  {dict.building}
                </span>
              </div>

              {/* Description */}
              <p
                className="font-body mb-5 text-sm leading-relaxed"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {now.project.description[l]}
              </p>

              {/* Stack */}
              <div className="mb-5 flex flex-wrap gap-2">
                {now.project.stack.map((tech) => (
                  <Chip key={tech} label={tech} />
                ))}
              </div>

              {/* Lien GitHub */}
              {now.project.repoUrl ? (
                <a
                  href={now.project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-primary-fixed-dim)' }}
                >
                  {dict.repoLabel} →
                </a>
              ) : (
                <span
                  className="font-body text-sm"
                  style={{ color: 'var(--color-on-surface-variant)', opacity: 0.5 }}
                >
                  {dict.repoSoon}
                </span>
              )}
            </motion.div>

            {/* ── Items texte ── */}
            <ul className="space-y-6">
              {now.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 + i * 0.1 }}
                >
                  <p
                    className="font-body mb-1 text-xs uppercase tracking-[0.1em]"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {item.label[l]}
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                    {item.content[l]}
                  </p>
                  {item.href && (
                    <a
                      href={typeof item.href === 'string' ? item.href : item.href[l]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body mt-1.5 inline-block text-xs font-medium transition-opacity hover:opacity-70"
                      style={{ color: 'var(--color-primary-fixed-dim)' }}
                    >
                      Voir sur Amazon ↗
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
