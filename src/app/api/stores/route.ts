import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { options } from '@/app/api/auth/[...nextauth]/options'
import prismadb from '@/lib/prismadb'

import { bodySchema } from './schema'

export async function POST(req: Request) {
  try {
    // Check for Auth
    const session = await getServerSession(options)
    if (!session?.user.id) {
      return NextResponse.json(
        { message: 'UnAuthenticated' },
        {
          status: 401,
        }
      )
    }

    // Check for body schema
    const body = await req.json()
    const { name } = await bodySchema.parseAsync(body)

    const store = await prismadb.store.create({
      data: { name, userId: session.user.id },
    })
    return NextResponse.json(store)
  } catch (error) {
    // Check for Schema error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0].message },
        {
          status: 400,
        }
      )
    }
    console.log('[STORES_POST]', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      {
        status: 500,
      }
    )
  }
}
