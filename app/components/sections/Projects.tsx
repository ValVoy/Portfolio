'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/data/types'
import type { Dictionary } from '@/data/i18n/fr'

const PAGE_SIZE = 3

interface ProjectsProps {
  projects: Project[]
  lang: string
  dict: Dictionary['projects']
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 72 : -72,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { duration: 0.48, ease: [0.25, 0.46, 0.45, 0.94] },
      opacity: { duration: 0.32, ease: 'easeOut' },
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -72 : 72,
    opacity: 0,
    transition: {
      x: { duration: 0.32, ease: [0.55, 0, 1, 0.45] },
      opacity: { duration: 0.2, ease: 'easeIn' },
    },
  }),
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.42,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export function Projects({ projects, lang, dict }: ProjectsProps) {
  // ── Desktop ────────────────────────────────────────────────────────────────
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const totalPages = Math.ceil(projects.length / PAGE_SIZE)
  const currentProjects = projects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const navigate = (newPage: number) => {
    if (newPage === page) return
    setDirection(newPage > page ? 1 : -1)
    setPage(newPage)
  }

  // ── Mobile / tablette ──────────────────────────────────────────────────────
  const [mobileIndex, setMobileIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    // Largeur d'une card = largeur totale scrollable / nombre de projets
    const cardWidth = el.scrollWidth / projects.length
    const index = Math.round(el.scrollLeft / cardWidth)
    setMobileIndex(Math.min(Math.max(index, 0), projects.length - 1))
  }, [projects.length])

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / projects.length
    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
    setMobileIndex(i)
  }

  return (
    <section id="projects" className="w-full py-20 lg:py-[160px]">
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

        {/* ── Mobile / tablette (< lg) ───────────────────────────────────── */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Gradient droit — indique qu'il y a plus de contenu */}
            <div
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16"
              style={{
                background: 'linear-gradient(to left, var(--color-surface) 0%, transparent 100%)',
              }}
            />

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
              style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-[75vw] flex-shrink-0 md:w-[calc(45vw)] flex"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <ProjectCard project={project} lang={lang} dict={dict} />
                </div>
              ))}
              <div className="w-4 flex-shrink-0 md:w-8" aria-hidden="true" />
            </div>
          </div>

          {/* Dots mobile */}
          <div className="mt-8 flex items-center justify-center gap-1.5">
            {projects.map((_, i) => (
              <motion.button
                key={i}
                aria-label={`Projet ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                animate={{
                  width: i === mobileIndex ? 20 : 5,
                  opacity: i === mobileIndex ? 1 : 0.3,
                }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-[5px] rounded-full"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop (lg+) ─────────────────────────────────────────────────── */}
        <div className="hidden lg:block">
          <div className="relative" style={{ minHeight: '600px' }}>
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-3 items-stretch gap-6"
              >
                {currentProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex"
                  >
                    <ProjectCard project={project} lang={lang} dict={dict} priority={page === 0} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation desktop */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <motion.button
              onClick={() => navigate(page - 1)}
              disabled={page === 0}
              aria-label={dict.prevPage}
              whileHover={page > 0 ? { scale: 1.08 } : {}}
              whileTap={page > 0 ? { scale: 0.95 } : {}}
              transition={{ duration: 0.15 }}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 disabled:pointer-events-none disabled:opacity-30"
              style={{
                backgroundColor: 'var(--color-surface-container-high)',
                color: 'var(--color-primary)',
              }}
            >
              <ChevronLeft />
            </motion.button>

            <div className="flex items-center gap-3" role="tablist" aria-label="Pages de projets">
              {Array.from({ length: totalPages }).map((_, i) => (
                <motion.button
                  key={i}
                  role="tab"
                  aria-selected={i === page}
                  aria-label={`Page ${i + 1}`}
                  onClick={() => navigate(i)}
                  animate={{
                    width: i === page ? 24 : 8,
                    opacity: i === page ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="h-2 rounded-full"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => navigate(page + 1)}
              disabled={page === totalPages - 1}
              aria-label={dict.nextPage}
              whileHover={page < totalPages - 1 ? { scale: 1.08 } : {}}
              whileTap={page < totalPages - 1 ? { scale: 0.95 } : {}}
              transition={{ duration: 0.15 }}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 disabled:pointer-events-none disabled:opacity-30"
              style={{
                backgroundColor: 'var(--color-surface-container-high)',
                color: 'var(--color-primary)',
              }}
            >
              <ChevronRight />
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  )
}
