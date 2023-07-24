import { notFound } from "next/navigation"
import React from "react"

import Navbar from "@/components/Navbar"
import { checkForSession } from "@/utils/checkForSession"

import { getStoreApi } from "./service"

export default async function layout({ children, params }: { children: React.ReactNode; params: { storeId: string } }) {
  const user = await checkForSession()
  const store = await getStoreApi(params.storeId, user.id)
  if (!store) notFound()
  return (
    <>
      <Navbar userId={user.id} />
      {children}
    </>
  )
}
