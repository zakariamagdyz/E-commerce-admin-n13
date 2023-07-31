import { zodResolver } from "@hookform/resolvers/zod"
import { Size } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
})

type SizeFormValue = z.infer<typeof formSchema>

export const useSizeForm = (initialData: Size | null) => {
  const router = useRouter()
  const { storeId, billboardId } = useParams() as { storeId: string; billboardId: string }
  const formInitialData = {
    name: initialData?.name || "",
    value: initialData?.value || "",
  }

  const form = useForm<SizeFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: formInitialData,
  })
  const toastMessage = initialData ? "Size updated" : "Size created"
  const url = initialData ? `/api/${storeId}/sizes/${billboardId}` : `/api/${storeId}/sizes`
  const method = initialData ? "PATCH" : "POST"

  const onSubmit = useCallback(
    async (values: SizeFormValue) => {
      try {
        const res = await fetch(url, {
          method,
          body: JSON.stringify(values),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        router.refresh()
        router.push(`/${storeId}/sizes`)
        toast.success(toastMessage)
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      }
    },
    [router, toastMessage, method, url, storeId]
  )

  return { form, onSubmit: form.handleSubmit(onSubmit) }
}
