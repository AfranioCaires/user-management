import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

const MAX_RETRIES = 2

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          const status = isAxiosError(error) ? error.response?.status : undefined
          const isClientError = status !== undefined && status >= 400 && status < 500
          return !isClientError && failureCount < MAX_RETRIES
        },
      },
      mutations: {
        retry: false,
      },
    },
  })
}
