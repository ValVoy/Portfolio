/**
 * Script de traitement des images projets → WebP dans app/public/projects/
 * Usage : node scripts/process-images.mjs  (depuis Portfolio/)
 */

import sharp from '../app/node_modules/sharp/lib/index.js'
import { mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT     = path.join(__dirname, '..')
const THP      = path.join(ROOT, '..', 'THP')
const OUT      = path.join(ROOT, 'app', 'public', 'projects')

await mkdir(OUT, { recursive: true })

/**
 * Applique un flou gaussien sur une région rectangulaire d'un buffer image.
 * Retourne un nouveau buffer PNG avec la région floutée.
 */
async function blurRegion(inputBuf, region, sigma = 22) {
  const blurred = await sharp(inputBuf)
    .extract(region)
    .blur(sigma)
    .toBuffer()

  return sharp(inputBuf)
    .composite([{ input: blurred, top: region.top, left: region.left }])
    .toBuffer()
}

// ─────────────────────────────────────────────────────────────────────────────
// KOÏ'S STORY
// y=0-72    : navbar (logo Konishi)
// y=65-465  : jardin japonais (propre)
// y=465-865 : bassins avec koïs (propre)
// y=865-    : titre "Des koïs... Konishi"
// ─────────────────────────────────────────────────────────────────────────────
const koisHome      = path.join(THP, 'Koi_Story', 'screencapture-lnvi1e1noiilgzfjsnwe7luj-137-74-112-197-sslip-io-2026-04-15-15_00_22.png')
const koisAzukari   = path.join(THP, 'Koi_Story', 'screencapture-lnvi1e1noiilgzfjsnwe7luj-137-74-112-197-sslip-io-azukari-2026-04-15-15_00_57.png')
const koisCatalogue = path.join(THP, 'Koi_Story', 'screencapture-lnvi1e1noiilgzfjsnwe7luj-137-74-112-197-sslip-io-kois-2026-04-15-15_01_30.png')

// 1. Thumbnail carte — photo jardin+koïs uniquement (y=65-820), 0 texte, 0 branding
console.log('🐟  kois-story.webp (thumbnail)…')
await sharp(koisHome)
  .extract({ left: 0, top: 65, width: 1912, height: 755 })
  .resize(1200, 628, { fit: 'cover', position: 'centre' })
  .webp({ quality: 88 })
  .toFile(path.join(OUT, 'kois-story.webp'))

// 2. Galerie image 1 — home avec 3 zones floutées :
//    - y=0-72    : navbar (logo Konishi)
//    - y=940-1420: "issus de la lignée Konishi"
//    - y=3550-fin: prénoms Manu & Mathilde, adresse, email
console.log('🐟  kois-story-01.webp (home floutée)…')
{
  const meta = await sharp(koisHome).metadata()
  let buf = await sharp(koisHome).toBuffer()
  buf = await blurRegion(buf, { left: 0, top: 0,    width: meta.width, height: 72                 }, 28) // navbar
  buf = await blurRegion(buf, { left: 0, top: 940,  width: meta.width, height: 480              }, 28) // hero "Konishi"
  buf = await blurRegion(buf, { left: 0, top: 3150, width: meta.width, height: 450              }, 28) // section dark "La lignée Konishi" + logo
  buf = await blurRegion(buf, { left: 0, top: 3550, width: meta.width, height: meta.height - 3550 }, 28) // contact (prénoms, adresse, email)
  await sharp(buf)
    .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, 'kois-story-01.webp'))
}

// 3. Galerie image 2 — Azukari, navbar floutée
console.log('🐟  kois-story-02.webp (Azukari)…')
{
  const meta = await sharp(koisAzukari).metadata()
  let buf = await sharp(koisAzukari).toBuffer()
  buf = await blurRegion(buf, { left: 0, top: 0, width: meta.width, height: 72 }, 28)
  await sharp(buf)
    .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, 'kois-story-02.webp'))
}

// 4. Galerie image 3 — catalogue, navbar floutée
console.log('🐟  kois-story-03.webp (catalogue)…')
{
  const meta = await sharp(koisCatalogue).metadata()
  let buf = await sharp(koisCatalogue).toBuffer()
  buf = await blurRegion(buf, { left: 0, top: 0, width: meta.width, height: 72 })
  await sharp(buf)
    .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(OUT, 'kois-story-03.webp'))
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENTBRITE-V2
// ─────────────────────────────────────────────────────────────────────────────
const evDir   = path.join(THP, 'THP---EventBritev2', 'docs')
const evFiles = { '': 'dash', '01': 'dash', '02': 'events', '03': 'inscription' }

console.log('🎟️  eventbrite-v2.webp (thumbnail)…')
await sharp(path.join(evDir, 'dash.png'))
  .resize(1200, 628, { fit: 'cover', position: 'top' })
  .webp({ quality: 88 })
  .toFile(path.join(OUT, 'eventbrite-v2.webp'))

for (const [suffix, file] of Object.entries(evFiles)) {
  const src = path.join(evDir, `${file}.png`)
  if (!existsSync(src)) continue
  const name = suffix ? `eventbrite-v2-${suffix}` : null
  if (!name) continue
  console.log(`🎟️  ${name}.webp…`)
  await sharp(src)
    .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, `${name}.webp`))
}

// ─────────────────────────────────────────────────────────────────────────────
// ATOMIC DESIGN
// ─────────────────────────────────────────────────────────────────────────────
const atomicDir   = path.join(THP, 'THP---Atomic-Design-02-Molecule-Organisme', 'docs')
const atomicFiles = ['banner', 'navbar', 'cards', 'footer', 'pricing', 'register']

console.log('🧱  atomic-design.webp (thumbnail)…')
await sharp(path.join(atomicDir, 'banner.png'))
  .resize(1200, 628, { fit: 'cover', position: 'top' })
  .webp({ quality: 88 })
  .toFile(path.join(OUT, 'atomic-design.webp'))

for (const name of atomicFiles) {
  const src = path.join(atomicDir, `${name}.png`)
  if (!existsSync(src)) continue
  console.log(`🧱  atomic-design-${name}.webp…`)
  await sharp(src)
    .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, `atomic-design-${name}.webp`))
}

// ─────────────────────────────────────────────────────────────────────────────
// RPG RUBY — "Ils veulent tous ta P"
// ─────────────────────────────────────────────────────────────────────────────
const rpgDir = path.join(THP, 'THP---Ils-veulent-tous-ta-P-', 'docs')

console.log('🎮  rpg.webp (thumbnail)…')
await sharp(path.join(rpgDir, '4.png'))
  .resize(1200, 628, { fit: 'cover', position: 'top' })
  .webp({ quality: 88 })
  .toFile(path.join(OUT, 'rpg.webp'))

for (let i = 1; i <= 4; i++) {
  const src = path.join(rpgDir, `${i}.png`)
  if (!existsSync(src)) continue
  console.log(`🎮  rpg-0${i}.webp…`)
  await sharp(src)
    .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(OUT, `rpg-0${i}.webp`))
}

// ─────────────────────────────────────────────────────────────────────────────
// FREEDOC (schéma BDD — fond clair, on conserve)
// ─────────────────────────────────────────────────────────────────────────────
console.log('📄  freedoc.webp…')
await sharp(path.join(THP, 'THP---FreeDoc-Project', 'FreeDoc.png'))
  .resize(1200, 628, { fit: 'contain', background: { r: 248, g: 241, b: 241, alpha: 1 } })
  .webp({ quality: 88 })
  .toFile(path.join(OUT, 'freedoc.webp'))

console.log('\n✅  Toutes les images ont été traitées → app/public/projects/')
