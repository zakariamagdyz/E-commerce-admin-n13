import { NextResponse } from "next/server"
import Stripe from "stripe"

import prismadb from "@/lib/prismadb"
import { stripe } from "@/lib/stripe"
import { handleServerError } from "@/utils/handleServerError"

import { bodySchema } from "./schema"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export const OPTIONS = async () => {
  return NextResponse.json({}, { headers: corsHeaders })
}

type Params = { params: { storeId: string } }

export const POST = async (req: Request, { params }: Params) => {
  // Check for body schema
  try {
    const body = await req.json()
    const { productIds } = await bodySchema.parseAsync(body)

    const products = await prismadb.product.findMany({
      where: { id: { in: productIds }, storeId: params.storeId },
    })

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = products.map((product) => ({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
    }))

    // Create order
    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    })

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/cart/?orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/cart/?canceled=true`,

      metadata: {
        orderId: order.id,
      },
    })

    return NextResponse.json({ url: session.url }, { headers: corsHeaders })
  } catch (error) {
    handleServerError(error, "[CHECKOUT_POST]")
  }
}
