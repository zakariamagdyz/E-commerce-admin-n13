"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

import ApiList from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { ColorColumn, columns } from "./columns"

type Props = { colors: ColorColumn[] }

export const ColorClient = ({ colors }: Props) => {
  const params = useParams()
  return (
    <section>
      <header className="mb-3 flex items-center justify-between">
        <Heading title={`Colors (${colors.length})`} description="Manage colors for your store " />
        <Button asChild>
          <Link href={`/${params.storeId}/colors/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>{" "}
      </header>
      <Separator className="mb-8" />
      <DataTable columns={columns} data={colors} searchKey="name" />
      <Heading title="API" description="API calls for Colors " />
      <Separator className="my-4" />
      <ApiList entityName="colors" entityIdName="colorId" />
    </section>
  )
}
