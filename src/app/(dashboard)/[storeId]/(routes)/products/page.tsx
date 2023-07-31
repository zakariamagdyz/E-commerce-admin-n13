import { format } from "date-fns"
import { Metadata } from "next"
import React from "react"

import prismadb from "@/lib/prismadb"
import { formatter } from "@/lib/utils"

import { ProductClient } from "./components/client"
import { ProductColumn } from "./components/columns"

type Params = { params: { storeId: string } }

export const metadata: Metadata = {
  title: "Products",
  description: "Store produts",
}

async function ProductsPage({ params }: Params) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedProcuts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }))
  return (
    <main className="container py-6">
      <ProductClient products={formatedProcuts} />
    </main>
  )
}

export default ProductsPage
