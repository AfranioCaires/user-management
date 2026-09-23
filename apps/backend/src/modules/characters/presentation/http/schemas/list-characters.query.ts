import { z } from 'zod'

import {
  CHARACTER_STATUSES,
  type CharacterStatus,
} from '@/modules/characters/domain/character-status'

const statusByLowercase = new Map<string, CharacterStatus>(
  CHARACTER_STATUSES.map((status) => [status.toLowerCase(), status]),
)

export const listCharactersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  name: z.string().trim().max(100).optional(),
  status: z
    .string()
    .transform((value, context) => {
      const status = statusByLowercase.get(value.trim().toLowerCase())
      if (!status) {
        context.addIssue({
          code: 'custom',
          message: `status must be one of: ${CHARACTER_STATUSES.join(', ')}`,
        })
        return z.NEVER
      }
      return status
    })
    .optional(),
})

export type ListCharactersQuery = z.infer<typeof listCharactersQuerySchema>
