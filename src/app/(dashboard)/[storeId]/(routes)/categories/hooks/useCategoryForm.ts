import { zodResolver } from '@hookform/resolvers/zod'
import { Category } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(12),
})
type CategroyFormValue = z.infer<typeof formSchema>

export const useCategoryForm = (initialData: Category | null) => {
  const router = useRouter()
  const { storeId, categoryId } = useParams() as { storeId: string; categoryId: string }
  const formInitialData = {
    name: initialData?.name || '',
    billboardId: initialData?.billboardId,
  }

  const form = useForm<CategroyFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: formInitialData,
  })
  const toastMessage = initialData ? 'Category updated' : 'Category created'
  const url = initialData ? `/api/${storeId}/categories/${categoryId}` : `/api/${storeId}/categories`
  const method = initialData ? 'PATCH' : 'POST'

  const onSubmit = useCallback(
    async (values: CategroyFormValue) => {
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
