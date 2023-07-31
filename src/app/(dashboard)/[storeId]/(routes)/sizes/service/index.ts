import { cache } from "react"

import prismadb from "@/lib/prismadb"

export const findSizeById = cache(async (sizeId: string) => {
  try {
    return await prismadb.size.findUnique({
      where: {
        id: sizeId,
      },
    })
  } catch (error) {
    return null
  }
})
