import { NextResponse } from 'next/server'
import { z } from 'zod'

export const handleServerError = (error: unknown, type: string) => {
  // Check for Schema error
  if (error instanceof z.ZodError) {
    const errorMessages = error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
    const errorString = errorMessages.join(', ')

    return NextResponse.json(
      { message: errorString },
      {
        status: 400,
      }
    )
  }
  console.log(type, error)
  return NextResponse.json(
    { message: 'Something went wrong' },
    {
      status: 501,
    }
  )
}
