'use client'

import type { FC } from 'react'
import React from 'react'
import { CLIENT_CONFIG } from '@/config/client'

export interface IHeaderProps {
  title: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
  onQuickAction?: (message: string) => void
}

const Header: FC<IHeaderProps> = ({ title, onCreateNewChat, onQuickAction }) => {
  const { brand, assistant } = CLIENT_CONFIG

  return (
    <div className="shrink-0">
      <div className="relative px-5 py-3.5" style={{ background: `linear-gradient(145deg, ${brand.colors.secondary}, ${brand.colors.primary})` }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur">
            <img src={brand.logoWhite} alt="" className="h-6 w-6 object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-bold leading-tight text-white">{title}</div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-200 shadow-[0_0_6px_rgba(167,243,208,.7)]" />
              {assistant.onlineLabel}
            </div>
          </div>
          <button type="button" aria-label="新しい会話を始める" onClick={onCreateNewChat} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xl text-white transition hover:bg-white/25">＋</button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-[var(--brand-border)] bg-[var(--brand-surface-muted)] px-4 py-2.5">
        {assistant.quickActions.map(action => (
          <button
            type="button"
            key={action.label}
            onClick={() => onQuickAction?.(action.message)}
            className="shrink-0 rounded-full border border-[var(--brand-border)] bg-white px-3.5 py-1.5 text-xs text-[var(--brand-text)] shadow-sm transition hover:border-[var(--brand-primary)]"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default React.memo(Header)
