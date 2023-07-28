import { cache } from "react"

import prismadb from "@/lib/prismadb"

export const findBillboardById = cache(async (billboardId: string) => {
  try {
    return await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    })
  } catch (error) {
    return null
  }
})
