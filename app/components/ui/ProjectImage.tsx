import Image from 'next/image'

interface ProjectImageProps {
  image?: string
  title: string
  /** 'card' = thumbnail 16:9 dans une carte | 'detail' = visuel large pleine largeur */
  variant: 'card' | 'detail'
  priority?: boolean
}

function initials(title: string): string {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function ProjectImage({ image, title, variant, priority = false }: ProjectImageProps) {
  const isDetail = variant === 'detail'

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: isDetail ? '16 / 7' : '16 / 9',
    borderRadius: isDetail ? '1.5rem' : '1rem 1rem 0 0',
    overflow: 'hidden',
  }

  if (image) {
    return (
      <div style={wrapperStyle}>
        <Image
          src={image}
          alt={title}
          fill
          sizes={isDetail ? '(max-width: 768px) 100vw, 896px' : '(max-width: 768px) 100vw, 400px'}
          className="object-cover"
          priority={isDetail || priority}
        />
      </div>
    )
  }

  // Placeholder
  const abbr = initials(title)

  return (
    <div style={wrapperStyle}>
      {/* Fond dégradé */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, var(--color-primary-container) 0%, var(--color-surface-container-high) 60%, var(--color-surface-container-highest) 100%)',
        }}
      />
      {/* Motif de points subtil */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, color-mix(in srgb, var(--color-primary) 15%, transparent) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Initiales */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            fontWeight: 700,
            fontSize: isDetail ? '5rem' : '2.5rem',
            letterSpacing: '-0.02em',
            color: 'var(--color-primary)',
            opacity: 0.4,
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          {abbr}
        </span>
      </div>
    </div>
  )
}
