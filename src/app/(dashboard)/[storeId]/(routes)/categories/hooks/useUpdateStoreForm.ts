import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(12),
})

type BillboardFormValues = z.infer<typeof formSchema>

export const useCategoryForm = (initialData: Category | null) => {
  const router = useRouter()
  const { storeId, billboardId } = useParams() as { storeId: string; billboardId: string }
  const formInitialData = {
    name: initialData?.name,
    billboardId: initialData?.billboardId,
  }

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formInitialData,
  })
  const toastMessage = initialData ? "Billboard updated" : "Billboard created"
  const url = initialData ? `/api/${storeId}/billboards/${billboardId}` : `/api/${storeId}/billboards`
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
        router.push(`/${storeId}/categories`)
        toast.success(toastMessage)
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      }
    },
    [router, toastMessage, method, url, storeId]
  )

  return { form, onSubmit: form.handleSubmit(onSubmit) }
}
