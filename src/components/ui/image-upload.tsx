"use client"

import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

import { Button } from "./button"

type Props = {
  disabled?: boolean
  onChange: (url: string) => void
  onRemove: (url: string) => void
  value: string[]
}

// TODO: Add hydration workaround for SSR
const ImageUpload = ({ onChange, onRemove, value, disabled }: Props) => {
  const onUpload = (result: { info: { secure_url: string } }) => {
    onChange(result.info.secure_url)
  }
  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <figure key={url} className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
            <div className="absolute right-2 top-2 z-10">
              <Button type="button" variant={"destructive"} onClick={() => onRemove(url)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </figure>
        ))}
      </div>
      <CldUploadWidget uploadPreset="ll2tkhgn" onUpload={onUpload}>
        {({ open }) => (
          <Button type="button" variant={"secondary"} disabled={disabled} onClick={() => open()}>
            <ImagePlus className="mr-2 h-4 w-4" />
            Upload an image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
