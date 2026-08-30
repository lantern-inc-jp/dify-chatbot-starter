import StreamdownMarkdown from '@/app/components/base/streamdown-markdown'
import { extractRichCards } from './catalog'
import ServiceCard from './service-card'
import { CLIENT_CONFIG } from '@/config/client'
import { CLIENT_CARD_RENDERERS } from '@/client/renderers'

export default function RichAnswer({ content }: { content: string }) {
  const { markdown, cards } = extractRichCards(content)

  return (
    <>
      {markdown && <StreamdownMarkdown content={markdown} />}
      {cards.length > 0 && (
        <div className="mt-3">
          <div className="mb-2 text-[11px] font-medium tracking-wide text-[var(--brand-text-muted)]">{CLIENT_CONFIG.assistant.relatedLabel}</div>
          <div className="flex snap-x gap-3 overflow-x-auto pb-2 pr-2 [scrollbar-width:thin]">
            {cards.map((card) => {
              const Renderer = CLIENT_CARD_RENDERERS[card.renderer] || ServiceCard
              return <Renderer key={card.id} card={card} />
            })}
          </div>
        </div>
      )}
    </>
  )
}
