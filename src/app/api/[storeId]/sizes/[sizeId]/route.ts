import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { options } from '@/app/api/auth/[...nextauth]/options'
import prismadb from '@/lib/prismadb'

import { bodySchema } from '../schema'

type Params = { params: { storeId: string; sizeId: string } }

export async function GET(_req: Request, { params }: Params) {
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

    const size = await prismadb.size.findUnique({
      where: { id: params.sizeId },
    })
    return NextResponse.json(size)
  } catch (error) {
    console.log('[SIZE_GET]', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      {
        status: 500,
      }
    )
  }
}

export async function PATCH(req: Request, { params }: Params) {
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
    const { name, value } = await bodySchema.partial({ name: true, value: true }).parseAsync(body)

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

    const size = await prismadb.size.update({
      where: { id: params.sizeId },
      data: { value, name },
    })

    return NextResponse.json(size)
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
    console.log('[SIZE_PATCH]', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(_req: Request, { params }: Params) {
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

    await prismadb.size.delete({
      where: { id: params.sizeId },
    })
    return NextResponse.json({ message: 'Size has been deleted successfully' }, { status: 200 })
  } catch (error) {
    console.log('[SIZE_DELETE]', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      {
        status: 500,
      }
    )
  }
}
