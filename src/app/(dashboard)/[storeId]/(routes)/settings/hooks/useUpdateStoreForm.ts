import { zodResolver } from "@hookform/resolvers/zod"
import { Store } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1),
})

type SettingsFormValues = z.infer<typeof formSchema>

export const useUpdateStoreForm = (initialData: Store) => {
  const router = useRouter()

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = useCallback(
    async (values: SettingsFormValues) => {
      try {
        const res = await fetch(`/api/stores/${initialData.id}`, {
          method: "PATCH",
          body: JSON.stringify(values),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message)
        router.refresh()
        toast.success("Store updated")
      } catch (error) {
        if (error instanceof Error) toast.error(error.message)
      }
    },
    [initialData.id, router]
  )

  return { form, onSubmit: form.handleSubmit(onSubmit) }
}
