"use client"

import { Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

export const BillboardClient = () => {
  const params = useParams()
  return (
    <section>
      <header className="mb-3 flex items-center justify-between">
        <Heading title="Billboards (0)" description="Manage billboards for your store " />
        <Button asChild>
          <Link href={`/${params.storeId}/billboards/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Link>
        </Button>{" "}
      </header>
      <Separator />
    </section>
  )
}
