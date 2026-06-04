'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { now } from '@/data/now'
import { Chip } from '@/components/ui/Chip'
import type { Dictionary } from '@/data/i18n/fr'

interface NowProps {
  lang: string
  dict: Dictionary['now']
}

const ThemeToggle = ({
  activeTheme,
  setActiveTheme,
  size = 'sm',
}: {
  activeTheme: 'dark' | 'light'
  setActiveTheme: (t: 'dark' | 'light') => void
  size?: 'sm' | 'md'
}) => (
  <div
    className="flex overflow-hidden"
    style={{
      borderRadius: '9999px',
      backgroundColor: 'color-mix(in srgb, var(--color-surface-container-highest) 90%, transparent)',
      backdropFilter: 'blur(8px)',
      border: '1px solid color-mix(in srgb, var(--color-primary) 15%, transparent)',
    }}
  >
    {(['light', 'dark'] as const).map((theme) => (
      <button
        key={theme}
        onClick={() => setActiveTheme(theme)}
        className={`font-body cursor-pointer uppercase tracking-[0.08em] transition-colors duration-200 ${size === 'md' ? 'px-4 py-2 text-xs' : 'px-3 py-1.5 text-xs'}`}
        style={{
          backgroundColor:
            activeTheme === theme
              ? 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
              : 'transparent',
          color:
            activeTheme === theme
              ? 'var(--color-primary)'
              : 'var(--color-on-surface-variant)',
        }}
        aria-pressed={activeTheme === theme}
      >
        {theme}
      </button>
    ))}
  </div>
)

export function Now({ lang, dict }: NowProps) {
  const l = lang as 'fr' | 'en'
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('light')
  const [lightboxOpen, setLightboxOpen] = useState(false)

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

      <div className="relative mx-auto w-full max-w-6xl px-6">

        {/* Section header — aligné sur About & Projects */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-16"
        >
          <div className="flex items-center gap-3">
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
              className="font-display text-4xl font-bold tracking-tight lg:text-5xl"
              style={{ color: 'var(--color-on-surface)' }}
            >
              {dict.title}
            </h2>
          </div>
          <p
            className="font-body mt-4 text-base"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {dict.updated} {now.updatedAt}
          </p>
        </motion.div>

        {/* Contenu — 2 colonnes sur desktop */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">

          {/* Colonne gauche — projet en cours */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div
              className="p-6 sm:p-8"
              style={{
                backgroundColor: 'var(--color-surface-container)',
                borderRadius: '1.5rem',
                boxShadow:
                  '0 0 0 1px color-mix(in srgb, var(--color-primary) 12%, transparent), 0 8px 40px color-mix(in srgb, var(--color-primary) 5%, transparent)',
              }}
            >
              {/* Titre projet + badge */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3
                  className="font-display text-xl font-bold"
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

              {/* Screenshot */}
              <div
                className="relative mb-5 overflow-hidden"
                style={{ borderRadius: '0.875rem' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTheme}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="cursor-zoom-in"
                    onClick={() => setLightboxOpen(true)}
                  >
                    <Image
                      src={now.project.screenshots[activeTheme]}
                      alt={`LifeOS v3 · thème ${activeTheme}`}
                      width={1536}
                      height={768}
                      className="w-full"
                      style={{ borderRadius: '0.875rem' }}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Toggle pill sur l'image */}
                <div
                  className="absolute bottom-3 right-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ThemeToggle activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
                </div>
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
            </div>
          </motion.div>

          {/* Colonne droite — items */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="self-start p-6 sm:p-8"
            style={{
              backgroundColor: 'var(--color-surface-container)',
              borderRadius: '1.5rem',
              boxShadow: '0 0 0 1px color-mix(in srgb, var(--color-primary) 12%, transparent), 0 8px 40px color-mix(in srgb, var(--color-primary) 5%, transparent)',
            }}
          >
            {/* Disponibilité */}
            <div
              className="mb-6 flex items-center gap-3 px-4 py-3"
              style={{
                backgroundColor: 'rgba(74, 222, 128, 0.08)',
                borderRadius: '0.875rem',
                border: '1px solid rgba(74, 222, 128, 0.25)',
              }}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ backgroundColor: '#4ade80' }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: '#4ade80' }}
                />
              </span>
              <span
                className="font-body text-sm font-medium"
                style={{ color: '#4ade80' }}
              >
                {now.availability.label[l]}
              </span>
            </div>

            <div
              className="mb-6 h-px w-12"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)' }}
            />

            <ul className="space-y-6">
              {now.items.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 + i * 0.1 }}
                >
                  <p
                    className="font-body mb-1.5 text-xs uppercase tracking-[0.1em]"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {item.label[l]}
                  </p>
                  <p
                    className="font-body text-base leading-relaxed"
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    {item.content[l]}
                  </p>
                  {item.href && (
                    <a
                      href={typeof item.href === 'string' ? item.href : item.href[l]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body mt-2 inline-block text-xs font-medium transition-opacity hover:opacity-70"
                      style={{ color: 'var(--color-primary-fixed-dim)' }}
                    >
                      {(item.linkLabel?.[l] ?? (l === 'fr' ? 'Voir le lien' : 'View link'))} ↗
                    </a>
                  )}
                  {i < now.items.length - 1 && (
                    <div
                      className="mt-6 h-px w-12"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)' }}
                    />
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={now.project.screenshots[activeTheme]}
                alt={`LifeOS v3 · thème ${activeTheme}`}
                width={1536}
                height={768}
                className="w-full"
                style={{ borderRadius: '1rem' }}
              />

              {/* Toggle dans le lightbox */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
                onClick={(e) => e.stopPropagation()}
              >
                <ThemeToggle activeTheme={activeTheme} setActiveTheme={setActiveTheme} size="md" />
              </div>

              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-3 -right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm transition-opacity hover:opacity-70"
                style={{
                  backgroundColor: 'var(--color-surface-container-highest)',
                  color: 'var(--color-on-surface)',
                }}
                aria-label="Fermer"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
