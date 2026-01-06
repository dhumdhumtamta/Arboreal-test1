import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import {
  Inter,
  Playfair_Display,
  Libre_Baskerville as V0_Font_Libre_Baskerville,
  IBM_Plex_Mono as V0_Font_IBM_Plex_Mono,
  Lora as V0_Font_Lora,
} from "next/font/google"

// Initialize fonts
const _libreBaskerville = V0_Font_Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] })
const _ibmPlexMono = V0_Font_IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})
const _lora = V0_Font_Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "RoomVision - Visualize Furniture in Your Space",
  description:
    "See how furniture fits your space before you buy. Upload a room photo and furniture image to create realistic visualizations.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">{children}</body>
    </html>
  )
}
