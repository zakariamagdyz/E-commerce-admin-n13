import { Metadata } from "next"

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
  const user = await checkForSession()
  const store = await getStoreApi(params.storeId, user.id)

  return <main className="container">{store?.name}</main>
}

export default page
