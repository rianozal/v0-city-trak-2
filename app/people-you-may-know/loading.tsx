import { Card } from "@/components/ui/card"

export default function PeopleYouMayKnowLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gray-200 rounded mr-3 animate-pulse" />
          <div>
            <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="w-64 h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="w-24 h-3 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="w-40 h-3 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="w-28 h-3 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
                <div className="w-16 h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
