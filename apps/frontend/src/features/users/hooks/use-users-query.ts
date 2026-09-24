import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { fetchUsers } from '@/features/users/api/users.api'
import { usersQueryKeys } from '@/features/users/api/users.query-keys'
import type { UsersFilters } from '@/features/users/model/users-filters'

export function useUsersQuery(filters: UsersFilters) {
  return useQuery({
    queryKey: usersQueryKeys.list(filters),
    queryFn: ({ signal }) => fetchUsers(filters, signal),
    placeholderData: keepPreviousData,
  })
}
