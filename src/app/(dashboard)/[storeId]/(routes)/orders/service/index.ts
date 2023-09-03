import { cache } from 'react'

import prismadb from '@/lib/prismadb'

export const findOrderById = cache(async (orderId: string) => {
  try {
    return await prismadb.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    })
  } catch (error) {
    return null
  }
})
