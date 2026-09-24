import { z } from 'zod'

import { userStatusSchema } from './user'

export const usersFiltersFormSchema = z.object({
  name: z.string().trim().max(100, 'Name must have at most 100 characters.'),
  status: z.union([userStatusSchema, z.literal('')]),
})

export type UsersFiltersFormValues = z.infer<typeof usersFiltersFormSchema>
