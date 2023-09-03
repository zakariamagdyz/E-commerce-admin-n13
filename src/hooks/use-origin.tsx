'use clinet'
import { useEffect, useState } from 'react'

const useOrigin = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return ''
  }
  return typeof window !== 'undefined' ? window.location.origin : ''
}

export default useOrigin
