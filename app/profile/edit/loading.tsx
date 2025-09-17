import { Card } from "@/components/ui/card"

export default function EditProfileLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm -mx-4 -mt-6 mb-6">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse mr-3" />
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Profile Picture Skeleton */}
      <Card className="p-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="w-32 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="w-48 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="flex space-x-3">
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </Card>

      {/* Form Skeletons */}
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="w-40 h-5 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-4">
            {[...Array(2)].map((_, j) => (
              <div key={j} className="space-y-2">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-9 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
