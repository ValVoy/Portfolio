import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const isFr = lang === 'fr'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0e0e10',
          padding: '80px',
        }}
      >
        {/* Badge */}
        <p
          style={{
            color: '#94aaff',
            fontSize: 18,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: '0 0 24px',
            fontFamily: 'sans-serif',
          }}
        >
          Portfolio
        </p>

        {/* Name */}
        <h1
          style={{
            color: '#f6f3f5',
            fontSize: 80,
            fontWeight: 700,
            margin: '0 0 20px',
            fontFamily: 'sans-serif',
            letterSpacing: '-0.02em',
          }}
        >
          Valentin Chéron
        </h1>

        {/* Title */}
        <p
          style={{
            color: '#acaaad',
            fontSize: 30,
            margin: 0,
            fontFamily: 'sans-serif',
          }}
        >
          {isFr ? 'Développeur web fullstack junior' : 'Junior fullstack web developer'}
        </p>

        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse at center, rgba(148,170,255,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
