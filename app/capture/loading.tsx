import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function CaptureLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="px-4 py-6 border-b border-foreground/5">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-6 w-40" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2 mb-8">
            <Skeleton className="h-8 md:h-10 w-3/4 mx-auto" />
            <Skeleton className="h-5 w-1/2 mx-auto" />
          </div>

          {/* Action Cards Skeleton */}
          <div className="grid gap-4">
            {[1, 2].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Tips Card Skeleton */}
          <Card className="p-6 bg-primary/5 border-primary/20">
            <Skeleton className="h-5 w-32 mb-3" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <Skeleton className="w-4 h-4 rounded-full mt-0.5" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
