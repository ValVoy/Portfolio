'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectImage } from './ProjectImage'

interface ProjectGalleryProps {
  image?: string
  images?: string[]
  title: string
}

export function ProjectGallery({ image, images, title }: ProjectGalleryProps) {
  const allImages = images && images.length > 0 ? images : image ? [image] : []
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const closeLightbox = useCallback(() => setLightbox(false), [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox])

  // Bloquer le scroll body quand lightbox ouverte
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  if (allImages.length === 0) {
    return <ProjectImage image={undefined} title={title} variant="detail" />
  }

  if (allImages.length === 1) {
    return (
      <>
        <button
          onClick={() => setLightbox(true)}
          className="group block w-full text-left"
          aria-label="Voir en plein écran"
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 7', borderRadius: '1.5rem', overflow: 'hidden' }}>
            <Image src={allImages[0]} alt={title} fill sizes="(max-width: 768px) 100vw, 896px" className="object-cover transition-opacity duration-200 group-hover:opacity-90" priority />
            <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="rounded-lg px-3 py-1.5 text-xs font-medium backdrop-blur-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--color-surface) 70%, transparent)', color: 'var(--color-on-surface)' }}>
                Plein écran
              </span>
            </div>
          </div>
        </button>
        <Lightbox images={allImages} active={active} onClose={closeLightbox} open={lightbox} />
      </>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Image principale — cliquable */}
        <button
          onClick={() => setLightbox(true)}
          className="group block w-full text-left"
          aria-label="Voir en plein écran"
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 7', borderRadius: '1.5rem', overflow: 'hidden' }}>
            <Image
              key={allImages[active]}
              src={allImages[active]}
              alt={`${title} — aperçu ${active + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover transition-opacity duration-200 group-hover:opacity-90"
              priority={active === 0}
            />
            {/* Hint plein écran */}
            <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="rounded-lg px-3 py-1.5 text-xs font-medium backdrop-blur-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--color-surface) 70%, transparent)', color: 'var(--color-on-surface)' }}>
                Plein écran
              </span>
            </div>
          </div>
        </button>

        {/* Strip de thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
          {allImages.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1}`}
              aria-pressed={i === active}
              className="flex-shrink-0 overflow-hidden transition-all duration-200"
              style={{
                width: 96, height: 54,
                borderRadius: '0.5rem',
                border: i === active ? '2px solid var(--color-primary)' : '2px solid transparent',
                opacity: i === active ? 1 : 0.5,
                position: 'relative',
              }}
            >
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <Lightbox images={allImages} active={active} onClose={closeLightbox} open={lightbox} />
    </>
  )
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: string[]
  active: number
  open: boolean
  onClose: () => void
}

function Lightbox({ images, active, open, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(active)

  useEffect(() => { setCurrent(active) }, [active])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          {/* Bouton fermer */}
          <div className="flex flex-shrink-0 items-center justify-between px-6 py-4" onClick={(e) => e.stopPropagation()}>
            <span className="font-body text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              {current + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-surface-container) 60%, transparent)', color: 'var(--color-on-surface)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image scrollable */}
          <div
            className="flex-1 overflow-y-auto px-4 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mx-auto w-full max-w-5xl">
              <Image
                key={images[current]}
                src={images[current]}
                alt={`Image ${current + 1}`}
                width={1200}
                height={2400}
                className="w-full h-auto rounded-xl"
                style={{ display: 'block' }}
              />
            </div>
          </div>

          {/* Strip thumbnails (si plusieurs images) */}
          {images.length > 1 && (
            <div className="flex flex-shrink-0 justify-center gap-2 px-6 py-4" onClick={(e) => e.stopPropagation()}>
              {images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setCurrent(i)}
                  aria-label={`Image ${i + 1}`}
                  className="flex-shrink-0 overflow-hidden transition-all duration-200"
                  style={{
                    width: 72, height: 40,
                    borderRadius: '0.375rem',
                    border: i === current ? '2px solid var(--color-primary)' : '2px solid rgba(255,255,255,0.15)',
                    opacity: i === current ? 1 : 0.5,
                    position: 'relative',
                  }}
                >
                  <Image src={src} alt="" fill sizes="72px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
