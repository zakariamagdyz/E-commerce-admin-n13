import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

type UseDeleteModal = {
  active: boolean
  pushToSizes: boolean
  sizeId: string
}

export const useDeleteModal = ({ active, pushToSizes, sizeId }: UseDeleteModal) => {
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
      const res = await fetch(`/api/${storeId}/sizes/${sizeId}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      router.refresh()
      if (pushToSizes) router.push(`/${storeId}/sizes`)

      toast.success("Size deleted")
    } catch (error) {
      if (error instanceof Error) toast.error("Make sure you removed all products useing this size")
    } finally {
      setLoading(false)
      onClose()
    }
  }
  return { onClose, onOpen, onConfirm, isLoading, isOpen }
}
