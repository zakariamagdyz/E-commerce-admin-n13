import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { options } from "@/app/api/auth/[...nextauth]/options"
import prismadb from "@/lib/prismadb"

import { bodySchema } from "../schema"

type Params = { params: { storeId: string; categoryId: string } }

export async function GET(_req: Request, { params }: Params) {
  try {
    // Check for Auth
    const session = await getServerSession(options)
    if (!session?.user.id) {
      return NextResponse.json(
        { message: "UnAuthenticated" },
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
        { message: "UnAuthorized" },
        {
          status: 403,
        }
      )
    }

    const category = await prismadb.category.findUnique({
      where: { id: params.categoryId },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log("[CATEGORIY_GET]", error)
    return NextResponse.json(
      { message: "Something went wrong" },
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
        { message: "UnAuthenticated" },
        {
          status: 401,
        }
      )
    }

    // Check for body schema
    const body = await req.json()
    const { name, billboardId } = await bodySchema.partial({ name: true, billboardId: true }).parseAsync(body)

    // Check if user owns the store
    const store = await prismadb.store.findFirst({
      where: { id: params.storeId, userId: session.user.id },
    })

    if (!store) {
      return NextResponse.json(
        { message: "UnAuthorized" },
        {
          status: 403,
        }
      )
    }

    const category = await prismadb.category.update({
      where: { id: params.categoryId },
      data: { name, billboardId },
    })

    return NextResponse.json(category)
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
    console.log("[CATEGORIY_PATCH]", error)
    return NextResponse.json(
      { message: "Something went wrong" },
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
        { message: "UnAuthenticated" },
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
        { message: "UnAuthorized" },
        {
          status: 403,
        }
      )
    }

    await prismadb.category.delete({
      where: { id: params.categoryId },
    })
    return NextResponse.json({ message: "Category has been deleted successfully" }, { status: 200 })
  } catch (error) {
    console.log("[CATEGORIY_DELETE]", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    )
  }
}
