"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Upload, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { CameraCapture } from "@/components/camera-capture"
import { ImageUploader } from "@/components/image-uploader"

export default function CapturePage() {
  const router = useRouter()
  const [mode, setMode] = useState<"select" | "camera" | "upload">("select")
  const [roomImage, setRoomImage] = useState<string | null>(null)

  const handleCameraCapture = (imageDataUrl: string) => {
    setRoomImage(imageDataUrl)
    sessionStorage.setItem("roomImage", imageDataUrl)
    router.push("/furniture")
  }

  const handleUpload = (imageDataUrl: string) => {
    setRoomImage(imageDataUrl)
    sessionStorage.setItem("roomImage", imageDataUrl)
    router.push("/furniture")
  }

  if (mode === "camera") {
    return <CameraCapture onCapture={handleCameraCapture} onCancel={() => setMode("select")} />
  }

  if (mode === "upload") {
    return (
      <div className="min-h-screen bg-background">
        <header className="px-4 py-6 border-b border-border/40">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setMode("select")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-serif font-medium">Upload Room Photo</h1>
          </div>
        </header>
        <main className="px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <ImageUploader onUpload={handleUpload} />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="px-4 py-6 border-b border-border/40">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-serif font-medium">Capture Your Space</h1>
        </div>
      </header>

      <main className="px-4 py-12 md:py-16">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-3 mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight">Choose input method</h2>
            <p className="text-muted-foreground text-base">Select how you'd like to provide your room photo</p>
          </div>

          <div className="grid gap-4">
            <Card
              className="p-6 cursor-pointer hover:shadow-md transition-all border hover:border-primary/50 group"
              onClick={() => setMode("camera")}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <Camera className="h-5 w-5 text-primary" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1.5">Take Photo</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Use your device camera to capture your room now
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="p-6 cursor-pointer hover:shadow-md transition-all border hover:border-primary/50 group"
              onClick={() => setMode("upload")}
            >
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <Upload className="h-5 w-5 text-primary" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg mb-1.5">Upload Photo</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Choose an existing photo from your gallery
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="pt-8 space-y-4">
            <h4 className="text-sm font-medium text-foreground uppercase tracking-wider">Photography Guidelines</h4>
            <ul className="space-y-3">
              {[
                "Ensure adequate natural or artificial lighting",
                "Capture the full wall where furniture will be placed",
                "Hold device steady for optimal image clarity",
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
    </div>
  )
}
