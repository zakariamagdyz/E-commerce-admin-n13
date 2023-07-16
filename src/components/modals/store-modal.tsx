"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Modal from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
})

type FormSchema = z.infer<typeof formSchema>

function StoreModal() {
  const { isOpen, closeModal } = useStoreModal()
  const form = useForm<FormSchema>({
    defaultValues: { name: "" },
    resolver: zodResolver(formSchema),
  })
  const onSubmit = async (values: FormSchema) => {
    try {
      const res = await fetch("/api/stores", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      form.reset()
      window.location.assign(`/${data.id}`)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        toast.error("Something went wrong.")
      }
    }
  }

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={closeModal}
    >
      Future Create Store Form
      <article className=" py-2 pb-4">
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: TV"
                      {...field}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage className="ml-2 text-xs" />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end space-x-2 pt-6">
              <Button
                variant="outline"
                type="button"
                disabled={form.formState.isSubmitting}
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </article>
    </Modal>
  )
}

export default StoreModal
