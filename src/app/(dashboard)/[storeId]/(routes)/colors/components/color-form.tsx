"use client"
import { Color } from "@prisma/client"
import { Trash } from "lucide-react"
import { useParams } from "next/navigation"

import AlertModal from "@/components/modals/alert-modal"
import ApiAlert from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import useOrigin from "@/hooks/use-origin"

import { useColorForm } from "../hooks/useColorForm"
import { useDeleteModal } from "../hooks/useDeleteModal"

type Props = {
  initialData: Color | null
}

export const ColorForm = ({ initialData }: Props) => {
  const origin = useOrigin()
  const params = useParams() as { storeId: string; colorId: string }
  const deleteModal = useDeleteModal({ active: !!initialData, pushToColors: true, colorId: params.colorId })
  const { form, onSubmit } = useColorForm(initialData)

  const title = initialData ? "Edit Color" : "Create Color"
  const description = initialData ? "Edit Color" : "Create Color"
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={form.formState.isSubmitting} placeholder="Color name" {...field} />
                  </FormControl>

                  <FormMessage className="ms-2 text-xs " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input disabled={form.formState.isSubmitting} placeholder="Color value" {...field} />
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
      <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${initialData?.id || ""}`} variant="public" />
    </>
  )
}
