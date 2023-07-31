"use client"

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

import AlertModal from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useDeleteModal } from "../hooks/useDeleteModal"
import { SizeColumn } from "./columns"

type Props = {
  size: SizeColumn
}

const CellAction = ({ size }: Props) => {
  const router = useRouter()
  const params = useParams() as { storeId: string }
  const onCopy = () => {
    navigator.clipboard.writeText(size.id)
    toast.success("Copied to clipboard")
  }
  const deleteModal = useDeleteModal({ active: !!size, pushToSizes: false, sizeId: size.id })
  return (
    <>
      {deleteModal && (
        <AlertModal
          isOpen={deleteModal.isOpen}
          loading={deleteModal.isLoading}
          onClose={deleteModal.onClose}
          onConfirm={deleteModal.onConfirm}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/sizes/${size.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteModal?.onOpen}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
