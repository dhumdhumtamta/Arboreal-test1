"use client"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { generateComposite } from "@/app/actions/generate"

export default function GeneratePage() {
  const router = useRouter()
  const [status, setStatus] = useState<string>("Initializing...")
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const generate = async () => {
      try {
        const roomImage = sessionStorage.getItem("roomImage")
        const furnitureImage = sessionStorage.getItem("furnitureImage")
        const userPrompt = sessionStorage.getItem("userPrompt") || undefined

        if (!roomImage || !furnitureImage) {
          router.push("/capture")
          return
        }

        // Simulate progress updates
        const progressStages = [
          { progress: 15, message: "Analyzing spatial context..." },
          { progress: 35, message: "Matching lighting conditions..." },
          { progress: 60, message: "Computing perspective..." },
          { progress: 85, message: "Rendering composite..." },
        ]

        let currentStage = 0
        const progressInterval = setInterval(() => {
          if (currentStage < progressStages.length) {
            setProgress(progressStages[currentStage].progress)
            setStatus(progressStages[currentStage].message)
            currentStage++
          }
        }, 800)

        const result = await generateComposite({
          roomImage,
          furnitureImage,
          userPrompt,
        })

        clearInterval(progressInterval)

        if (result.error) {
          setError(result.error)
          return
        }

        if (result.imageUrl) {
          setProgress(100)
          setStatus("Complete")
          sessionStorage.setItem("resultImage", result.imageUrl)
          setTimeout(() => router.push("/result"), 500)
        }
      } catch (err) {
        console.error("[v0] Generation error:", err)
        setError("An unexpected error occurred. Please try again.")
      }
    }

    generate()
  }, [router])

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-12 h-12 rounded-full border-2 border-destructive flex items-center justify-center mx-auto">
            <span className="text-destructive font-medium">!</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-medium">Generation Failed</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{error}</p>
          </div>
          <Button
            onClick={() => router.push("/furniture")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-6"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-2 border-muted rounded-full" />
          <div
            className="absolute inset-0 border-2 border-primary rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: "1s" }}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-medium tracking-tight">Generating Preview</h2>
          <p className="text-sm text-muted-foreground">{status}</p>
        </div>

        <div className="space-y-2">
          <div className="h-1 w-full bg-secondary overflow-hidden rounded-full">
            <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground tabular-nums">{progress}%</p>
        </div>

        <p className="text-xs text-muted-foreground">This typically takes 15-30 seconds</p>
      </div>
    </div>
  )
}
