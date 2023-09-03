import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { checkForSession } from '@/utils/checkForSession'

import { getStoreApi } from '../../service'
import { SettingsForm } from './components/settings-form'

type Props = {
  params: { storeId: string }
}

export async function generateMetadata({ params: { storeId } }: Props): Promise<Metadata> {
  const user = await checkForSession()
  const store = await getStoreApi(storeId, user.id)
  if (!store) {
    return { title: 'Store Not Found' }
  }

  return {
    title: store.name,
    description: `This is the page of ${store.name}`,
  }
}

async function SettingsPage({ params }: Props) {
  const user = await checkForSession()

  const store = await getStoreApi(params.storeId, user.id)

  if (!store) redirect('/')

  return (
    <main className='container py-6'>
      <SettingsForm initialData={store} />
    </main>
  )
}

export default SettingsPage
