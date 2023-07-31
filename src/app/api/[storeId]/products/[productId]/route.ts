import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { options } from "@/app/api/auth/[...nextauth]/options"
import prismadb from "@/lib/prismadb"

import { bodySchema } from "../schema"

type Params = { params: { storeId: string; productId: string } }

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

    const product = await prismadb.product.findUnique({
      where: { id: params.productId },
      include: { images: true, category: true, size: true, color: true },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_GET]", error)
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
    const { categoryId, colorId, images, name, price, sizeId, isArchived, isFeatured } = await bodySchema
      .partial()
      .parseAsync(body)

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

    const product = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        images: { deleteMany: {}, create: images },
      },
    })

    return NextResponse.json(product)
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
    console.log("[PRODUCT_PATCH]", error)
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

    await prismadb.product.delete({
      where: { id: params.productId },
    })
    return NextResponse.json({ message: "Product has been deleted successfully" }, { status: 200 })
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    )
  }
}
