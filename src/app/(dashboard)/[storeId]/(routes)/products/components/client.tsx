'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import ApiList from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, ProductColumn } from './columns'

type Props = { products: ProductColumn[] }

export const ProductClient = ({ products }: Props) => {
  const params = useParams()
  return (
    <section>
      <header className='mb-3 flex items-center justify-between'>
        <Heading title={`Products (${products.length})`} description='Manage products for your store ' />
        <Button asChild>
          <Link href={`/${params.storeId}/products/new`}>
            <Plus className='mr-2 h-4 w-4' />
            Add New
          </Link>
        </Button>{' '}
      </header>
      <Separator className='mb-8' />
      <DataTable columns={columns} data={products} searchKey='name' />
      <Heading title='API' description='API calls for Products ' />
      <Separator className='my-4' />
      <ApiList entityName='products' entityIdName='productId' />
    </section>
  )
}
