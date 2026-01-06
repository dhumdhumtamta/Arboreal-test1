import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Skeleton */}
      <header className="px-4 py-6 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
        </div>
      </header>

      {/* Hero Section Skeleton */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8 w-full">
          {/* Hero Content */}
          <div className="space-y-4">
            <Skeleton className="h-12 md:h-16 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-full max-w-xl mx-auto" />
            <Skeleton className="h-6 w-3/4 max-w-lg mx-auto" />
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-4">
            <Skeleton className="h-14 w-48 rounded-full" />
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-foreground/5">
                <Skeleton className="w-12 h-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto text-center">
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
      </footer>
    </div>
  )
}
