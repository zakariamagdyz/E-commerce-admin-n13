import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { options } from '../app/api/auth/[...nextauth]/options'

export const checkForSession = async () => {
  const session = await getServerSession(options)
  if (!session?.user) redirect('/signin')
  return session.user
}
