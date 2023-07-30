import { Metadata } from "next"

import prismadb from "@/lib/prismadb"

import { CategoryForm } from "../components/category-form"
import { findCategoryById } from "../service"

type Props = {
  params: {
    categoryId: string
    storeId: string
  }
}

export async function generateMetadata({ params: { categoryId } }: Props): Promise<Metadata> {
  const category = await findCategoryById(categoryId)
  if (!category) {
    return { title: "Create new category" }
  }

  return {
    title: category.name,
    description: `This is the page of ${category.name}`,
  }
}

async function CategoryFormPage({ params }: Props) {
  const category = await findCategoryById(params.categoryId)
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
  })

  return (
    <main className="flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </section>
    </main>
  )
}

export default CategoryFormPage
