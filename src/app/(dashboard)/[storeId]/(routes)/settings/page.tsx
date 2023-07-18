import { redirect } from "next/navigation"

import prismadb from "@/lib/prismadb"
import { checkForSession } from "@/utils/checkForSession"

type Props = {
  params: { storeId: string }
}

async function SettingsPage({ params }: Props) {
  const session = await checkForSession()

  const store = await prismadb.store.findFirst({
    where: { id: params.storeId, userId: session.id },
  })

  if (!store) redirect("/")
  store.id

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">Hello settings</div>
    </div>
  )
}

export default SettingsPage
