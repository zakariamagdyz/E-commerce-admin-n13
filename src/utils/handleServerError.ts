import { NextResponse } from "next/server"
import { z } from "zod"

export const handleServerError = (error: unknown, type: string) => {
  // Check for Schema error
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { message: error.issues[0].message },
      {
        status: 400,
      }
    )
  }
  console.log(type, error)
  return NextResponse.json(
    { message: "Something went wrong" },
    {
      status: 500,
    }
  )
}
