'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Chip } from '@/components/ui/Chip'
import { ProjectImage } from '@/components/ui/ProjectImage'
import { t } from '@/lib/i18n'
import type { Project } from '@/data/types'
import type { Dictionary } from '@/data/i18n/fr'

interface ProjectCardProps {
  project: Project
  lang: string
  dict: Dictionary['projects']
}

export function ProjectCard({ project, lang, dict }: ProjectCardProps) {
  if (project.placeholder) {
    return (
      <motion.div
        className="flex h-full flex-col overflow-hidden"
        animate={{ opacity: [0.55, 0.75, 0.55] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundColor: 'var(--color-surface-container)',
          borderRadius: '1.5rem',
          boxShadow: '0 4px 32px color-mix(in srgb, var(--color-primary) 4%, transparent)',
        }}
      >
        {/* Zone image — grille de points + badge */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{
            height: '160px',
            background: 'linear-gradient(135deg, var(--color-surface-container-high) 0%, var(--color-surface-container-low) 100%)',
            backgroundImage: `
              linear-gradient(135deg, var(--color-surface-container-high) 0%, var(--color-surface-container-low) 100%),
              radial-gradient(circle, color-mix(in srgb, var(--color-primary) 18%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 24px 24px',
          }}
        >
          <span
            className="absolute right-4 top-4 font-body text-xs uppercase tracking-[0.1em] px-2 py-1 rounded-full"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
              color: 'var(--color-primary)',
            }}
          >
            {dict.comingSoon}
          </span>
        </div>

        {/* Contenu squelette */}
        <div className="flex flex-1 flex-col p-8">
          {/* Status + année */}
          <div className="mb-4 flex items-center justify-between">
            <div className="h-3 w-24 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
            <div className="h-3 w-8 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
          </div>

          {/* Titre */}
          <div className="mb-3 h-6 w-40 rounded-lg" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />

          {/* Description */}
          <div className="mb-6 flex flex-1 flex-col gap-2.5">
            <div className="h-3 w-full rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
            <div className="h-3 w-4/5 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
            <div className="h-3 w-3/5 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
          </div>

          {/* Chips */}
          <div className="mb-6 flex gap-2">
            <div className="h-6 w-16 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
            <div className="h-6 w-20 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
            <div className="h-6 w-14 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
          </div>

          {/* Lien fantôme */}
          <div className="h-4 w-28 rounded-full" style={{ backgroundColor: 'var(--color-surface-container-high)' }} />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex h-full flex-col overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface-container)',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 32px color-mix(in srgb, var(--color-primary) 6%, transparent)',
      }}
    >
      {/* Thumbnail */}
      <ProjectImage image={project.image} title={project.title} variant="card" />

      {/* Content */}
      <div className="flex flex-1 flex-col p-8">
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
      <h3 className="font-display mb-3 text-xl font-bold">
        <Link
          href={`/${lang}/projects/${project.id}`}
          className="transition-colors duration-200 hover:opacity-80"
          style={{ color: 'var(--color-on-surface)' }}
        >
          {project.title}
        </Link>
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
        {project.repoUrl && (
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
        )}
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
      </div>
    </motion.article>
  )
}
