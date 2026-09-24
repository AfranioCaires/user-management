import { z } from 'zod'

export const editUserFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.')
    .max(100, 'Name must have at most 100 characters.'),
})

export type EditUserFormValues = z.infer<typeof editUserFormSchema>
