"use client"

import { Star, MapPin, Clock, Navigation } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import type { Trail } from "@/lib/dummy-data"

interface TrailCardHorizontalProps {
  trail: Trail
}

export function TrailCardHorizontal({ trail }: TrailCardHorizontalProps) {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "all"

  const trailUrl = `/trail/${trail.id}?from=/search&tab=${currentTab}`
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trail.title + " trail")}`

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 p-0">
      <div className="flex h-28">
        <Link href={trailUrl} className="block shrink-0 ml-3 my-3">
          <div className="relative h-22 w-22 overflow-hidden">
            <img
              src={trail.coverImage || "/placeholder.svg"}
              alt={trail.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Link>

        <div className="flex-1 p-2 mr-3 flex flex-col justify-between min-w-0">
          <Link href={trailUrl} className="block">
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-gray-900 leading-tight truncate">{trail.title}</h3>
              </div>

              <p className="text-sm text-gray-700 truncate">
                by <span className="font-medium">{trail.creator.name}</span>
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span>{trail.stats.stops} stops</span>
                </div>
                <span className="shrink-0">•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 shrink-0" />
                  <span>{trail.stats.duration}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="shrink-0 p-2 flex flex-col justify-between items-end">
          <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded shrink-0">
            <Star className="h-3 w-3 fill-green-500 text-green-500" />
            <span className="text-xs font-semibold text-green-700">{trail.rating.toFixed(1)}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.preventDefault()
              window.open(directionsUrl, "_blank")
            }}
            className="h-8 w-8 p-0"
          >
            <Navigation className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
