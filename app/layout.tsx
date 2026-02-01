import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import AuthProvider from "@/components/auth-provider"

import {
  Inter,
  Playfair_Display,
  Lato,
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

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Adani Kandivali - Premium Luxury Living in Mumbai",
  description:
    "Adani Kandivali by Adani Realty brings a legacy of excellence to one of Mumbai's most evolving suburbs. Premium luxury living in the western corridor.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${lato.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
