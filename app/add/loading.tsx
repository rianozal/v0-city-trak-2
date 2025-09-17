import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function AddPageLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-6 w-32" />
          <div className="w-16" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-6">
        {/* Welcome Section Skeleton */}
        <div className="text-center py-6 space-y-2">
          <Skeleton className="h-8 w-64 mx-auto" />
          <Skeleton className="h-4 w-80 mx-auto" />
        </div>

        {/* Add Options Skeleton */}
        <div className="space-y-4 max-w-md mx-auto">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-2 w-2 rounded-full" />
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA Skeleton */}
        <div className="text-center py-8">
          <Card className="p-6 max-w-sm mx-auto">
            <div className="space-y-2">
              <Skeleton className="h-8 w-8 mx-auto rounded" />
              <Skeleton className="h-5 w-32 mx-auto" />
              <Skeleton className="h-4 w-full" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
