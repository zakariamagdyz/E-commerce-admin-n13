import { zodResolver } from '@hookform/resolvers/zod'
import { Color } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
  value: z
    .string()
    .min(1)
    .regex(/^#[0-9A-F]{6}$/i, { message: 'String must be a valid hex code' }),
})

type ColorFormValue = z.infer<typeof formSchema>

export const useColorForm = (initialData: Color | null) => {
  const router = useRouter()
  const { storeId, colorId } = useParams() as { storeId: string; colorId: string }
  const formInitialData = {
    name: initialData?.name || '',
    value: initialData?.value || '',
  }

  const form = useForm<ColorFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: formInitialData,
  })
  const toastMessage = initialData ? 'Color updated' : 'Color created'
  const url = initialData ? `/api/${storeId}/colors/${colorId}` : `/api/${storeId}/colors`
  const method = initialData ? 'PATCH' : 'POST'

  const onSubmit = useCallback(
    async (values: ColorFormValue) => {
      try {
        const res = await fetch(url, {
          method,
          body: JSON.stringify(values),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        router.refresh()
        router.push(`/${storeId}/colors`)
        toast.success(toastMessage)
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      }
    },
    [router, toastMessage, method, url, storeId]
  )

  return { form, onSubmit: form.handleSubmit(onSubmit) }
}
