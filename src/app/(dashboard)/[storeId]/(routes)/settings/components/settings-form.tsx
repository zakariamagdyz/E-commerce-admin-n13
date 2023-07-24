"use client"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"

import AlertModal from "@/components/modals/alert-modal"
import ApiAlert from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import useOrigin from "@/hooks/use-origin"

import { useDeleteModal } from "../hooks/useDeleteModal"
import { useUpdateStoreForm } from "../hooks/useUpdateStoreForm"

type Props = {
  initialData: Store
}

export const SettingsForm = ({ initialData }: Props) => {
  const { isOpen, onOpen, onClose, onConfirm, isLoading } = useDeleteModal(initialData.id)
  const { form, onSubmit } = useUpdateStoreForm(initialData)
  const origin = useOrigin()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button variant={"destructive"} size="sm" disabled={form.formState.isSubmitting} onClick={onOpen}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form className="w-full space-y-8" onSubmit={onSubmit}>
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={form.formState.isSubmitting} placeholder="Store name" {...field} />
                  </FormControl>

                  <FormMessage className="ms-2 text-xs " />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </Form>

      <AlertModal isOpen={isOpen} loading={isLoading} onClose={onClose} onConfirm={onConfirm} />
      <Separator />
      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${initialData.id}`} variant="public" />
    </>
  )
}
