import { ImageResponse } from 'next/og'
import { projects } from '@/data/projects'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return new Response('Not found', { status: 404 })

  const isFr = lang === 'fr'
  const description = isFr ? project.description.fr : project.description.en

  // Limiter la description à ~100 caractères pour l'OG
  const shortDesc =
    description.length > 100 ? description.slice(0, 97) + '…' : description

  // Stack : max 5 techs affichées
  const stack = project.stack.slice(0, 5)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0e0e10',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow background */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '500px',
            background:
              'radial-gradient(ellipse at center, rgba(148,170,255,0.10) 0%, transparent 70%)',
            top: '-100px',
            right: '-100px',
          }}
        />

        {/* Top : badge + titre + description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {/* Badge projet */}
          <p
            style={{
              color: '#94aaff',
              fontSize: 16,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 28px',
              fontFamily: 'sans-serif',
            }}
          >
            {isFr ? 'Projet' : 'Project'}
          </p>

          {/* Titre */}
          <h1
            style={{
              color: '#f6f3f5',
              fontSize: project.title.length > 20 ? 64 : 80,
              fontWeight: 700,
              margin: '0 0 24px',
              fontFamily: 'sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>

          {/* Description */}
          <p
            style={{
              color: '#acaaad',
              fontSize: 24,
              margin: 0,
              fontFamily: 'sans-serif',
              lineHeight: 1.5,
              maxWidth: '800px',
            }}
          >
            {shortDesc}
          </p>
        </div>

        {/* Bottom : stack + attribution */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Stack chips */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {stack.map((tech) => (
              <span
                key={tech}
                style={{
                  background: 'rgba(148,170,255,0.12)',
                  color: '#94aaff',
                  fontSize: 15,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontFamily: 'sans-serif',
                  letterSpacing: '0.02em',
                }}
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span
                style={{
                  background: 'rgba(172,170,173,0.10)',
                  color: '#6b6b70',
                  fontSize: 15,
                  padding: '6px 16px',
                  borderRadius: '999px',
                  fontFamily: 'sans-serif',
                }}
              >
                +{project.stack.length - 5}
              </span>
            )}
          </div>

          {/* Attribution */}
          <p
            style={{
              color: '#6b6b70',
              fontSize: 18,
              margin: 0,
              fontFamily: 'sans-serif',
            }}
          >
            valentincheron.vercel.app
          </p>
        </div>
      </div>
    ),
    { ...size },
  )
}
