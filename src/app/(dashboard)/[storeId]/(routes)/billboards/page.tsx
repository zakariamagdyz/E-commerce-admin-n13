import { format } from "date-fns"
import { Metadata } from "next"
import React from "react"

import prismadb from "@/lib/prismadb"

import { BillboardClient } from "./components/client"
import { BillboardColumn } from "./components/columns"

type Params = { params: { storeId: string } }

export const metadata: Metadata = {
  title: "Billboards",
  description: "Store billboards",
}

async function BillboardPage({ params }: Params) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }))
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={formatedBillboards} />
      </div>
    </div>
  )
}

export default BillboardPage
