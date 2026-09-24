import { characterListSchema, characterSchema } from '@/features/users/api/character.schemas'
import type { User, UsersPage } from '@/features/users/model/user'
import type { UsersFilters } from '@/features/users/model/users-filters'
import { httpClient } from '@/shared/lib/http-client'

export async function fetchUsers(filters: UsersFilters, signal?: AbortSignal): Promise<UsersPage> {
  const response = await httpClient.get<unknown>('/characters', {
    params: {
      page: filters.page,
      limit: filters.perPage,
      name: filters.name || undefined,
      status: filters.status,
    },
    signal,
  })
  const { info, results } = characterListSchema.parse(response.data)

  return {
    data: results,
    meta: {
      page: filters.page,
      perPage: filters.perPage,
      total: info.count,
      totalPages: info.pages,
    },
  }
}

export async function updateUserName(id: number, name: string): Promise<User> {
  const response = await httpClient.patch<unknown>(`/characters/${id}`, { name })
  return characterSchema.parse(response.data)
}

export async function deleteUser(id: number): Promise<void> {
  await httpClient.delete(`/characters/${id}`)
}
