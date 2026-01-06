import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function ResultLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Skeleton */}
      <header className="px-4 py-6 border-b border-foreground/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Success Message Skeleton */}
          <Card className="p-6 bg-secondary/10 border-secondary/20">
            <div className="flex items-start gap-4">
              <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </Card>

          {/* Before/After Comparison Skeleton */}
          <Card className="p-4">
            <div className="space-y-4">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="aspect-video w-full rounded-lg" />
              <Skeleton className="h-2 w-full rounded-lg" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </Card>

          {/* Result Image Skeleton */}
          <Card className="p-4">
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="aspect-video w-full rounded-lg" />
            </div>
          </Card>

          {/* Action Buttons Skeleton */}
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Start Over Button Skeleton */}
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </main>
    </div>
  )
}
