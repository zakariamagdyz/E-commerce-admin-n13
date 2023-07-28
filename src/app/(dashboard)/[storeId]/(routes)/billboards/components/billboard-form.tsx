"use client"
import { billboard } from "@prisma/client"
import { Trash } from "lucide-react"

import AlertModal from "@/components/modals/alert-modal"
import ApiAlert from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import useOrigin from "@/hooks/use-origin"

import { useDeleteModal } from "../hooks/useDeleteModal"
import { useBillboardForm } from "../hooks/useUpdateStoreForm"

type Props = {
  initialData: billboard | null
}

export const BillboardForm = ({ initialData }: Props) => {
  const deleteModal = useDeleteModal({ active: !!initialData })
  const { form, onSubmit } = useBillboardForm(initialData)
  const origin = useOrigin()

  const title = initialData ? "Edit billboard" : "Create billboard"
  const description = initialData ? "Edit billboard" : "Create billboard"
  const action = initialData ? "Save changes" : "Create"

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {deleteModal && (
          <Button variant={"destructive"} size="sm" disabled={form.formState.isSubmitting} onClick={deleteModal.onOpen}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form className="w-full space-y-8" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={form.formState.isSubmitting}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                <FormMessage className="ms-2 text-xs " />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={form.formState.isSubmitting} placeholder="Store name" {...field} />
                  </FormControl>

                  <FormMessage className="ms-2 text-xs " />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Saving..." : action}
          </Button>
        </form>
      </Form>

      {deleteModal && (
        <AlertModal
          isOpen={deleteModal.isOpen}
          loading={deleteModal.isLoading}
          onClose={deleteModal.onClose}
          onConfirm={deleteModal.onConfirm}
        />
      )}
      <Separator />
      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${initialData?.id}`} variant="public" />
    </>
  )
}
