import { z } from 'zod'

import type { User, UserStatus } from '@/features/users/model/user'

const STATUS_FROM_API: Record<'Alive' | 'Dead' | 'unknown', UserStatus> = {
  Alive: 'alive',
  Dead: 'dead',
  unknown: 'unknown',
}

export const characterSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string(),
    status: z.enum(['Alive', 'Dead', 'unknown']),
    species: z.string(),
    origin: z.object({ name: z.string() }),
    episode: z.array(z.string()),
    created: z.iso.datetime(),
  })
  .transform((character): User => ({
    id: character.id,
    name: character.name,
    status: STATUS_FROM_API[character.status],
    species: character.species,
    episodes: character.episode.length,
    origin: character.origin.name,
    createdAt: character.created,
  }))

export const characterListSchema = z.object({
  info: z.object({
    count: z.number().int().nonnegative(),
    pages: z.number().int().nonnegative(),
  }),
  results: z.array(characterSchema),
})
