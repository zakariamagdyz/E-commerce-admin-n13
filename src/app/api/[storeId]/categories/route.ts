import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { options } from "@/app/api/auth/[...nextauth]/options"
import prismadb from "@/lib/prismadb"
import { handleServerError } from "@/utils/handleServerError"

import { bodySchema } from "./schema"

type Params = { params: { storeId: string } }

export async function GET(_: Request, { params }: Params) {
  try {
    const categories = await prismadb.category.findMany({
      where: { storeId: params.storeId },
    })
    return NextResponse.json(categories)
  } catch (error) {
    handleServerError(error, "[CATEGORIES_GET]")
  }
}

export async function POST(req: Request, { params }: Params) {
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
    const { name, billboardId } = await bodySchema.parseAsync(body)

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

    const category = await prismadb.category.create({
      data: { name, billboardId, storeId: params.storeId },
    })
    return NextResponse.json(category)
  } catch (error) {
    handleServerError(error, "[CATEGORIES_POST]")
  }
}
