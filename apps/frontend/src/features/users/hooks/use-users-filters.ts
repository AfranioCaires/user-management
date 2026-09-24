import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

import {
  parseUsersFilters,
  serializeUsersFilters,
  type UsersFilters,
} from '@/features/users/model/users-filters'

export interface UseUsersFiltersResult {
  readonly filters: UsersFilters
  readonly setFilters: (changes: Partial<UsersFilters>) => void
}

export function useUsersFilters(): UseUsersFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams()
  const filters = useMemo(() => parseUsersFilters(searchParams), [searchParams])

  const setFilters = useCallback(
    (changes: Partial<UsersFilters>) => {
      setSearchParams((current) =>
        serializeUsersFilters({ ...parseUsersFilters(current), ...changes }),
      )
    },
    [setSearchParams],
  )

  return { filters, setFilters }
}
