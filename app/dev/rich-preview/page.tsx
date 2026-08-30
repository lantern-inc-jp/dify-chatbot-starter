import { notFound } from 'next/navigation'
import CitationList from '@/app/components/chat/citation-list'
import RichAnswer from '@/app/components/chat/rich-content'
import { CLIENT_CONFIG } from '@/config/client'

export default function RichPreviewPage() {
  if (process.env.NODE_ENV !== 'development') { notFound() }

  return (
    <main className="min-h-screen bg-[var(--brand-surface-muted)] px-4 py-10 text-[var(--brand-text)]">
      <div className="mx-auto max-w-md rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-5 shadow-xl">
        <div className="mb-4 text-xs font-semibold tracking-[0.16em] text-[var(--brand-primary)]">RICH ANSWER PREVIEW</div>
        <RichAnswer content={`${CLIENT_CONFIG.brand.companyName}のサービスをご案内します。\n\n[公式サイトを見る](${CLIENT_CONFIG.brand.homeUrl})\n\n[[${CLIENT_CONFIG.richContent.tokenPrefix}:services]]`} />
        <CitationList items={[{
          content: `${CLIENT_CONFIG.brand.companyName}のサービス概要を参照しました。`,
          data_source_type: 'upload_file',
          dataset_id: 'preview-dataset',
          dataset_name: '公式サイト',
          document_id: 'preview-document',
          document_name: 'サービス情報',
          hit_count: 1,
          index_node_hash: 'preview-index',
          score: 1,
          segment_id: 'preview-segment',
          segment_position: 1,
          url: CLIENT_CONFIG.brand.homeUrl,
          word_count: 20,
        }]} />
      </div>
    </main>
  )
}
