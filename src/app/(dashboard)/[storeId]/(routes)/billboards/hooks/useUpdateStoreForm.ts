import { zodResolver } from "@hookform/resolvers/zod"
import { billboard } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().url(),
})

type BillboardFormValues = z.infer<typeof formSchema>

export const useBillboardForm = (initialData: billboard | null) => {
  const router = useRouter()
  const { storeId, billboardId } = useParams() as { storeId: string; billboardId: string }
  const formInitialData = {
    label: initialData?.label || "",
  }

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formInitialData,
  })
  const toastMessage = initialData ? "Billboard updated" : "Billboard created"
  const url = initialData ? `/api/${storeId}/billboards/${billboardId}` : `/api/${storeId}/billboards/`
  const method = initialData ? "PATCH" : "POST"

  const onSubmit = useCallback(
    async (values: BillboardFormValues) => {
      try {
        const res = await fetch(url, {
          method,
          body: JSON.stringify(values),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        router.refresh()
        toast.success(toastMessage)
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      }
    },
    [router, toastMessage, method, url]
  )

  return { form, onSubmit: form.handleSubmit(onSubmit) }
}
