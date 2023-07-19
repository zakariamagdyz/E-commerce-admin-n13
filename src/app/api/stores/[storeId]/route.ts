import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"

import prismadb from "@/lib/prismadb"

import { options } from "../../auth/[...nextauth]/options"
import { patchBodySchema } from "../schema"

export async function PATCH(req: Request, { params }: { params: { storeId: string } }) {
  try {
    // Check for Auth
    const session = await getServerSession(options)
    if (!session?.user.id) {
      return NextResponse.json(
        { message: "UnAuthorized" },
        {
          status: 401,
        }
      )
    }

    // Check for body schema
    const body = await req.json()
    const { name } = await patchBodySchema.parseAsync(body)

    const store = await prismadb.store.updateMany({
      where: { id: params.storeId, userId: session.user.id },
      data: { name },
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
    console.log("[STORE_PATCH]", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(_req: Request, { params }: { params: { storeId: string } }) {
  try {
    // Check for Auth
    const session = await getServerSession(options)
    if (!session?.user.id) {
      return NextResponse.json(
        { message: "UnAuthorized" },
        {
          status: 401,
        }
      )
    }
    await prismadb.store.deleteMany({
      where: { id: params.storeId, userId: session.user.id },
    })
    return NextResponse.json({ message: "Store has been deleted successfully" }, { status: 200 })
  } catch (error) {
    console.log("[STORE_DELETE]", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    )
  }
}
