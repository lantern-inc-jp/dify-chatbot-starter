'use client'

import type { ComponentType } from 'react'
import type { RichCardDefinition } from '@/app/components/chat/rich-content/catalog'

export type ClientCardRenderer = ComponentType<{ card: RichCardDefinition }>

// Register project-specific renderers here, for example:
// export const CLIENT_CARD_RENDERERS = { product: ProductCard }
export const CLIENT_CARD_RENDERERS: Record<string, ClientCardRenderer> = {}
