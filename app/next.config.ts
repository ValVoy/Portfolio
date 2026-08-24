import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome pour le conteneur : Coolify lance `node server.js` sur
  // .next/standalone. Sans cette ligne, ce dossier ne serait pas produit et
  // le conteneur demarrerait sans serveur.
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self'",
              "connect-src 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
};

export default nextConfig;
