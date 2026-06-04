import Link from 'next/link'

const MONO = "'SF Mono', 'Fira Code', 'Fira Mono', 'Consolas', monospace"

export default function RootNotFound() {
  return (
    <html lang="fr" data-theme="dark">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          backgroundColor: '#0e0e10',
          color: '#f6f3f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: MONO,
        }}
      >
        <div style={{ width: '100%', maxWidth: '36rem' }}>
          {/* Terminal window */}
          <div
            style={{
              backgroundColor: '#1a1a1e',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
            }}
          >
            {/* macOS header */}
            <div
              style={{
                backgroundColor: '#232327',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28ca41', display: 'inline-block' }} />
              <span
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: MONO,
                  fontSize: '11px',
                  color: '#6b6b70',
                  marginLeft: '-52px',
                }}
              >
                bash · 404 not found
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px 28px', fontSize: '14px', lineHeight: '1.7' }}>
              <div style={{ color: '#94aaff' }}>$ cd /???</div>
              <div style={{ color: '#ffb4ab' }}>bash: no such file or directory</div>
              <div style={{ height: '1.7em' }} />
              <div style={{ color: '#94aaff' }}>$ ls ~</div>
              <div style={{ color: '#acaaad' }}>home   projects   about   contact</div>
              <div style={{ height: '1.7em' }} />
              <div style={{ color: '#94aaff' }}>$ _</div>
            </div>
          </div>

          {/* CTAs */}
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            <Link
              href="/fr"
              style={{ color: '#b0c4ff', fontSize: '14px', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}
            >
              ← Retour à l&apos;accueil
            </Link>
            <Link
              href="/en"
              style={{ color: '#6b6b70', fontSize: '14px', textDecoration: 'none', fontFamily: 'Inter, sans-serif' }}
            >
              Go to /en →
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
