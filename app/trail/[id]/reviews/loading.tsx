import { Card } from "@/components/ui/card"

export default function TrailReviewsLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 -mx-4 -mt-6 mb-6">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <div className="w-16 h-8 bg-gray-200 rounded mr-3 animate-pulse" />
            <div>
              <div className="w-48 h-6 bg-gray-200 rounded mb-1 animate-pulse" />
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs Skeleton */}
      <Card className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </Card>

      {/* Reviews Skeleton */}
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="w-32 h-4 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="space-y-2 mb-3">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse" />
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex space-x-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
