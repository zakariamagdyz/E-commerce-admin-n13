import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

type UseDeleteModal = {
  active: boolean
  pushToColors: boolean
  colorId: string
}

export const useDeleteModal = ({ active, pushToColors, colorId }: UseDeleteModal) => {
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { storeId } = useParams() as { storeId: string }

  if (!active) return null

  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)
  const onConfirm = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/${storeId}/colors/${colorId}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      router.refresh()
      if (pushToColors) router.push(`/${storeId}/colors`)

      toast.success('Color deleted')
    } catch (error) {
      if (error instanceof Error) toast.error('Make sure you removed all products useing this Color')
    } finally {
      setLoading(false)
      onClose()
    }
  }
  return { onClose, onOpen, onConfirm, isLoading, isOpen }
}
