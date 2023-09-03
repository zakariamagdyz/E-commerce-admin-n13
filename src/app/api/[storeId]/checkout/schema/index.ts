import { z } from 'zod'

export const bodySchema = z.object({
  productIds: z.array(z.string().min(12).max(255)),
})
