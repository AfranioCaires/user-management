import { create } from 'axios'

import { env } from '@/shared/config/env'

export const httpClient = create({
  baseURL: env.VITE_API_URL,
  timeout: 10_000,
  headers: { Accept: 'application/json' },
})
