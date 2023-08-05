import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { z } from "zod"

import { options } from "@/app/api/auth/[...nextauth]/options"
import prismadb from "@/lib/prismadb"

import { bodySchema } from "./schema"

type Params = { params: { storeId: string } }

export async function GET(req: Request, { params }: Params) {
  try {
    // // Check for Auth
    // const session = await getServerSession(options)
    // if (!session?.user.id) {
    //   return NextResponse.json(
    //     { message: "UnAuthenticated" },
    //     {
    //       status: 401,
    //     }
    //   )
    // }

    // // Check if user owns the store
    // const store = await prismadb.store.findFirst({
    //   where: { id: params.storeId, userId: session.user.id },
    // })

    // if (!store) {
    //   return NextResponse.json(
    //     { message: "UnAuthorized" },
    //     {
    //       status: 403,
    //     }
    //   )
    // }
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get("categoryId") || undefined
    const colorId = searchParams.get("colorId") || undefined
    const sizeId = searchParams.get("sizeId") || undefined
    const isFeatured = searchParams.get("isFeatured") || undefined

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? isFeatured === "true" : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        color: true,
        size: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
    return NextResponse.json(
      { message: "Something went wrong" },
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
        { message: "UnAuthenticated" },
        {
          status: 401,
        }
      )
    }

    // Check for body schema
    const body = await req.json()
    const { categoryId, colorId, images, name, price, sizeId, isArchived, isFeatured } = await bodySchema.parseAsync(
      body
    )

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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
        images: { create: images },
        storeId: params.storeId,
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
    console.log("[PRODUCTS_POST]", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      {
        status: 500,
      }
    )
  }
}
