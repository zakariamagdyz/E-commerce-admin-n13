"use client"

import { useEffect } from "react"

import { useStoreModal } from "@/hooks/use-store-modal"

export default function PageContent() {
  const openModal = useStoreModal((store) => store.openModal)
  const isOpen = useStoreModal((store) => store.isOpen)

  useEffect(() => {
    if (!isOpen) {
      openModal()
    }
  }, [isOpen, openModal])
  return null
}
