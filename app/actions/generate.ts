"use server"

import { fal } from "@fal-ai/client"

interface GenerateCompositeParams {
  roomImage: string
  furnitureImage: string
  userPrompt?: string
}

interface GenerateCompositeResult {
  imageUrl?: string
  error?: string
}

export async function generateComposite(params: GenerateCompositeParams): Promise<GenerateCompositeResult> {
  try {
    const { roomImage, furnitureImage, userPrompt } = params

    // Ensure images have proper data URI format
    const roomImageUrl = roomImage.startsWith("data:") ? roomImage : `data:image/jpeg;base64,${roomImage}`
    const furnitureImageUrl = furnitureImage.startsWith("data:")
      ? furnitureImage
      : `data:image/jpeg;base64,${furnitureImage}`

    const prompt = userPrompt
      ? `Seamlessly integrate the furniture from the second image into the room from the first image. ${userPrompt} Ensure realistic lighting, shadows, and perspective that matches the room. The furniture should blend perfectly with the room's lighting conditions and appear as if it was photographed in that space. Maintain photorealistic quality and natural color matching.`
      : `Seamlessly integrate the furniture from the second image into the room from the first image. Place the furniture naturally in an appropriate location with realistic lighting, shadows, and perspective that matches the room. The furniture should blend perfectly with the room's lighting conditions and appear as if it was photographed in that space. Maintain photorealistic quality and natural color matching.`

    console.log("[v0] Calling fal.ai nano-banana with prompt:", prompt)

    // Call fal.ai nano-banana API
    const result = await fal.subscribe("fal-ai/nano-banana-pro/edit", {
      input: {
        prompt: prompt,
        image_urls: [roomImageUrl, furnitureImageUrl],
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log("[v0] Queue update:", update.status)
      },
    })

    console.log("[v0] fal.ai result:", result)

    // Extract the generated image URL
    if (result.data && typeof result.data === "object" && "image" in result.data) {
      const imageData = result.data.image as { url: string }
      return { imageUrl: imageData.url }
    }

    // Handle different response formats
    if (result.data && typeof result.data === "object" && "images" in result.data) {
      const imagesData = result.data.images as Array<{ url: string }>
      if (imagesData.length > 0) {
        return { imageUrl: imagesData[0].url }
      }
    }

    return { error: "No image generated. Please try again." }
  } catch (error) {
    console.error("[v0] Generation error:", error)
    return {
      error: error instanceof Error ? error.message : "Failed to generate composite. Please try again.",
    }
  }
}
