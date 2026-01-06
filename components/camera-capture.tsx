"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, X, RotateCw, Zap, ZapOff, AlertCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void
  onCancel: () => void
}

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
  const [flashEnabled, setFlashEnabled] = useState(false)
  const [isCapturing, setIsCapturing] = useState(false)

  useEffect(() => {
    startCamera()
  }, [])

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
      videoRef.current.play().catch((err) => {
        console.error("[v0] Error playing video:", err)
      })
    }
  }, [stream])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const startCamera = async () => {
    try {
      console.log("[v0] Requesting camera access...")

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera is not supported on this device or browser.")
        setIsLoading(false)
        return
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      })

      console.log("[v0] Camera access granted")
      setStream(mediaStream)
      setError(null)
      setPermissionDenied(false)
      setIsLoading(false)
    } catch (err) {
      console.error("[v0] Camera access error:", err)

      if (err instanceof Error) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          setPermissionDenied(true)
          setError("Camera permission was denied. Please allow camera access to continue.")
        } else if (err.name === "NotFoundError") {
          setError("No camera found on this device.")
        } else if (err.name === "NotReadableError") {
          setError("Camera is already in use by another application.")
        } else if (err.name === "OverconstrainedError") {
          setError("Camera doesn't support the requested settings.")
        } else {
          setError("Unable to access camera. Please check your browser settings.")
        }
      } else {
        setError("Unable to access camera. Please check permissions.")
      }
      setIsLoading(false)
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  const handleUnmount = () => {
    stopCamera()
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    setIsCapturing(true)
    const video = videoRef.current
    const canvas = canvasRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9)

      stopCamera()
      onCapture(imageDataUrl)
    }
  }

  const toggleCamera = async () => {
    const newFacingMode = facingMode === "user" ? "environment" : "user"
    setFacingMode(newFacingMode)

    stopCamera()

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: newFacingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      })
      setStream(mediaStream)
    } catch (err) {
      console.error("[v0] Error switching camera:", err)
      setError("Unable to switch camera")
    }
  }

  const handleCancel = () => {
    stopCamera()
    onCancel()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <Spinner className="h-8 w-8 mx-auto" />
          <p className="text-foreground/60">Initializing camera...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#C17B68]/10 flex items-center justify-center mx-auto">
            <AlertCircle className="h-8 w-8 text-[#C17B68]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-serif font-bold">Camera Access Required</h2>
            <p className="text-foreground/60 leading-relaxed">{error}</p>
          </div>

          {permissionDenied && (
            <div className="bg-[#F8F6F3] border border-[#D4A574]/20 rounded-lg p-4 text-left space-y-3">
              <p className="font-medium text-sm">To enable camera access:</p>
              <ol className="text-sm text-foreground/70 space-y-2 list-decimal list-inside leading-relaxed">
                <li>Look for the camera icon in your browser's address bar</li>
                <li>Click it and select "Allow" for camera permissions</li>
                <li>Click "Try Again" below</li>
              </ol>
              <p className="text-xs text-foreground/50 leading-relaxed">
                Note: Camera access requires HTTPS or localhost
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                setError(null)
                setPermissionDenied(false)
                setIsLoading(true)
                startCamera()
              }}
              className="w-full bg-[#D4A574] hover:bg-[#D4A574]/90"
            >
              Try Again
            </Button>
            <Button onClick={handleCancel} variant="outline" className="w-full bg-transparent">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
          onLoadedMetadata={() => {
            console.log("[v0] Video metadata loaded, stream ready")
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full grid grid-cols-3 grid-rows-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCancel}
            className="bg-black/50 hover:bg-black/70 text-white"
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFlashEnabled(!flashEnabled)}
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              {flashEnabled ? <Zap className="h-5 w-5" /> : <ZapOff className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCamera}
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              <RotateCw className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="absolute bottom-32 left-0 right-0 px-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 max-w-sm mx-auto">
            <p className="text-white text-sm text-center leading-relaxed">
              Capture the entire wall or area where you want to place furniture
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-black">
        <div className="max-w-sm mx-auto flex items-center justify-center">
          <Button
            size="lg"
            onClick={capturePhoto}
            disabled={isCapturing}
            className="w-20 h-20 rounded-full bg-white hover:bg-white/90 text-black p-0"
          >
            <Camera className="h-8 w-8" />
          </Button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
