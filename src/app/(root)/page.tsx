import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import prismadb from "@/lib/prismadb"

import { options } from "../api/auth/[...nextauth]/options"
import RootStoreModal from "./RootStoreModal"

export default async function Home() {
  const session = await getServerSession(options)
  if (!session) redirect("/signin")

  const store = await prismadb.store.findFirst({
    where: { userId: session.user.id },
  })
  if (store) redirect(`/${store.id}`)

  return (
    <main>
      <RootStoreModal />
    </main>
  )
}
