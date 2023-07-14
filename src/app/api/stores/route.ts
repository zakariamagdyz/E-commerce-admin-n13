import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import prismadb from "@/lib/prismadb"

import { options } from "../auth/[...nextauth]/options"

export async function POST(req: Request) {
  try {
    // Check for Auth
    const session = await getServerSession(options)
    const body = await req.json()
    const { name } = body as { name: string }
    if (!session?.user.id) {
      return new NextResponse("Unauthorized", {
        status: 401,
      })
    }
    if (!name) {
      return new NextResponse("Missing name", {
        status: 401,
      })
    }

    const store = await prismadb.store.create({
      data: { name, userId: session.user.id },
    })
    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORES_POST]", error)
    return new NextResponse("Internal error", {
      status: 401,
    })
  }
}
