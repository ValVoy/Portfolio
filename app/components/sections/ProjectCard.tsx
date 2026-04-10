'use client'

import { motion } from 'framer-motion'
import { Chip } from '@/components/ui/Chip'
import { t } from '@/lib/i18n'
import type { Project } from '@/data/types'
import type { Dictionary } from '@/data/i18n/fr'

interface ProjectCardProps {
  project: Project
  lang: string
  dict: Dictionary['projects']
}

export function ProjectCard({ project, lang, dict }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex h-full flex-col p-8"
      style={{
        backgroundColor: 'var(--color-surface-container)',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 32px color-mix(in srgb, var(--color-primary) 6%, transparent)',
      }}
    >
      {/* Top: status + year */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="font-body text-xs uppercase tracking-[0.1em]"
            style={{
              color:
                project.status === 'in_progress'
                  ? 'var(--color-primary)'
                  : 'var(--color-secondary)',
            }}
          >
            {project.status === 'in_progress' ? dict.statusInProgress : dict.statusCompleted}
          </span>
          <span
            className="font-body text-xs"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            ·
          </span>
          <span
            className="font-body text-xs uppercase tracking-[0.1em]"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {project.teamProject ? dict.team : dict.solo}
          </span>
        </div>
        <span
          className="font-body text-xs tabular-nums"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-display mb-3 text-xl font-bold"
        style={{ color: 'var(--color-on-surface)' }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className="font-body mb-6 flex-1 text-sm leading-relaxed"
        style={{ color: 'var(--color-on-surface-variant)' }}
      >
        {t(project.description, lang)}
      </p>

      {/* Stack chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Chip key={tech} label={tech} />
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-5">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-primary-fixed-dim)' }}
          aria-label={`${dict.viewCode} — ${project.title}`}
        >
          {dict.viewCode} →
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-tertiary)' }}
            aria-label={`${dict.viewLive} — ${project.title}`}
          >
            {dict.viewLive} ↗
          </a>
        )}
      </div>
    </motion.article>
  )
}
