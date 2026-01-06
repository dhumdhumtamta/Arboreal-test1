import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

export default function GenerateLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Animated Loading */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Spinner className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Status Messages Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-5 w-48 mx-auto" />
        </div>

        {/* Progress Steps Skeleton */}
        <div className="space-y-3 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>

        <Skeleton className="h-3 w-56 mx-auto pt-4" />
      </div>
    </div>
  )
}
