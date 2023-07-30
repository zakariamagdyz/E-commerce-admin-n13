"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import ApiList from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { BillboardColumn, columns } from "./columns"

type Props = { billboards: BillboardColumn[] }

export const BillboardClient = ({ billboards }: Props) => {
  const params = useParams()
  return (
    <section>
      <header className="mb-3 flex items-center justify-between">
        <Heading title={`Billboards (${billboards.length})`} description="Manage billboards for your store " />
        <Button asChild>
          <Link href={`/${params.storeId}/billboards/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>{" "}
      </header>
      <Separator className="mb-8" />
      <DataTable columns={columns} data={billboards} searchKey="label" />
      <Heading title="API" description="API calls for Billboards " />
      <Separator className="my-4" />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </section>
  )
}
