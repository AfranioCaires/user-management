import { z } from 'zod'

export const USER_STATUSES = ['alive', 'dead', 'unknown'] as const

export const userStatusSchema = z.enum(USER_STATUSES)

export type UserStatus = z.infer<typeof userStatusSchema>

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  alive: 'Alive',
  dead: 'Dead',
  unknown: 'Unknown',
}

export interface User {
  readonly id: number
  readonly name: string
  readonly status: UserStatus
  readonly species: string
  readonly episodes: number
  readonly origin: string
  readonly createdAt: string
}

export interface UsersPage {
  readonly data: readonly User[]
  readonly meta: {
    readonly page: number
    readonly perPage: number
    readonly total: number
    readonly totalPages: number
  }
}
