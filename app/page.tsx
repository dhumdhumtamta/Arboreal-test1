import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MoveRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="px-4 lg:px-8 py-6 border-b border-border/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-serif font-medium tracking-tight text-foreground">RoomVision</h1>
          <Link href="/capture">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-5">
              Start Project
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-secondary/30 text-xs font-medium text-secondary-foreground">
              <span className="flex h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              AI-Powered Spatial Design
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.08] tracking-tight text-balance">
              See furniture in your space <br className="hidden md:block" /> before you commit.
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
              Advanced spatial computing transforms your photos into realistic furniture placements. Make confident
              design decisions instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/capture">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 shadow-sm hover:shadow-md transition-all"
              >
                Create Visualization
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-16 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <MoveRight className="h-4 w-4" strokeWidth={2} />
                <span className="uppercase tracking-wider">Capture</span>
              </div>
              <h3 className="text-lg font-medium">Your Space</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Photograph your room. Our system analyzes depth, lighting, and spatial context.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <MoveRight className="h-4 w-4" strokeWidth={2} />
                <span className="uppercase tracking-wider">Select</span>
              </div>
              <h3 className="text-lg font-medium">Furniture Piece</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Upload the item you're considering. We handle perspective matching automatically.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <MoveRight className="h-4 w-4" strokeWidth={2} />
                <span className="uppercase tracking-wider">Generate</span>
              </div>
              <h3 className="text-lg font-medium">Realistic Preview</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                AI renders photorealistic placement with accurate shadows and lighting in seconds.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-4 py-8 border-t border-border/40">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-muted-foreground">
          <span className="font-medium">RoomVision</span>
          <span>© 2025</span>
        </div>
      </footer>
    </div>
  )
}
