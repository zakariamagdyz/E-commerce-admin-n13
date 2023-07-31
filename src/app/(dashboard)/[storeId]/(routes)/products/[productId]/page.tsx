import { Metadata } from "next"

import prismadb from "@/lib/prismadb"

import { ProductForm } from "../components/product-form"
import { findProductById } from "../service"

type Props = {
  params: {
    productId: string
    storeId: string
  }
}

export async function generateMetadata({ params: { productId } }: Props): Promise<Metadata> {
  const product = await findProductById(productId)
  if (!product) {
    return { title: "Create new product" }
  }

  return {
    title: product.name,
    description: `This is the page of ${product.name}`,
  }
}

async function BillBoardFormPage({ params }: Props) {
  const product = await findProductById(params.productId)
  const categoriesPromise = prismadb.category.findMany({
    where: { storeId: params.storeId },
  })
  const colorsPromise = prismadb.color.findMany({
    where: { storeId: params.storeId },
  })
  const sizesPromise = prismadb.size.findMany({
    where: { storeId: params.storeId },
  })

  const [categories, colors, sizes] = await Promise.all([categoriesPromise, colorsPromise, sizesPromise])

  return (
    <main className="container py-8">
      <ProductForm initialData={product} categories={categories} colors={colors} sizes={sizes} />
    </main>
  )
}

export default BillBoardFormPage
