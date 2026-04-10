'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/data/types'
import type { Dictionary } from '@/data/i18n/fr'

interface ProjectsProps {
  projects: Project[]
  lang: string
  dict: Dictionary['projects']
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function Projects({ projects, lang, dict }: ProjectsProps) {
  return (
    <section id="projects" className="w-full py-[160px]">
      <div className="mx-auto w-full max-w-6xl px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mb-16"
      >
        <h2
          className="font-display text-4xl font-bold tracking-tight lg:text-5xl"
          style={{ color: 'var(--color-on-surface)' }}
        >
          {dict.title}
        </h2>
        <p
          className="font-body mt-4 text-base"
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          {dict.subtitle}
        </p>
      </motion.div>

      {/* Cards grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} className="flex">
            <ProjectCard project={project} lang={lang} dict={dict} />
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  )
}
