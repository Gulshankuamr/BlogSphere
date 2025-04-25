"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value: string | null
  onChange: (value: string | null) => void
  label?: string
  className?: string
}

export default function ImageUpload({ value, onChange, label = "Upload Image", className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            onChange(event.target.result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    },
    [onChange],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            onChange(event.target.result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    },
    [onChange],
  )

  const handleRemove = useCallback(() => {
    onChange(null)
  }, [onChange])

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center h-64 border-2 rounded-md transition-colors",
        isDragging ? "border-primary bg-primary/10 border-dashed" : "border-input hover:bg-muted/50 cursor-pointer",
        className,
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {value ? (
        <>
          <div className="relative w-full h-full">
            <Image
              src={value || "/placeholder.svg"}
              alt="Uploaded image"
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw h-[400px]"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="mb-2 text-sm text-muted-foreground">{label}</p>
            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF</p>
            <p className="text-xs text-muted-foreground mt-1">Drag & drop or click to browse</p>
          </div>
          <input type="file" className="hidden" onChange={handleChange} accept="image/*" />
        </label>
      )}
    </div>
  )
}
