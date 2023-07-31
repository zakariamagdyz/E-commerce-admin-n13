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
    <main className="container py-8">
      <BillboardForm initialData={billboard} />
    </main>
  )
}

export default BillBoardFormPage
