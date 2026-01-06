"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Share2, Home } from "lucide-react"
import Image from "next/image"

export default function ResultPage() {
  const router = useRouter()
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [roomImage, setRoomImage] = useState<string | null>(null)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isSaving, setIsSaving] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedResultImage = sessionStorage.getItem("resultImage")
    const storedRoomImage = sessionStorage.getItem("roomImage")

    if (!storedResultImage) {
      router.push("/capture")
      return
    }

    setResultImage(storedResultImage)
    setRoomImage(storedRoomImage)
  }, [router])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }

  const handleDownload = async () => {
    if (!resultImage) return

    setIsSaving(true)
    try {
      const response = await fetch(resultImage)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `roomvision-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("[v0] Download error:", error)
      alert("Failed to download image. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleShare = async () => {
    if (!resultImage) return

    try {
      if (navigator.share) {
        const response = await fetch(resultImage)
        const blob = await response.blob()
        const file = new File([blob], "roomvision.jpg", { type: "image/jpeg" })

        await navigator.share({
          title: "RoomVision Result",
          text: "Check out this furniture visualization",
          files: [file],
        })
      } else {
        await navigator.clipboard.writeText(resultImage)
        alert("Link copied to clipboard")
      }
    } catch (error) {
      console.error("[v0] Share error:", error)
    }
  }

  const handleStartOver = () => {
    sessionStorage.clear()
    router.push("/capture")
  }

  if (!resultImage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Loading result...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-4 py-6 border-b border-border/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <Home className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-serif font-medium">Your Visualization</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleShare} className="h-9 bg-transparent">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-9"
            >
              <Download className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Download"}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2 pb-4">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Visualization Complete</h2>
            <p className="text-sm text-muted-foreground">Use the slider to compare before and after</p>
          </div>

          {roomImage && (
            <Card className="p-6 shadow-sm border">
              <div className="space-y-4">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Before & After</h3>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted" ref={sliderRef}>
                  {/* After Image */}
                  <div className="absolute inset-0">
                    <Image src={resultImage || "/placeholder.svg"} alt="Result" fill className="object-contain" />
                  </div>

                  {/* Before Image with clip */}
                  <div
                    className="absolute inset-0"
                    style={{
                      clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    }}
                  >
                    <Image src={roomImage || "/placeholder.svg"} alt="Original" fill className="object-contain" />
                  </div>

                  {/* Slider Line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
                    style={{
                      left: `${sliderPosition}%`,
                    }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-background">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-3 bg-foreground/40 rounded-full" />
                        <div className="w-0.5 h-3 bg-foreground/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>Before</span>
                  <span>After</span>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 shadow-sm border">
            <div className="space-y-4">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Final Result</h3>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <Image src={resultImage || "/placeholder.svg"} alt="Final Result" fill className="object-contain" />
              </div>
            </div>
          </Card>

          <Button
            onClick={handleStartOver}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 shadow-sm"
          >
            Create Another Visualization
          </Button>
        </div>
      </main>
    </div>
  )
}
