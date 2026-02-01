import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/navbar"

const showcaseItems = [
  {
    title: "Modern Minimal Living Room",
    style: "Scandinavian",
    description: "Soft neutrals, clean lines, and warm textures for an airy feel.",
  },
  {
    title: "Cozy Reading Nook",
    style: "Contemporary",
    description: "Layered lighting and plush textiles for a relaxed corner.",
  },
  {
    title: "Urban Loft Workspace",
    style: "Industrial",
    description: "Metal accents with natural wood to balance function and style.",
  },
  {
    title: "Family Lounge Refresh",
    style: "Modern Classic",
    description: "Timeless silhouettes with updated materials and colors.",
  },
  {
    title: "Bright Dining Update",
    style: "Coastal",
    description: "Light woods and soft blues to keep the space open.",
  },
  {
    title: "Calm Bedroom Retreat",
    style: "Japandi",
    description: "Minimal decor with natural textures for a restful vibe.",
  },
]

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-[#1A73E8]">Showcase</p>
              <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mt-2">
                Inspiration from real projects
              </h1>
              <p className="text-slate-600 mt-3 max-w-2xl">
                Explore curated spaces designed with Arboreal. Each concept is tailored for balance,
                comfort, and practical living.
              </p>
            </div>
            <Link href="/capture">
              <Button className="bg-[#1A73E8] hover:bg-[#1668cc] text-white">
                Start Your Project
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showcaseItems.map((item) => (
              <Card key={item.title} className="p-6 bg-white border border-slate-200">
                <div className="h-40 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 mb-5" />
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {item.style}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mt-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          <Card className="mt-12 p-8 bg-white border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Ready to build your space?
                </h2>
                <p className="text-slate-600 mt-2">
                  Capture your room and let Arboreal generate your personalized design plan.
                </p>
              </div>
              <Link href="/capture">
                <Button className="bg-[#1A73E8] hover:bg-[#1668cc] text-white">
                  Capture a Room
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
