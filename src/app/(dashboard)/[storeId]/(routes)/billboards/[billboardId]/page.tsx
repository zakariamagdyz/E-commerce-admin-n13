import { Metadata } from "next"

import { BillboardForm } from "../components/billboard-form"
import { findBillboardById } from "../service"

type Props = {
  params: {
    billboardId: string
  }
}

export async function generateMetadata({ params: { billboardId } }: Props): Promise<Metadata> {
  const billboard = await findBillboardById(billboardId)
  if (!billboard) {
    return { title: "Create new billboard" }
  }

  return {
    title: billboard.label,
    description: `This is the page of ${billboard.label}`,
  }
}

async function BillBoardFormPage({ params }: Props) {
  const billboard = await findBillboardById(params.billboardId)

  return (
    <main className="flex-col">
      <section className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </section>
    </main>
  )
}

export default BillBoardFormPage
