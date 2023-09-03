import { cache } from 'react'

import prismadb from '@/lib/prismadb'

export const findProductById = cache(async (productId: string) => {
  try {
    return await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    })
  } catch (error) {
    return null
  }
})
