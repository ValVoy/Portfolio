'use client'

import { motion } from 'framer-motion'
import { t } from '@/lib/i18n'
import type { Profile, Skill } from '@/data/types'
import type { Dictionary } from '@/data/i18n/fr'

interface AboutProps {
  profile: Profile
  skills: Skill[]
  lang: string
  dict: Dictionary['about']
}

const categoryKeys = ['language', 'framework', 'tool'] as const

export function About({ profile, skills, lang, dict }: AboutProps) {
  return (
    <section id="about" className="relative w-full py-20 lg:py-[160px]">
      {/* Ambient glow — ellipse réduite pour ne pas déborder sur les sections adjacentes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 40% 35% at 15% 55%, color-mix(in srgb, var(--color-glow-ambient) 8%, transparent), transparent)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Left — bio & parcours */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2
            className="font-display text-4xl font-bold tracking-tight lg:text-5xl"
            style={{ color: 'var(--color-on-surface)' }}
          >
            {dict.title}
          </h2>
          <p
            className="font-body mt-2 text-xs uppercase tracking-[0.1em]"
            style={{ color: 'var(--color-primary)' }}
          >
            {dict.subtitle}
          </p>

          <p
            className="font-body mt-8 text-base leading-relaxed"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {t(profile.bio, lang)}
          </p>

          <dl className="mt-10 space-y-5">
            <div>
              <dt
                className="font-body text-xs uppercase tracking-[0.1em]"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {dict.formation}
              </dt>
              <dd
                className="font-body mt-1 text-sm"
                style={{ color: 'var(--color-on-surface)' }}
              >
                {dict.formationDetail}
              </dd>
            </div>
            <div>
              <dt
                className="font-body text-xs uppercase tracking-[0.1em]"
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {dict.location}
              </dt>
              <dd
                className="font-body mt-1 text-sm"
                style={{ color: 'var(--color-on-surface)' }}
              >
                {profile.location}
              </dd>
            </div>
          </dl>
        </motion.div>

        {/* Right — skill bars */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="space-y-10"
        >
          {categoryKeys.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            if (categorySkills.length === 0) return null

            return (
              <div key={category}>
                <h3
                  className="font-body mb-5 text-xs uppercase tracking-[0.1em]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {dict.skills[category]}
                </h3>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {categorySkills.map((skill, index) => (
                    <li key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span
                          className="font-body text-xs"
                          style={{ color: 'var(--color-on-surface)' }}
                        >
                          {skill.name}
                        </span>
                        <span
                          className="font-body text-xs tabular-nums"
                          style={{ color: 'var(--color-on-surface-variant)' }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      {/* Track */}
                      <div
                        className="h-1 w-full overflow-hidden rounded-full"
                        style={{ backgroundColor: 'var(--color-surface-container-highest)' }}
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={skill.name}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background:
                              'linear-gradient(90deg, var(--color-primary-dim), var(--color-primary))',
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            delay: 0.2 + index * 0.06,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </motion.div>
      </div>
      </div>
    </section>
  )
}
