import { zodResolver } from '@hookform/resolvers/zod'
import { Image, Product } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string().url() }).array(),
  // we deal with price as string because we want to show the user the price with the currency symbol
  // we need to show placeholder for the price input
  price: z
    .string()
    .min(1, { message: 'Price must be Added' })
    .regex(/^[1-9]\d*$/, { message: 'Price must be a number' }),
  categoryId: z.string(),
  colorId: z.string(),
  sizeId: z.string(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})

type ProductFormValues = z.infer<typeof formSchema>

export const useProductForm = (initialData: (Product & { images: Image[] }) | null) => {
  const router = useRouter()
  const { storeId, productId } = useParams() as { storeId: string; productId: string }
  const formInitialData = {
    name: initialData?.name ?? '',
    images: initialData?.images ?? [],
    price: initialData?.price.toString() || '',
    categoryId: initialData?.categoryId,
    colorId: initialData?.colorId,
    sizeId: initialData?.sizeId,
    isFeatured: initialData?.isFeatured ?? false,
    isArchived: initialData?.isArchived ?? false,
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formInitialData,
  })
  const toastMessage = initialData ? 'Product updated' : 'Product created'
  const url = initialData ? `/api/${storeId}/products/${productId}` : `/api/${storeId}/products`
  const method = initialData ? 'PATCH' : 'POST'

  const onSubmit = useCallback(
    async (values: ProductFormValues) => {
      try {
        const res = await fetch(url, {
          method,
          body: JSON.stringify({ ...values, price: parseInt(values.price) }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        router.refresh()
        router.push(`/${storeId}/products`)
        toast.success(toastMessage)
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      }
    },
    [router, toastMessage, method, url, storeId]
  )

  return { form, onSubmit: form.handleSubmit(onSubmit) }
}
