import type { RichCardConfig } from '@/types/client-config'
import { CLIENT_CONFIG } from '@/config/client'

export type RichCardDefinition = RichCardConfig

export const richCardCatalog: Record<string, RichCardDefinition> = Object.fromEntries(
  CLIENT_CONFIG.richContent.cards.map(card => [card.id, card]),
)

const escapedPrefix = CLIENT_CONFIG.richContent.tokenPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const cardTokenPattern = new RegExp(`\\[\\[${escapedPrefix}:([a-z0-9-]+)\\]\\]`, 'gi')
const partialCardTokenPattern = new RegExp(`\\n?\\[\\[${escapedPrefix}:[a-z0-9-]*\\]?$`, 'i')

export function extractRichCards(content: string) {
  const requestedIds: string[] = []
  const markdown = content.replace(cardTokenPattern, (_token, rawId: string) => {
    const id = rawId.toLowerCase()
    requestedIds.push(...(CLIENT_CONFIG.richContent.collections[id] || [id]))
    return ''
  })
    .replace(partialCardTokenPattern, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  const cards = [...new Set(requestedIds)]
    .map(id => richCardCatalog[id])
    .filter((card): card is RichCardDefinition => !!card)

  return { markdown, cards }
}
