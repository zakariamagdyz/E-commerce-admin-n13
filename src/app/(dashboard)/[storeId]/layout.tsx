import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import React from "react"

import { options } from "@/app/api/auth/[...nextauth]/options"
import Navbar from "@/components/Navbar"
import prismadb from "@/lib/prismadb"

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const session = await getServerSession(options)
  if (!session) return redirect("/signin")
  try {
    const store = await prismadb.store.findFirst({
      where: { id: params.storeId },
    })
    if (!store) return redirect("/")
  } catch (error) {
    return redirect("/")
  }

  return (
    <>
      <Navbar userId={session.user.id} />
      {children}
    </>
  )
}
