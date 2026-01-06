"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, Check } from "lucide-react"
import Image from "next/image"

interface ImageUploaderProps {
  onUpload: (imageDataUrl: string) => void
  title?: string
  description?: string
}

export function ImageUploader({ onUpload, title, description }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG, WebP)")
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB")
      return
    }

    setError(null)

    // Read file and create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleClear = () => {
    setPreview(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleConfirm = () => {
    if (preview) {
      onUpload(preview)
    }
  }

  return (
    <div className="space-y-4">
      {!preview ? (
        <Card
          className={`p-8 border-2 border-dashed cursor-pointer transition-all ${
            isDragging ? "border-primary bg-primary/5" : "border-foreground/20 hover:border-primary/50"
          }`}
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif font-semibold text-lg">{title || "Upload an image"}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed max-w-sm">
                {description || "Click to browse or drag and drop your image here"}
              </p>
              <p className="text-xs text-foreground/40">JPG, PNG, or WebP • Max 10MB</p>
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" />
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="p-4 relative">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-foreground/5">
              <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              className="absolute top-6 right-6 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClear} className="flex-1 bg-transparent">
              Choose Different Image
            </Button>
            <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90 text-white">
              <Check className="mr-2 h-5 w-5" />
              Continue
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}
