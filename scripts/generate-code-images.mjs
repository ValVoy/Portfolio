/**
 * Génère des visuels "code screenshot" pour Chatbot OpenAI et Crazy Scrap
 * Usage : node scripts/generate-code-images.mjs  (depuis Portfolio/)
 */

import sharp from '../app/node_modules/sharp/lib/index.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'app', 'public', 'projects')

// Palette "Kinetic Luminescence" — fond dark terminal
const BG      = '#12101a'   // surface
const BG_LINE = '#1a1825'   // surface légèrement plus claire (lignes paires)
const C_NUM   = '#4d4b6b'   // numéros de ligne
const C_KW    = '#94aaff'   // keywords (primary)
const C_STR   = '#a5f0c8'   // strings (vert doux)
const C_CMT   = '#4d4b6b'   // commentaires
const C_FN    = '#e8b4fb'   // fonctions (violet doux)
const C_VAR   = '#f6f3f5'   // variables (on-surface)
const C_NUM2  = '#ffb86c'   // nombres
const C_OP    = '#acaaad'   // opérateurs / ponctuation

// Dimensions
const W = 1200
const H = 628
const PAD_X = 56
const HEADER_H = 48   // hauteur de la barre dots + titre
const LINE_H = 27
const FONT_SIZE = 16
const NUM_W = 44
const CHAR_W = 9.62   // largeur d'un caractère monospace à font-size 16

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Construit un SVG de code depuis un tableau de tokens colorisés.
 * @param {Array<{text: string, color: string}[]>} lines — tableau de lignes, chaque ligne = tableau de spans
 */
function buildSVG(lines, title) {
  // Bande header
  const headerBand = `<rect x="0" y="0" width="${W}" height="${HEADER_H}" fill="${BG_LINE}"/>`

  // Séparateur sous header
  const separator = `<rect x="0" y="${HEADER_H}" width="${W}" height="1" fill="${C_NUM}"/>`

  // Dots style macOS
  const dots = `
    <circle cx="${PAD_X}" cy="${Math.round(HEADER_H / 2)}" r="5.5" fill="#ff5f57"/>
    <circle cx="${PAD_X + 18}" cy="${Math.round(HEADER_H / 2)}" r="5.5" fill="#ffbd2e"/>
    <circle cx="${PAD_X + 36}" cy="${Math.round(HEADER_H / 2)}" r="5.5" fill="#28c840"/>
    <text x="${PAD_X + 60}" y="${Math.round(HEADER_H / 2) + 5}" font-family="monospace" font-size="12" fill="${C_CMT}">${esc(title)}</text>
  `

  // Bandes de fond alternées pour les lignes de code
  const bands = lines.map((_, i) => {
    const y = HEADER_H + 1 + i * LINE_H
    const fill = i % 2 === 0 ? BG : BG_LINE
    return `<rect x="0" y="${y}" width="${W}" height="${LINE_H}" fill="${fill}"/>`
  }).join('\n')

  // Lignes de code
  const CODE_START_X = PAD_X + NUM_W + 12   // x de début du code après le numéro de ligne
  const codeLines = lines.map((spans, i) => {
    const baseline = HEADER_H + 1 + i * LINE_H + Math.round(LINE_H * 0.70)
    const lineNum = `<text x="${PAD_X + NUM_W}" y="${baseline}" font-family="monospace" font-size="${FONT_SIZE - 2}" fill="${C_NUM}" text-anchor="end">${i + 1}</text>`

    let xCursor = CODE_START_X
    const spanEls = spans.map(({ text, color }) => {
      if (!text) return ''
      const el = `<text x="${xCursor}" y="${baseline}" font-family="monospace" font-size="${FONT_SIZE}" fill="${color}">${esc(text)}</text>`
      xCursor += text.length * CHAR_W
      return el
    }).filter(Boolean).join('\n')

    return lineNum + '\n' + spanEls
  }).join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${headerBand}
  ${separator}
  ${dots}
  ${bands}
  ${codeLines}
</svg>`
}

// ─────────────────────────────────────────────────────────────────────────────
// CHATBOT OPENAI
// ─────────────────────────────────────────────────────────────────────────────

const chatbotLines = [
  // require 'openai'
  [{ text: 'require ', color: C_KW }, { text: "'openai'", color: C_STR }],
  // blank
  [{ text: '', color: C_VAR }],
  // # Initialisation du client OpenAI
  [{ text: '# Initialisation du client OpenAI', color: C_CMT }],
  [{ text: 'client ', color: C_VAR }, { text: '= ', color: C_OP }, { text: 'OpenAI::Client.new', color: C_FN }, { text: '(', color: C_OP }],
  [{ text: '  access_token: ', color: C_VAR }, { text: 'ENV', color: C_KW }, { text: "[", color: C_OP }, { text: "'OPENAI_API_KEY'", color: C_STR }, { text: ']', color: C_OP }],
  [{ text: ')', color: C_OP }],
  [{ text: '', color: C_VAR }],
  // messages history
  [{ text: 'messages ', color: C_VAR }, { text: '= ', color: C_OP }, { text: '[', color: C_OP }, { text: '{ role: ', color: C_VAR }, { text: "'system'", color: C_STR }, { text: ', content: ', color: C_VAR }, { text: "'Tu es un assistant.'", color: C_STR }, { text: ' }]', color: C_OP }],
  [{ text: '', color: C_VAR }],
  // loop
  [{ text: 'loop ', color: C_KW }, { text: 'do', color: C_KW }],
  [{ text: '  print ', color: C_FN }, { text: "'> '", color: C_STR }],
  [{ text: '  input ', color: C_VAR }, { text: '= ', color: C_OP }, { text: 'gets', color: C_FN }, { text: '.chomp', color: C_FN }],
  [{ text: '  break ', color: C_KW }, { text: 'if ', color: C_KW }, { text: "input ", color: C_VAR }, { text: '== ', color: C_OP }, { text: "'exit'", color: C_STR }],
  [{ text: '', color: C_VAR }],
  [{ text: '  messages ', color: C_VAR }, { text: '<< ', color: C_OP }, { text: '{ role: ', color: C_VAR }, { text: "'user'", color: C_STR }, { text: ', content: input }', color: C_VAR }],
  [{ text: '  response ', color: C_VAR }, { text: '= ', color: C_OP }, { text: 'client.chat', color: C_FN }, { text: '(', color: C_OP }],
  [{ text: "    parameters: { model: ", color: C_VAR }, { text: "'gpt-3.5-turbo'", color: C_STR }, { text: ', messages: messages }', color: C_VAR }],
  [{ text: '  )', color: C_OP }],
  [{ text: '  reply ', color: C_VAR }, { text: '= ', color: C_OP }, { text: 'response.dig', color: C_FN }, { text: "('choices', 0, 'message', 'content')", color: C_STR }],
  [{ text: '  puts reply', color: C_FN }],
  [{ text: 'end', color: C_KW }],
]

console.log('🤖  chatbot-openai.webp…')
const chatbotSVG = buildSVG(chatbotLines, 'chatbot.rb')
await sharp(Buffer.from(chatbotSVG))
  .resize(W, H)
  .webp({ quality: 90 })
  .toFile(path.join(OUT, 'chatbot-openai.webp'))

// ─────────────────────────────────────────────────────────────────────────────
// CRAZY SCRAP
// ─────────────────────────────────────────────────────────────────────────────

const scrapLines = [
  [{ text: 'require ', color: C_KW }, { text: "'nokogiri'", color: C_STR }],
  [{ text: 'require ', color: C_KW }, { text: "'open-uri'", color: C_STR }],
  [{ text: 'require ', color: C_KW }, { text: "'csv'", color: C_STR }],
  [{ text: '', color: C_VAR }],
  [{ text: '# URL cible', color: C_CMT }],
  [{ text: 'URL ', color: C_VAR }, { text: '= ', color: C_OP }, { text: "'https://books.toscrape.com'", color: C_STR }],
  [{ text: '', color: C_VAR }],
  [{ text: 'def ', color: C_KW }, { text: 'scrape_books', color: C_FN }, { text: '(url)', color: C_VAR }],
  [{ text: '  doc ', color: C_VAR }, { text: '= ', color: C_OP }, { text: 'Nokogiri::HTML', color: C_FN }, { text: '(', color: C_OP }, { text: 'URI.open', color: C_FN }, { text: '(url))', color: C_VAR }],
  [{ text: '', color: C_VAR }],
  [{ text: '  doc.css', color: C_FN }, { text: "('article.product_pod')", color: C_STR }, { text: '.map ', color: C_KW }, { text: 'do ', color: C_KW }, { text: '|book|', color: C_VAR }],
  [{ text: '    {', color: C_OP }],
  [{ text: '      title:  book.at_css', color: C_FN }, { text: "('h3 a')['title']", color: C_STR }, { text: ',', color: C_OP }],
  [{ text: '      price:  book.at_css', color: C_FN }, { text: "('.price_color')", color: C_STR }, { text: '.text,', color: C_FN }],
  [{ text: '      rating: book.at_css', color: C_FN }, { text: "('p.star-rating')['class']", color: C_STR }, { text: '.split.last', color: C_FN }],
  [{ text: '    }', color: C_OP }],
  [{ text: '  end', color: C_KW }],
  [{ text: 'end', color: C_KW }],
  [{ text: '', color: C_VAR }],
  [{ text: 'books ', color: C_VAR }, { text: '= ', color: C_OP }, { text: 'scrape_books', color: C_FN }, { text: '(URL)', color: C_VAR }],
  [{ text: 'puts ', color: C_FN }, { text: '"#{books.count} livres collectés"', color: C_STR }],
]

console.log('🕷️  crazy-scrap.webp…')
const scrapSVG = buildSVG(scrapLines, 'scraper.rb')
await sharp(Buffer.from(scrapSVG))
  .resize(W, H)
  .webp({ quality: 90 })
  .toFile(path.join(OUT, 'crazy-scrap.webp'))

console.log('\n✅  Visuels générés → app/public/projects/')
