import { format } from "date-fns"
import { Metadata } from "next"

import prismadb from "@/lib/prismadb"

import { CategoryClient } from "./components/client"
import { CategoryColumn } from "./components/columns"

type Params = { params: { storeId: string } }

export const metadata: Metadata = {
  title: "Categories",
  description: "Store categories",
}

async function CategoryPage({ params }: Params) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedcategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }))
  return (
    <main className="container py-6">
      <CategoryClient categories={formatedcategories} />
    </main>
  )
}

export default CategoryPage
