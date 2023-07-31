import { cache } from "react"

import prismadb from "@/lib/prismadb"

export const findCategoryById = cache(async (categoryId: string) => {
  try {
    return await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    })
  } catch (error) {
    return null
  }
})
