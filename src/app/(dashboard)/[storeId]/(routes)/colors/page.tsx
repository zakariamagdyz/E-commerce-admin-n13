import { format } from "date-fns"
import { Metadata } from "next"
import React from "react"

import prismadb from "@/lib/prismadb"

import { ColorClient } from "./components/client"
import { ColorColumn } from "./components/columns"

type Params = { params: { storeId: string } }

export const metadata: Metadata = {
  title: "Colors",
  description: "Store Colors",
}

async function ColorsPage({ params }: Params) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const fromatedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }))
  return (
    <main className="container py-6">
      <ColorClient colors={fromatedColors} />
    </main>
  )
}

export default ColorsPage
