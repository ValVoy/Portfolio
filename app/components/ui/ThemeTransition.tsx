'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { THEME_DURATION_S as DURATION, THEME_DURATION_MS } from '@/lib/theme-constants'

// Palettes de ciel pour l'animation du fond page
const SKY_TO_LIGHT = [
  '#0e0e10', // nuit
  '#1a0a2e', // violet nocturne
  '#4a1830', // crépuscule rouge
  '#c0392b', // coucher rouge
  '#e67e22', // orange
  '#f39c12', // doré
  '#fde8c8', // lueur chaude
  '#f5f1eb', // crème (valeur light --color-surface)
]

const SKY_TO_DARK = [
  '#f5f1eb', // crème (light)
  '#fde8c8', // après-midi
  '#f39c12', // doré
  '#e67e22', // orange
  '#8e44ad', // violet dusk
  '#2c1654', // nuit naissante
  '#1a0a2e', // nuit profonde
  '#0e0e10', // nuit (dark)
]

// Interpolation hex multi-stops via RAF (garanti 60fps)
function hexToRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]
}

function lerpColors(palette: string[], progress: number): string {
  const p = Math.min(Math.max(progress, 0), 0.9999)
  const scaled = p * (palette.length - 1)
  const i = Math.floor(scaled)
  const t = scaled - i
  const [r1, g1, b1] = hexToRgb(palette[i])
  const [r2, g2, b2] = hexToRgb(palette[i + 1])
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`
}

// Easing easeInOutSine pour la fluidité maximale
function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

// ──────────────────────────────────────────────────────────────────────────────
// Le corps céleste : ÉNORME sphère de lumière, centre TOUJOURS hors viewport.
// On ne voit que le halo qui déborde sur les bords de la page.
// ──────────────────────────────────────────────────────────────────────────────
function CelestialGlow({ direction }: { direction: 'to-light' | 'to-dark' }) {
  const [positions, setPositions] = useState<{ x: number[]; y: number[] } | null>(null)

  useEffect(() => {
    const W = window.innerWidth
    const H = window.innerHeight

    // Arc coucher de soleil : descend du ciel (haut-centre) vers l'horizon droit puis sous la page
    const toDark = {
      x: [W * 0.5, W * 0.9, W * 1.1, W * 0.7],
      y: [-H * 0.6, -H * 0.1, H * 0.5, H * 1.4],
    }

    // Arc lever de soleil : inverse (monte depuis sous la page vers le ciel)
    const toLight = {
      x: [W * 0.7, W * 1.1, W * 0.9, W * 0.5],
      y: [H * 1.4, H * 0.5, -H * 0.1, -H * 0.6],
    }

    setPositions(direction === 'to-dark' ? toDark : toLight)
  }, [direction])

  if (!positions) return null

  const isDark = direction === 'to-dark'

  // Taille de la boule : 2.5× la largeur du viewport → le bord visible n'entre jamais à l'écran
  const size = typeof window !== 'undefined' ? window.innerWidth * 2.5 : 3600
  const offset = -size / 2 // pour centrer l'élément sur son point d'ancrage

  const gradient = isDark
    ? `radial-gradient(circle, rgba(253,186,116,1) 0%, rgba(234,88,12,0.7) 12%, rgba(220,38,38,0.35) 25%, rgba(180,20,20,0.1) 38%, transparent 50%)`
    : `radial-gradient(circle, rgba(255,240,160,1) 0%, rgba(253,186,116,0.7) 12%, rgba(251,146,60,0.3) 25%, rgba(200,120,40,0.08) 38%, transparent 50%)`

  return (
    <motion.div
      className="pointer-events-none fixed z-[9997]"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: gradient,
        top: 0,
        left: 0,
      }}
      initial={{ x: positions.x[0] + offset, y: positions.y[0] + offset }}
      animate={{
        x: positions.x.map((v) => v + offset),
        y: positions.y.map((v) => v + offset),
      }}
      transition={{
        duration: DURATION,
        times: [0, 0.33, 0.67, 1],
        ease: [0.37, 0, 0.63, 1], // easeInOutSine cubic-bezier
      }}
    />
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Composant principal : orchestre l'animation RAF + le corps céleste
// ──────────────────────────────────────────────────────────────────────────────
export function ThemeTransition() {
  const { isAnimating, direction } = useTheme()
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const colors = direction === 'to-light' ? SKY_TO_LIGHT : SKY_TO_DARK

  useEffect(() => {
    if (!isAnimating) return

    const durationMs = THEME_DURATION_MS

    function tick(timestamp: number) {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const rawProgress = Math.min(elapsed / durationMs, 1)
      const progress = easeInOutSine(rawProgress)

      document.documentElement.style.setProperty('--color-surface', lerpColors(colors, progress))

      if (rawProgress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        document.documentElement.style.removeProperty('--color-surface')
        startRef.current = null
      }
    }

    startRef.current = null
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      document.documentElement.style.removeProperty('--color-surface')
      startRef.current = null
    }
  }, [isAnimating, direction]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AnimatePresence>
      {isAnimating && (
        <CelestialGlow key={`celestial-${direction}`} direction={direction} />
      )}
    </AnimatePresence>
  )
}
