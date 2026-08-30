import type { CSSProperties } from 'react'
import { getLocaleOnServer } from '@/i18n/server'
import { CLIENT_CONFIG } from '@/config/client'

import './styles/globals.css'
import './styles/markdown.scss'

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  const theme = CLIENT_CONFIG.brand.colors
  const themeStyle = {
    '--brand-primary': theme.primary,
    '--brand-primary-dark': theme.primaryDark,
    '--brand-secondary': theme.secondary,
    '--brand-surface': theme.surface,
    '--brand-surface-muted': theme.surfaceMuted,
    '--brand-border': theme.border,
    '--brand-text': theme.text,
    '--brand-text-muted': theme.textMuted,
    '--brand-font': CLIENT_CONFIG.brand.fontFamily,
    '--brand-logo': `url(${CLIENT_CONFIG.brand.logo})`,
    'fontFamily': CLIENT_CONFIG.brand.fontFamily,
  } as CSSProperties
  return (
    <html lang={locale ?? 'en'} className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="h-full" style={themeStyle}>
        <div className="w-full h-full min-w-[300px] overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout
