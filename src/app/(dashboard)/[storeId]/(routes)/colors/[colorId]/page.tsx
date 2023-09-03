import { Metadata } from 'next'

import { ColorForm } from '../components/color-form'
import { findColorById } from '../service'

type Props = {
  params: {
    colorId: string
  }
}

export async function generateMetadata({ params: { colorId } }: Props): Promise<Metadata> {
  const color = await findColorById(colorId)
  if (!color) {
    return { title: 'Create new Color' }
  }

  return {
    title: color.name,
    description: `This is the page of ${color.name}`,
  }
}

async function ColorFormpage({ params }: Props) {
  const color = await findColorById(params.colorId)

  return (
    <main className='container py-6'>
      <ColorForm initialData={color} />
    </main>
  )
}

export default ColorFormpage
