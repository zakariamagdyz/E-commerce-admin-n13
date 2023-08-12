import { CreditCard, DollarSign, Package } from "lucide-react"
import { Metadata } from "next"

import { Overview } from "@/components/overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { formatter } from "@/lib/utils"
import { getGraphRevenue } from "@/services/get-graph-revenue"
import { getSalesCount } from "@/services/get-sales-count"
import { getStockCount } from "@/services/get-stock-count"
import { getTotalRevenue } from "@/services/get-total-revenue"
import { checkForSession } from "@/utils/checkForSession"

import { getStoreApi } from "./service"

type Props = {
  params: { storeId: string }
}

export async function generateMetadata({ params: { storeId } }: Props): Promise<Metadata> {
  const user = await checkForSession()
  const store = await getStoreApi(storeId, user.id)
  if (!store) {
    return { title: "Store Not Found" }
  }

  return {
    title: store.name,
    description: `This is the page of ${store.name}`,
  }
}

async function page({ params }: Props) {
  const totalRevenue = await getTotalRevenue(params.storeId)
  const graphRevenue = await getGraphRevenue(params.storeId)
  const salesCount = await getSalesCount(params.storeId)
  const stockCount = await getStockCount(params.storeId)

  return (
    <main className="container py-8">
      <section className="space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
      </section>
      <section className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-sm font-medium">
            Total Revenue
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatter.format(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-sm font-medium">
            Sales
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{salesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between text-sm font-medium">
            Product In Stock
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockCount}</div>
          </CardContent>
        </Card>{" "}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

export default page
