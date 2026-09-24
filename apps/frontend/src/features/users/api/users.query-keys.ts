import type { UsersFilters } from '@/features/users/model/users-filters'

export const usersQueryKeys = {
  all: ['users'] as const,
  lists: () => [...usersQueryKeys.all, 'list'] as const,
  list: (filters: UsersFilters) => [...usersQueryKeys.lists(), filters] as const,
}
