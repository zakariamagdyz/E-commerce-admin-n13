"use client"
import { Store } from "@prisma/client"
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"

import { useStoreModal } from "@/hooks/use-store-modal"
import { cn } from "@/lib/utils"

import { Button } from "../../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"

type Props = {
  items: Store[]
}

function StoreSwitcher({ items = [] }: Props) {
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const storeModal = useStoreModal()

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }))
  const selected = formattedItems.find((item) => item.value === params.storeId)

  const onStoreSelect = (store: { label: string; value: string }) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-label="select a store"
          aria-expanded={open}
          className={cn("w-[200px] justify-between")}
        >
          <StoreIcon className="mr-2 h-4 w-4 text-gray-500" />
          {selected?.label || "Select a store"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((item) => (
                <CommandItem
                  key={item.value}
                  className="text-sm"
                  onSelect={() => onStoreSelect(item)}
                >
                  <StoreIcon className="mr-2 h-4 w-4 text-gray-500" />
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected?.value === item.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="text-sm"
                onSelect={() => {
                  setOpen(false)
                  storeModal.openModal()
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
