"use client"
import { Copy, Server } from "lucide-react"
import React from "react"
import { toast } from "react-hot-toast"

import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"

type Props = {
  title: string
  description: string
  variant: "public" | "admin"
}

const textMap: Record<Props["variant"], string> = {
  admin: "Admin",
  public: "Public",
}

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  admin: "destructive",
  public: "secondary",
}

function ApiAlert({ title, description, variant = "public" }: Props) {
  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast.success("Copied to clipboard")
  }
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] py-[.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export default ApiAlert
