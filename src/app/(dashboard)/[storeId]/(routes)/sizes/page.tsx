import { format } from "date-fns"
import { Metadata } from "next"
import React from "react"

import prismadb from "@/lib/prismadb"

import { SizeClient } from "./components/client"
import { SizeColumn } from "./components/columns"

type Params = { params: { storeId: string } }

export const metadata: Metadata = {
  title: "Sizes",
  description: "Store Sizes",
}

async function SizesPage({ params }: Params) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedsizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient sizes={formatedsizes} />
      </div>
    </div>
  )
}

export default SizesPage
