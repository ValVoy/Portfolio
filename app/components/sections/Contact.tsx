'use client'

import { motion, type Variants } from 'framer-motion'
import type { SocialLink } from '@/data/types'
import type { Dictionary } from '@/data/i18n/fr'

interface ContactProps {
  social: SocialLink[]
  dict: Dictionary['contact']
}

const platformIcons: Record<SocialLink['platform'], React.ReactNode> = {
  github: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-6 w-6 shrink-0"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  ),
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Contact({ social, dict }: ContactProps) {
  return (
    <section id="contact" className="relative w-full py-20 lg:py-[160px]">
      {/* Ambient glow — ellipse réduite pour ne pas déborder sur les sections adjacentes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 35% 30% at 80% 50%, color-mix(in srgb, var(--color-glow-ambient) 8%, transparent), transparent)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2
            className="font-display text-4xl font-bold tracking-tight lg:text-5xl"
            style={{ color: 'var(--color-on-surface)' }}
          >
            {dict.title}
          </h2>
          <p
            className="font-body mx-auto mt-4 max-w-md text-base"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {dict.subtitle}
          </p>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {social.map((link) => (
            <motion.li key={link.platform} variants={itemVariants}>
              <a
                href={link.url}
                target={link.platform !== 'email' ? '_blank' : undefined}
                rel={link.platform !== 'email' ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 px-8 py-5 font-body text-base font-medium transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-surface-container)',
                  borderRadius: '1.5rem',
                  color: 'var(--color-on-surface)',
                  boxShadow:
                    '0 4px 24px color-mix(in srgb, var(--color-primary) 6%, transparent)',
                }}
                aria-label={link.label}
              >
                <span style={{ color: 'var(--color-primary)' }}>
                  {platformIcons[link.platform]}
                </span>
                {link.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
      </div>
    </section>
  )
}
