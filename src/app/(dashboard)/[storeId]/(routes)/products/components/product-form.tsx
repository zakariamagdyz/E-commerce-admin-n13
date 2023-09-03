'use client'
import { Category, Color, Image, Product, Size } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useParams } from 'next/navigation'

import AlertModal from '@/components/modals/alert-modal'
import ApiAlert from '@/components/ui/api-alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import ImageUpload from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import useOrigin from '@/hooks/use-origin'

import { useDeleteModal } from '../hooks/useDeleteModal'
import { useProductForm } from '../hooks/useProductForm'

type Props = {
  initialData: (Product & { images: Image[] }) | null
  categories: Category[]
  sizes: Size[]
  colors: Color[]
}

export const ProductForm = ({ initialData, categories, sizes, colors }: Props) => {
  const origin = useOrigin()
  const params = useParams() as { storeId: string; productId: string }
  const deleteModal = useDeleteModal({ active: !!initialData, pushToProducts: true, productId: params.productId })
  const { form, onSubmit } = useProductForm(initialData)

  const title = initialData ? 'Edit product' : 'Create product'
  const description = initialData ? 'Edit product' : 'Create product'
  const action = initialData ? 'Save changes' : 'Create'

  return (
    <section className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {deleteModal && (
          <Button variant={'destructive'} size='sm' disabled={form.formState.isSubmitting} onClick={deleteModal.onOpen}>
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form className='w-full space-y-8' onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={Array.isArray(field.value) ? field.value?.map(image => image.url) : [field.value]}
                    disabled={form.formState.isSubmitting}
                    onChange={url => field.onChange([...field.value, { url }])}
                    onRemove={url => field.onChange([...field.value.filter(image => image.url !== url)])}
                  />
                </FormControl>

                <FormMessage className='ms-2 text-xs ' />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={form.formState.isSubmitting} placeholder='Product name' {...field} />
                  </FormControl>

                  <FormMessage className='ms-2 text-xs ' />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      disabled={form.formState.isSubmitting}
                      placeholder='9.99'
                      {...field}
                      // onChange={(e) => {
                      //   field.onChange(+e.target.value)
                      // }}
                    />
                  </FormControl>

                  <FormMessage className='ms-2 text-xs ' />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    defaultValue={field.value}
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className='ms-2 text-xs ' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sizeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    defaultValue={field.value}
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a size' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map(size => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className='ms-2 text-xs ' />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name='colorId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    defaultValue={field.value}
                    value={field.value}
                    disabled={form.formState.isSubmitting}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a color' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map(color => (
                        <SelectItem key={color.id} value={color.id}>
                          <div className='flex items-center gap-x-2'>
                            <div className='h-4 w-4 rounded-full border' style={{ backgroundColor: color.value }}></div>
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className='ms-2 text-xs ' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isFeatured'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>This product will appear on the home page.</FormDescription>
                  </div>
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name='isArchived'
              render={({ field }) => (
                <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>This product will not appear anywhere in the store.</FormDescription>
                  </div>
                </FormItem>
              )}
            />{' '}
          </div>
          <Button disabled={form.formState.isSubmitting} type='submit'>
            {form.formState.isSubmitting ? 'Saving...' : action}
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
      <ApiAlert title='NEXT_PUBLIC_API_URL' description={`${origin}/api/${initialData?.id || ''}`} variant='public' />
    </section>
  )
}
