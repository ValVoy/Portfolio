# Build multi-etages pour deploiement Coolify (Next.js en sortie standalone).
#
# Gabarit repris du CRM Studio Movimento, avec une difference assumee : base
# Debian (node:24-slim) et non Alpine. Le Portfolio depend de deux binaires
# natifs compiles pour la glibc, et Alpine (musl) les fait tomber chacun a sa
# maniere :
#
# 1. lightningcss-linux-x64-gnu, dependance optionnelle tiree par Tailwind v4.
#    Sur musl le paquet ne s'installe pas et la compilation des styles echoue
#    ou se degrade sans le dire.
# 2. sharp, utilise au RUNTIME par l'optimiseur de next/image (trois composants
#    du site en dependent). Sur musl il faudrait la variante @img/sharp-musl,
#    et une absence ne se verrait qu'a des images non optimisees, sans erreur.
#
# Debian supprime les deux pieges au lieu de les contourner. L'image est plus
# lourde d'une centaine de megaoctets, ce qui est sans consequence ici.

FROM node:24-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1

# URL publique du site, FIGEE dans le bundle au moment du build (lib/config.ts
# et la route d'image OpenGraph des projets). Son absence ne casse rien de
# visible : le repli code dans lib/config.ts est https://valentincheron.dev,
# qui n'est pas le domaine de ce site. Constate le 24-08-2026 sur l'adresse
# temporaire, ou sitemap.xml, robots.txt, les canoniques et les images
# OpenGraph pointaient tous vers ce mauvais domaine. La valeur par defaut est
# donc le vrai domaine, pour que l'image reste juste meme si personne ne
# fournit l'argument de build.
ARG NEXT_PUBLIC_SITE_URL="https://valentincheron.fr"
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN npm run build

FROM node:24-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Ceinture de securite sur sharp, meme raisonnement que @libsql sur le CRM :
# le traceur de Next repose sur une analyse statique et l'optimiseur d'images
# charge sharp dynamiquement. S'il manque, next/image sert des images non
# optimisees sans qu'aucune erreur ne le signale. On recopie donc le paquet et
# ses binaires depuis l'etage de construction, ou npm ci les a bien installes.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/sharp ./node_modules/sharp
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@img ./node_modules/@img

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
