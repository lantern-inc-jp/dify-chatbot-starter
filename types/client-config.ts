export interface ClientConfig {
  schemaVersion: 1
  clientId: string
  brand: {
    companyName: string
    assistantName: string
    description: string
    homeUrl: string
    privacyPolicyUrl: string
    logo: string
    logoWhite: string
    fontFamily: string
    colors: {
      primary: string
      primaryDark: string
      secondary: string
      surface: string
      surfaceMuted: string
      border: string
      text: string
      textMuted: string
    }
  }
  assistant: {
    locale: 'en' | 'es' | 'zh-Hans' | 'ja' | 'fr'
    onlineLabel: string
    relatedLabel: string
    citationLabel: string
    quickActions: Array<{ label: string, message: string }>
  }
  richContent: {
    tokenPrefix: string
    collections: Record<string, string[]>
    cards: RichCardConfig[]
  }
  embed: {
    chatUrl: string
    greeting: string
    position: 'left' | 'right'
    offsetX: number
    offsetY: number
    panelWidth: number
    panelHeight: number
  }
  attribution: {
    show: boolean
    label: string
    url: string
  }
}

export interface RichCardConfig {
  id: string
  renderer: 'card' | string
  eyebrow: string
  title: string
  description: string
  href: string
  ctaLabel: string
  image: string
  imageAlt: string
}
