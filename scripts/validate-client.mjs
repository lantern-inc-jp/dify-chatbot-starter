import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const configPath = path.join(root, 'client', 'client.config.json')
const errors = []

if (!fs.existsSync(configPath)) {
  console.error('client/client.config.json がありません。')
  process.exit(1)
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
const required = [
  ['clientId', config.clientId],
  ['brand.companyName', config.brand?.companyName],
  ['brand.assistantName', config.brand?.assistantName],
  ['brand.homeUrl', config.brand?.homeUrl],
  ['brand.logo', config.brand?.logo],
  ['richContent.tokenPrefix', config.richContent?.tokenPrefix],
  ['embed.chatUrl', config.embed?.chatUrl],
]

for (const [name, value] of required) {
  if (!value || typeof value !== 'string') { errors.push(`${name} は必須です。`) }
}

for (const [name, value] of Object.entries(config.brand?.colors || {})) {
  if (!/^#[0-9a-f]{6}$/i.test(value)) { errors.push(`brand.colors.${name} は #RRGGBB 形式にしてください。`) }
}

for (const [name, value] of [['brand.homeUrl', config.brand?.homeUrl], ['embed.chatUrl', config.embed?.chatUrl]]) {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') { errors.push(`${name} はHTTPS URLにしてください。`) }
  }
  catch { errors.push(`${name} が正しいURLではありません。`) }
}

const cards = config.richContent?.cards || []
const ids = cards.map(card => card.id)
if (new Set(ids).size !== ids.length) { errors.push('カードIDが重複しています。') }

for (const card of cards) {
  for (const field of ['id', 'renderer', 'title', 'href', 'image']) {
    if (!card[field]) { errors.push(`カード ${card.id || '(IDなし)'} の ${field} は必須です。`) }
  }
  if (card.image?.startsWith('/')) {
    const asset = path.join(root, 'public', card.image.slice(1))
    if (!fs.existsSync(asset)) { errors.push(`カード ${card.id} の画像がありません: ${card.image}`) }
  }
}

for (const [collection, cardIds] of Object.entries(config.richContent?.collections || {})) {
  for (const id of cardIds) {
    if (!ids.includes(id)) { errors.push(`コレクション ${collection} が未定義カード ${id} を参照しています。`) }
  }
}

for (const logo of [config.brand?.logo, config.brand?.logoWhite]) {
  if (logo?.startsWith('/') && !fs.existsSync(path.join(root, 'public', logo.slice(1)))) { errors.push(`ロゴがありません: ${logo}`) }
}

if (errors.length) {
  console.error(`クライアント設定に ${errors.length} 件の問題があります:`)
  for (const error of errors) { console.error(`- ${error}`) }
  process.exit(1)
}

console.log(`Client config OK: ${config.brand.companyName} / ${cards.length} cards`)
