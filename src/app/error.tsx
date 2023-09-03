'use client' // Error components must be Client components

import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className='mx-auto mt-20 min-h-screen max-w-lg space-y-4 px-4 py-1'>
      <h2 className='text-3xl font-bold tracking-tight'>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
      <p className='text-xl'>
        Or go back to{' '}
        <Link href='/' className='underline'>
          Home 🏠
        </Link>
      </p>
    </main>
  )
}
