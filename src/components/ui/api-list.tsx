"use client"

import { useParams } from "next/navigation"
import React from "react"

import useOrigin from "@/hooks/use-origin"

import ApiAlert from "./api-alert"

type Props = { entityName: string; entityIdName: string }

function ApiList({ entityIdName, entityName }: Props) {
  const params = useParams() as { storeId: string }
  const origin = useOrigin()

  const baseUrl = `${origin}/api/${params.storeId}`

  return (
    <article className="space-y-4">
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}`} />
      <ApiAlert title="GET" variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title="POST" variant="admin" description={`${baseUrl}/${entityName}`} />
      <ApiAlert title="PATCH" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
      <ApiAlert title="DELETE" variant="admin" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
    </article>
  )
}

export default ApiList
