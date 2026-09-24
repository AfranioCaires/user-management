import { z } from 'zod'

import { type UserStatus, userStatusSchema } from './user'

export const PER_PAGE_OPTIONS = [10, 15, 20, 50] as const

export const DEFAULT_PER_PAGE = 15

export interface UsersFilters {
  readonly page: number
  readonly perPage: number
  readonly name: string
  readonly status?: UserStatus | undefined
}

const usersFiltersSchema = z.object({
  page: z.coerce.number().int().min(1).catch(1),
  perPage: z.coerce
    .number()
    .int()
    .refine((value) => PER_PAGE_OPTIONS.some((option) => option === value))
    .catch(DEFAULT_PER_PAGE),
  name: z.string().trim().max(100).catch(''),
  status: userStatusSchema.optional().catch(undefined),
})

export function parseUsersFilters(params: URLSearchParams): UsersFilters {
  return usersFiltersSchema.parse({
    page: params.get('page') ?? undefined,
    perPage: params.get('perPage') ?? undefined,
    name: params.get('name') ?? '',
    status: params.get('status') ?? undefined,
  })
}

export function serializeUsersFilters(filters: UsersFilters): URLSearchParams {
  const params = new URLSearchParams()
  if (filters.page > 1) {
    params.set('page', String(filters.page))
  }
  if (filters.perPage !== DEFAULT_PER_PAGE) {
    params.set('perPage', String(filters.perPage))
  }
  if (filters.name) {
    params.set('name', filters.name)
  }
  if (filters.status) {
    params.set('status', filters.status)
  }
  return params
}
