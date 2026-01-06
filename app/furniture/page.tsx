"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { ImageUploader } from "@/components/image-uploader"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function FurniturePage() {
  const router = useRouter()
  const [roomImage, setRoomImage] = useState<string | null>(null)
  const [furnitureImage, setFurnitureImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")

  useEffect(() => {
    const storedRoomImage = sessionStorage.getItem("roomImage")
    if (!storedRoomImage) {
      router.push("/capture")
      return
    }
    setRoomImage(storedRoomImage)
  }, [router])

  const handleFurnitureUpload = (imageDataUrl: string) => {
    setFurnitureImage(imageDataUrl)
  }

  const handleGenerate = () => {
    if (!furnitureImage) return

    sessionStorage.setItem("furnitureImage", furnitureImage)
    sessionStorage.setItem("userPrompt", prompt)
    router.push("/generate")
  }

  const handleBack = () => {
    sessionStorage.removeItem("roomImage")
    router.push("/capture")
  }

  if (!roomImage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 py-6 border-b border-border/40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-serif font-medium">Upload Furniture</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 pb-32">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Room Preview */}
          <div className="space-y-3">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Room</h2>
            <Card className="p-0 overflow-hidden shadow-sm border">
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image src={roomImage || "/placeholder.svg"} alt="Room" fill className="object-cover" />
              </div>
            </Card>
          </div>

          {/* Furniture Upload */}
          <div className="space-y-3">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Furniture Image</h2>
            <ImageUploader
              onUpload={handleFurnitureUpload}
              title="Upload furniture image"
              description="Provide a clear photo of the furniture piece"
            />
          </div>

          {furnitureImage && (
            <div className="space-y-3">
              <Label htmlFor="prompt" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Placement Instructions (Optional)
              </Label>
              <Textarea
                id="prompt"
                placeholder="e.g., Place against the left wall, centered..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Specify placement preferences or leave blank for automatic positioning
              </p>
            </div>
          )}

          <div className="pt-4 space-y-4">
            <h4 className="text-xs font-medium text-foreground uppercase tracking-wider">Image Guidelines</h4>
            <ul className="space-y-3">
              {[
                "Use images with clear, unobstructed furniture views",
                "Plain or simple backgrounds yield optimal results",
                "Ensure furniture is well-lit and in focus",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" strokeWidth={2} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {furnitureImage && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/40 p-6 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <Button
              onClick={handleGenerate}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 shadow-sm"
            >
              Generate Visualization
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
