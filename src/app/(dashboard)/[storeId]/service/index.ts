import { Store } from '@prisma/client'
import { cache } from 'react'

import prismadb from '@/lib/prismadb'

export const getStoreApi = cache(async (storeId: string, userId: string) => {
  let store: Store | null
  try {
    store = await prismadb.store.findFirst({
      where: { id: storeId, userId: userId },
    })
  } catch (error) {
    return null
  }
  return store
})
