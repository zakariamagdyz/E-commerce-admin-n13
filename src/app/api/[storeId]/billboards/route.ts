import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { options } from '@/app/api/auth/[...nextauth]/options'
import prismadb from '@/lib/prismadb'

import { bodySchema } from './schema'

type Params = { params: { storeId: string } }

export async function GET(_: Request, { params }: Params) {
  try {
    const billboards = await prismadb.billboard.findMany({
      where: { storeId: params.storeId },
    })
    return NextResponse.json(billboards)
  } catch (error) {
    console.log('[BILLBOARDS_GET]', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      {
        status: 500,
      }
    )
  }
}

export async function POST(req: Request, { params }: Params) {
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
    const { label, imageUrl } = await bodySchema.parseAsync(body)

    // Check if user owns the store
    const store = await prismadb.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    })

    if (!store) {
      return NextResponse.json(
        { message: 'UnAuthorized' },
        {
          status: 403,
        }
      )
    }

    const billboard = await prismadb.billboard.create({
      data: { label, imageUrl, storeId: params.storeId },
    })
    return NextResponse.json(billboard)
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
    console.log('[BILLBOARDS_POST]', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      {
        status: 500,
      }
    )
  }
}
