"use client"

import { Star, MapPin, Clock, Eye, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type { Trail } from "@/lib/dummy-data"

interface TrailCardProps {
  trail: Trail
}

export function TrailCard({ trail }: TrailCardProps) {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "all"

  const trailUrl = `/trail/${trail.id}?from=/search&tab=${currentTab}`

  return (
    <Link href={trailUrl}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="aspect-video relative overflow-hidden">
          <img src={trail.coverImage || "/placeholder.svg"} alt={trail.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{trail.stats.stops} stops</span>
                </div>
                <span>•</span>
                <span>{trail.stats.distance}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{trail.stats.duration}</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {trail.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{trail.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{trail.description}</p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium text-gray-900">{trail.rating}</span>
              <span>({trail.reviewCount})</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{trail.viewCount > 1000 ? `${(trail.viewCount / 1000).toFixed(1)}k` : trail.viewCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{trail.likeCount}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={trail.creator.avatar || "/placeholder.svg"}
                alt={trail.creator.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm text-gray-600">@{trail.creator.username}</span>
            </div>
            <span className="text-sm text-gray-500">{trail.createdAt}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
