import { z } from 'zod'

export const bodySchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string().url() }).array(),
  price: z.number().min(0),
  categoryId: z.string(),
  colorId: z.string(),
  sizeId: z.string(),
  isFeatured: z.boolean().optional(),
  isArchived: z.boolean().optional(),
})
