import { Skeleton } from "@/components/ui/skeleton"

export default function FurnitureLoading() {
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
      <main className="px-4 py-8 pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Room Preview Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="aspect-video w-full rounded-xl" />
          </div>

          {/* Furniture Upload Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <div className="border-2 border-dashed border-foreground/20 rounded-xl p-12">
              <div className="flex flex-col items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
            </div>
          </div>

          {/* Tips Card Skeleton */}
          <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
            <Skeleton className="h-5 w-32 mb-3" />
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <Skeleton className="w-4 h-4 rounded-full mt-0.5" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
