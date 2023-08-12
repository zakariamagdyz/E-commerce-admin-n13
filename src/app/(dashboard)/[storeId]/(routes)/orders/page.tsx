import { format } from "date-fns"
import { Metadata } from "next"
import React from "react"

import prismadb from "@/lib/prismadb"
import { formatter } from "@/lib/utils"

import { BillboardClient } from "./components/client"
import { OrderColumn } from "./components/columns"

type Params = { params: { storeId: string } }

export const metadata: Metadata = {
  title: "Orders",
  description: "Store orders",
}

async function BillboardPage({ params }: Params) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => (orderItem.product ? orderItem.product.name : "")).join(", "),
    totalPrice: formatter.format(item.orderItems.reduce((acc, orderItem) => acc + orderItem.product.price, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "MMM do, yyyy"),
  }))
  return (
    <main className="container py-6">
      <BillboardClient orders={formatedOrders} />
    </main>
  )
}

export default BillboardPage
