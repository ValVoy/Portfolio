/**
 * URL de base du site — doit être définie via NEXT_PUBLIC_SITE_URL en production.
 * Utilisée pour les canonicals, métadonnées Open Graph, sitemap et robots.txt.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio.vercel.app'
