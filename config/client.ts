import type { ClientConfig } from '@/types/client-config'
import rawConfig from '@/client/client.config.json'

export const CLIENT_CONFIG = rawConfig as ClientConfig
