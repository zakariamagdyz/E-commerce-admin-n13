import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-hot-toast"

export const useDeleteModal = ({ active }: { active: boolean }) => {
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { storeId, billboardId } = useParams() as { storeId: string; billboardId?: string }

  if (!active) return null

  const onClose = () => setOpen(false)
  const onOpen = () => setOpen(true)
  const onConfirm = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/${storeId}/billboards/${billboardId}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      // router.refresh()
      router.push("/")
      toast.success("Billboard deleted")
    } catch (error) {
      if (error instanceof Error) toast.error("Make sure you removed all categories useing this billboard")
    } finally {
      setLoading(false)
      onClose()
    }
  }
  return { onClose, onOpen, onConfirm, isLoading, isOpen }
}
