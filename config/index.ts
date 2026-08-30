import type { AppInfo } from '@/types/app'
import { CLIENT_CONFIG } from './client'
export const APP_ID = process.env.NEXT_PUBLIC_APP_ID || ''
export const API_URL = process.env.NEXT_PUBLIC_API_URL || ''
export const APP_INFO: AppInfo = {
  title: CLIENT_CONFIG.brand.assistantName,
  description: CLIENT_CONFIG.brand.description,
  copyright: CLIENT_CONFIG.brand.companyName,
  privacy_policy: CLIENT_CONFIG.brand.privacyPolicyUrl,
  default_language: CLIENT_CONFIG.assistant.locale,
  disable_session_same_site: true, // set it to true if you want to embed the chatbot in an iframe
}

export const isShowPrompt = false
export const promptTemplate = ''

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
