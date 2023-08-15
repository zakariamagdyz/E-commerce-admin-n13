import React from "react"
import { toast } from "react-hot-toast"

import { revalidateStoreCache } from "@/services/revalidate-store-cache"

const useRevalidateStore = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  const revalidateStore = async () => {
    try {
      setIsLoading(true)
      await revalidateStoreCache()
      toast.success("Store revalidated")
    } catch (error) {
      toast.error("Somthing went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, revalidateStore }
}

export default useRevalidateStore
