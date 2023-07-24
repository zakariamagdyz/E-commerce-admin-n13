import { z } from "zod"

export const postBodySchema = z.object({
  name: z.string().min(1),
})
export const patchBodySchema = z.object({
  name: z.string().min(1),
})
