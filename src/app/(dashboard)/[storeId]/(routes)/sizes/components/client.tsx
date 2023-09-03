'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import ApiList from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, SizeColumn } from './columns'

type Props = { sizes: SizeColumn[] }

export const SizeClient = ({ sizes }: Props) => {
  const params = useParams()
  return (
    <section>
      <header className='mb-3 flex items-center justify-between'>
        <Heading title={`Sizes (${sizes.length})`} description='Manage sizes for your store ' />
        <Button asChild>
          <Link href={`/${params.storeId}/sizes/new`}>
            <Plus className='mr-2 h-4 w-4' />
            Add New
          </Link>
        </Button>{' '}
      </header>
      <Separator className='mb-8' />
      <DataTable columns={columns} data={sizes} searchKey='name' />
      <Heading title='API' description='API calls for Sizes ' />
      <Separator className='my-4' />
      <ApiList entityName='sizes' entityIdName='sizesId' />
    </section>
  )
}
