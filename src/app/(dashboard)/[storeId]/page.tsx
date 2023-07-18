import { Metadata } from "next"

import prismadb from "@/lib/prismadb"

export const metadata: Metadata = {
  title: "Store",
  description: "this is store info",
}

async function page({ params }: { params: { storeId: string } }) {
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId },
  })

  return <div>{store?.name}</div>
}

export default page
