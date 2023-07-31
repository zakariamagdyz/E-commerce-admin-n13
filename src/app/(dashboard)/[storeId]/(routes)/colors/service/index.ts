import { cache } from "react"

import prismadb from "@/lib/prismadb"

export const findColorById = cache(async (colorId: string) => {
  try {
    return await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    })
  } catch (error) {
    return null
  }
})
