import { Metadata } from 'next'

import { SizeForm } from '../components/size-form'
import { findSizeById } from '../service'

type Props = {
  params: {
    sizeId: string
  }
}

export async function generateMetadata({ params: { sizeId } }: Props): Promise<Metadata> {
  const size = await findSizeById(sizeId)
  if (!size) {
    return { title: 'Create new Size' }
  }

  return {
    title: size.name,
    description: `This is the page of ${size.name}`,
  }
}

async function SizeFormPage({ params }: Props) {
  const size = await findSizeById(params.sizeId)

  return (
    <main className='container py-6'>
      <SizeForm initialData={size} />
    </main>
  )
}

export default SizeFormPage
