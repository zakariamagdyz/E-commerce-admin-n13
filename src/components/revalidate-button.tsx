'use client'
import React from 'react'

import useRevalidateStore from '@/hooks/services/useRevalidateStore'

import { Button } from './ui/button'

const RevalidateButton = () => {
  const { isLoading, revalidateStore } = useRevalidateStore()
  return (
    <Button disabled={isLoading} onClick={revalidateStore}>
      {isLoading ? 'loading...' : 'Revalidate Store Cache'}
    </Button>
  )
}

export default RevalidateButton
