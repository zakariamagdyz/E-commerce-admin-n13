import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import prismadb from "@/lib/prismadb"

import { options } from "../api/auth/[...nextauth]/options"
import PageContent from "./pageContent"

export default async function Home() {
  const session = await getServerSession(options)
  if (!session) return redirect("/signin")
  const store = await prismadb.store.findFirst({
    where: { userId: session.user.id },
  })
  if (store) return redirect(`/${store.id}`)
  return (
    <main>
      <PageContent />
    </main>
  )
}
