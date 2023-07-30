"use client"
import { Billboard, Category } from "@prisma/client"
import { Trash } from "lucide-react"
import { useParams } from "next/navigation"

import AlertModal from "@/components/modals/alert-modal"
import ApiAlert from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import useOrigin from "@/hooks/use-origin"

import { useCategoryForm } from "../hooks/useCategoryForm"
import { useDeleteModal } from "../hooks/useDeleteModal"

type Props = {
  initialData: Category | null
  billboards: Billboard[]
}

export const CategoryForm = ({ initialData, billboards }: Props) => {
  const origin = useOrigin()
  const params = useParams() as { storeId: string; categoryId: string }
  const deleteModal = useDeleteModal({ active: false, pushToCategories: true, categoryId: params.categoryId })
  const { form, onSubmit } = useCategoryForm(initialData)

  const title = initialData ? "Edit category" : "Create category"
  const description = initialData ? "Edit category" : "Create category"
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
                    <Input disabled={form.formState.isSubmitting} placeholder="Category name" {...field} />
                  </FormControl>

                  <FormMessage className="ms-2 text-xs " />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    defaultValue={field.value}
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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
