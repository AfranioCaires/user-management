import { QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

import { createQueryClient } from '@/app/providers/query-client'
import { Toaster } from '@/shared/ui/sonner'

export interface AppProvidersProps {
  readonly children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  )
}
