import { z } from 'zod'

export const bodySchema = z.object({
  label: z.string().min(1).max(255),
  imageUrl: z.string().min(1).max(255),
})
