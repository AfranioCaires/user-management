import { z } from 'zod'

export const characterIdParamSchema = z.coerce.number().int().positive()
