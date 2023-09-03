'use client'

import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { columns, OrderColumn } from './columns'

type Props = { orders: OrderColumn[] }

export const BillboardClient = ({ orders }: Props) => {
  return (
    <section>
      <header className='mb-3 flex items-center justify-between'>
        <Heading title={`Orders (${orders.length})`} description='Manage orders for your store ' />
      </header>
      <Separator className='mb-8' />
      <DataTable columns={columns} data={orders} searchKey='address' />
    </section>
  )
}
