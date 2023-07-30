import { z } from "zod"

export const bodySchema = z.object({
  name: z.string().min(1).max(255),
  billboardId: z.string().min(12).max(255),
})
