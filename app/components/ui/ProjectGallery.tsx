'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectImage } from './ProjectImage'

interface ProjectGalleryProps {
  image?: string
  images?: string[]
  title: string
}

// ─── Icônes ──────────────────────────────────────────────────────────────────

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function IconChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function IconExpand() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export function ProjectGallery({ image, images, title }: ProjectGalleryProps) {
  const allImages = images && images.length > 0 ? images : image ? [image] : []
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const openLightbox = useCallback((index: number) => {
    setActive(index)
    setLightbox(true)
  }, [])

  const closeLightbox = useCallback(() => setLightbox(false), [])

  // Bloquer le scroll body quand lightbox ouverte
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  if (allImages.length === 0) {
    return <ProjectImage image={undefined} title={title} variant="detail" />
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* ── Image principale ── */}
        <button
          onClick={() => openLightbox(active)}
          className="group relative block w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          style={{ borderRadius: '1.5rem', aspectRatio: '16 / 9' }}
          aria-label="Voir en plein écran"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={allImages[active]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={allImages[active]}
                alt={`${title} · aperçu ${active + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 896px"
                className="object-cover"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay hover */}
          <div className="absolute inset-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            {/* Compteur */}
            {allImages.length > 1 && (
              <span
                className="font-body rounded-lg px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-surface) 75%, transparent)', color: 'var(--color-on-surface-variant)' }}
              >
                {active + 1} / {allImages.length}
              </span>
            )}
            {/* Hint plein écran */}
            <span
              className="ml-auto flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-surface) 75%, transparent)', color: 'var(--color-on-surface)' }}
            >
              <IconExpand />
              Plein écran
            </span>
          </div>
        </button>

        {/* ── Strip thumbnails ── */}
        {allImages.length > 1 && (
          <ThumbnailStrip
            images={allImages}
            active={active}
            onSelect={setActive}
          />
        )}
      </div>

      <Lightbox
        images={allImages}
        initialIndex={active}
        open={lightbox}
        onClose={closeLightbox}
      />
    </>
  )
}

// ─── Strip de thumbnails ──────────────────────────────────────────────────────

interface ThumbnailStripProps {
  images: string[]
  active: number
  onSelect: (i: number) => void
}

function ThumbnailStrip({ images, active, onSelect }: ThumbnailStripProps) {
  const stripRef = useRef<HTMLDivElement>(null)

  // Scroll automatique vers la thumbnail active
  useEffect(() => {
    const el = stripRef.current?.children[active] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [active])

  return (
    <div
      ref={stripRef}
      className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
      role="list"
      aria-label="Miniatures"
    >
      {images.map((src, i) => (
        <button
          key={src}
          onClick={() => onSelect(i)}
          aria-label={`Image ${i + 1}`}
          aria-pressed={i === active}
          role="listitem"
          className="relative flex-shrink-0 overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          style={{
            width: 'clamp(72px, 10vw, 112px)',
            aspectRatio: '16 / 9',
            borderRadius: '0.625rem',
            border: i === active
              ? '2px solid var(--color-primary)'
              : '2px solid color-mix(in srgb, var(--color-outline) 30%, transparent)',
            opacity: i === active ? 1 : 0.55,
            scrollSnapAlign: 'start',
          }}
        >
          <Image src={src} alt="" fill sizes="112px" className="object-cover" />
        </button>
      ))}
    </div>
  )
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: string[]
  initialIndex: number
  open: boolean
  onClose: () => void
}

function Lightbox({ images, initialIndex, open, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex)
  const [direction, setDirection] = useState(0)
  const dragStartX = useRef(0)

  useEffect(() => { setCurrent(initialIndex) }, [initialIndex])

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const prev = useCallback(() => {
    if (images.length <= 1) return
    goTo((current - 1 + images.length) % images.length, -1)
  }, [current, images.length, goTo])

  const next = useCallback(() => {
    if (images.length <= 1) return
    goTo((current + 1) % images.length, 1)
  }, [current, images.length, goTo])

  // Navigation clavier
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, prev, next])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: 'rgba(5, 5, 10, 0.96)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        >
          {/* ── Barre haute ── */}
          <div
            className="flex flex-shrink-0 items-center justify-between px-5 py-4 sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-body text-sm tabular-nums" style={{ color: 'var(--color-on-surface-variant)' }}>
              {current + 1} <span style={{ color: 'var(--color-outline)' }}>/</span> {images.length}
            </span>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-150"
              style={{
                backgroundColor: 'color-mix(in srgb, var(--color-surface-container) 60%, transparent)',
                color: 'var(--color-on-surface)',
              }}
            >
              <IconClose />
            </button>
          </div>

          {/* ── Zone image + flèches ── */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Flèche gauche — desktop uniquement */}
            {images.length > 1 && (
              <button
                onClick={prev}
                aria-label="Image précédente"
                className="absolute left-2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-surface-container) 70%, transparent)',
                  color: 'var(--color-on-surface)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <IconChevronLeft />
              </button>
            )}

            {/* Image avec swipe */}
            <motion.div
              className="w-full max-w-5xl cursor-grab active:cursor-grabbing select-none"
              drag={images.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={(_, info) => { dragStartX.current = info.point.x }}
              onDragEnd={(_, info) => {
                const delta = info.point.x - dragStartX.current
                const threshold = 50
                if (delta < -threshold) next()
                else if (delta > threshold) prev()
              }}
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
                  className="w-full"
                  style={{ pointerEvents: 'none' }}
                >
                  <Image
                    src={images[current]}
                    alt={`Image ${current + 1}`}
                    width={1400}
                    height={2800}
                    className="mx-auto h-auto w-full rounded-xl"
                    style={{ maxHeight: 'calc(100svh - 180px)', objectFit: 'contain' }}
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Flèche droite — desktop uniquement */}
            {images.length > 1 && (
              <button
                onClick={next}
                aria-label="Image suivante"
                className="absolute right-2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--color-surface-container) 70%, transparent)',
                  color: 'var(--color-on-surface)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <IconChevronRight />
              </button>
            )}
          </div>

          {/* ── Barre basse ── */}
          <div
            className="flex flex-shrink-0 justify-center py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dots si 1-2 images, thumbnails si ≥ 3 */}
            {images.length > 1 && images.length < 3 ? (
              <div className="flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    aria-label={`Image ${i + 1}`}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      backgroundColor: i === current ? 'var(--color-primary)' : 'color-mix(in srgb, var(--color-outline) 50%, transparent)',
                    }}
                  />
                ))}
              </div>
            ) : images.length >= 3 ? (
              <div className="flex gap-2 overflow-x-auto px-6 pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => goTo(i, i > current ? 1 : -1)}
                    aria-label={`Image ${i + 1}`}
                    className="relative flex-shrink-0 overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                    style={{
                      width: 64,
                      height: 40,
                      borderRadius: '0.375rem',
                      border: i === current
                        ? '2px solid var(--color-primary)'
                        : '2px solid color-mix(in srgb, var(--color-outline) 30%, transparent)',
                      opacity: i === current ? 1 : 0.45,
                    }}
                  >
                    <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
