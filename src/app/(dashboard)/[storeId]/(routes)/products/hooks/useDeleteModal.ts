import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

type UseDeleteModal = {
  active: boolean
  pushToProducts: boolean
  productId: string
}

export const useDeleteModal = ({ active, pushToProducts, productId }: UseDeleteModal) => {
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
      const res = await fetch(`/api/${storeId}/products/${productId}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      router.refresh()
      if (pushToProducts) router.push(`/${storeId}/products`)

      toast.success("Product deleted")
    } catch (error) {
      if (error instanceof Error) toast.error("Something went wrong")
    } finally {
      setLoading(false)
      onClose()
    }
  }
  return { onClose, onOpen, onConfirm, isLoading, isOpen }
}
