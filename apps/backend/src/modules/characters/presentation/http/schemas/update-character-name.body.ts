import { z } from 'zod'

export const updateCharacterNameBodySchema = z.object({
  name: z.string().trim().min(1).max(100),
})

export type UpdateCharacterNameBody = z.infer<typeof updateCharacterNameBodySchema>
