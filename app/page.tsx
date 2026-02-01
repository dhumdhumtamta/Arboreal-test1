"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { CloudUpload, Sparkles, Box, Hammer } from "lucide-react"
import Navbar from "@/components/navbar"

const BEFORE_IMAGE = "/images/hero-before.svg"
const AFTER_IMAGE = "/images/hero-after.svg"
const PINTEREST_IMAGE = "/images/inspiration.svg"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(55)
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    const bounds = containerRef.current?.getBoundingClientRect()
    if (!bounds) return

    const relativeX = clientX - bounds.left
    const percentage = (relativeX / bounds.width) * 100
    const clamped = Math.min(100, Math.max(0, percentage))
    setPosition(clamped)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const handlePointerMove = (event: PointerEvent) => updatePosition(event.clientX)
    const handlePointerUp = () => setIsDragging(false)

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [isDragging, updatePosition])

  const headlineOpacity = isDragging ? 0.85 : 1

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col items-center gap-12">
          <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <motion.h1
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: headlineOpacity }}
                transition={{ duration: 0.45 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-slate-900"
              >
                The bridge between your Pinterest board and your living room.
              </motion.h1>

              <motion.p
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08, duration: 0.45 }}
                className="text-base sm:text-lg text-slate-600 max-w-xl"
              >
                Arboreal isn't just a design tool. We visualize your dream setup and then physically build,
                deliver, and install it in your home. From URL to IRL in 15 days.
              </motion.p>

              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <Link href="/capture">
                  <Button size="lg" className="h-12 px-6 rounded-full bg-[#1A73E8] hover:bg-[#1668cc] text-white">
                    Start a Project
                  </Button>
                </Link>
                <Link href="#showcase" className="text-sm text-slate-700 hover:underline">View Showcase</Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                ref={containerRef}
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-50 touch-none"
                onPointerDown={(event) => {
                  setIsDragging(true)
                  updatePosition(event.clientX)
                }}
              >
                <img src={AFTER_IMAGE} alt="Furnished room" className="absolute inset-0 h-full w-full object-cover" />

                <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }} aria-hidden>
                  <img src={BEFORE_IMAGE} alt="Empty room" className="h-full w-full object-cover" />
                </div>

                <motion.div
                  className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.08)]"
                  style={{ left: `${position}%`, transform: "translateX(-1px)" }}
                  animate={{ left: `${position}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                <motion.div
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${position}%` }}
                  animate={{ left: `${position}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                >
                  <div className="h-14 w-14 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center cursor-grab -translate-x-1/2">
                    <motion.div whileTap={{ scale: 0.95 }} className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-medium select-none">
                      ⇆
                    </motion.div>
                  </div>
                </motion.div>

                <div className="absolute bottom-4 left-4">
                  <span className="rounded-full bg-slate-900/75 px-3 py-1 text-white text-xs">Pinterest Board</span>
                </div>

                <div className="absolute bottom-4 right-4">
                  <span className="rounded-full bg-white/95 border border-slate-200 px-3 py-1 text-slate-800 text-xs flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="opacity-90">
                      <path d="M20 6L9 17l-5-5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Delivered by Arboreal
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-3 rounded-full bg-white/95 border border-slate-200 px-2.5 py-1.5 shadow-sm backdrop-blur">
                  <img src={PINTEREST_IMAGE} alt="Pinterest inspiration" className="h-10 w-10 rounded-full object-cover border border-slate-200" />
                  <span className="text-xs font-medium text-slate-800">Inspiration</span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={position}
                  onChange={(event) => setPosition(Number(event.target.value))}
                  className="sr-only"
                  aria-label="Adjust before and after view"
                />
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white">
                <div className="flex-1">
                  <div className="flex items-center gap-6 justify-between">
                    <ProcessStep icon={<CloudUpload className="h-5 w-5" />} title="Inspiration" desc="Upload a photo or Pinterest link." />
                    <div className="flex-1 h-[1px] bg-slate-200 mx-4 hidden md:block" />
                    <ProcessStep icon={<Sparkles className="h-5 w-5" />} title="AI Architect" desc="Our AI generates a buildable 3D plan & budget." />
                    <div className="flex-1 h-[1px] bg-slate-200 mx-4 hidden md:block" />
                    <ProcessStep icon={<Box className="h-5 w-5" />} title="Sourcing" desc="We procure every item (furniture, tech, decor)." />
                    <div className="flex-1 h-[1px] bg-slate-200 mx-4 hidden md:block" />
                    <ProcessStep icon={<Hammer className="h-5 w-5" />} title="Execution" desc="Our team builds and installs the physical setup." />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="md:col-span-2 bg-[#F8F9FA] rounded-2xl p-5 flex flex-col gap-4 overflow-hidden">
                <h3 className="font-semibold text-slate-900">Zero-Guesswork Logistics</h3>
                <div className="flex-1 bg-white rounded-lg border border-slate-100 shadow-inner overflow-hidden">
                  <img src="/images/bento-logistics.svg" alt="delivery tracking map" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-2xl p-5 flex flex-col gap-4 overflow-hidden">
                <h3 className="font-semibold text-slate-900">Transparent Pricing</h3>
                <div className="h-36 bg-white rounded-md border border-slate-100 overflow-hidden">
                  <img src="/images/bento-pricing.svg" alt="budget breakdown" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-2xl p-5 flex flex-col gap-4 overflow-hidden">
                <h3 className="font-semibold text-slate-900">AI Quality Control</h3>
                <div className="h-36 bg-white rounded-md border border-slate-100 overflow-hidden">
                  <img src="/images/bento-quality.svg" alt="quality inspection" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-2xl p-5 flex flex-col gap-4 overflow-hidden">
                <h3 className="font-semibold text-slate-900">End-to-end Warranty</h3>
                <div className="h-36 bg-white rounded-md border border-slate-100 overflow-hidden">
                  <img src="/images/bento-warranty.svg" alt="warranty protection" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-2xl p-5 flex flex-col gap-4 overflow-hidden">
                <h3 className="font-semibold text-slate-900">Sustainable Sourcing</h3>
                <div className="h-36 bg-white rounded-md border border-slate-100 overflow-hidden">
                  <img src="/images/bento-sustainable.svg" alt="eco-friendly materials" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </section>

          <section id="showcase" className="w-full">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">It's not a render. It's real life.</h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {[
                "/images/gallery-1.svg",
                "/images/gallery-2.svg",
                "/images/gallery-3.svg",
                "/images/gallery-4.svg",
                "/images/gallery-5.svg",
                "/images/gallery-6.svg"
              ].map((imageUrl, i) => (
                <div key={i} className="mb-4 break-inside-avoid">
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={imageUrl} alt={`setup-${i + 1}`} className="w-full h-auto object-cover rounded-xl" />
                    <span className="absolute top-3 left-3 bg-white/95 px-2 py-1 text-xs rounded-md border border-slate-100">Sourced & Installed</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="w-full">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 flex flex-col items-center gap-4 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-semibold">Your dream setup is waiting to be built.</h3>
              <Link href="/capture">
                <Button size="lg" className="h-12 px-6 rounded-full bg-[#1A73E8] hover:bg-[#1668cc] text-white">Get My Build Estimate</Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-500 gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium">A</div>
            <div>
              <div className="font-medium text-slate-700">Arboreal</div>
              <div className="text-xs text-slate-400">© 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-slate-600 hover:underline">Terms</Link>
            <Link href="#" className="text-slate-600 hover:underline">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProcessStep({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
      <div className="h-12 w-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-700 shadow-sm">
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{desc}</div>
      </div>
    </div>
  )
}
