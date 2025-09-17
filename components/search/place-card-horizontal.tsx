"use client"

import { Star, MapPin, Navigation, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PlaceCardHorizontalProps {
  place: {
    id: string
    name: string
    category: string
    subcategory: string
    rating: number
    reviewCount: number
    priceRange: string
    address: string
    image: string
    trendingScore: number
    movement?: "up" | "down" | "same"
    movementAmount?: number
  }
  rank?: number
  currentTab?: string
  showRanking?: boolean
}

export function PlaceCardHorizontal({
  place,
  rank,
  currentTab = "all",
  showRanking = false,
}: PlaceCardHorizontalProps) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.address)}`

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 p-0">
      <div className="flex h-28">
        <Link href={`/restaurant/${place.id}?from=search&tab=${currentTab}`} className="block shrink-0 ml-3 my-3">
          <div className="relative h-22 w-22 overflow-hidden">
            <img
              src={place.image || "/placeholder.svg"}
              alt={place.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Link>

        <div className="flex-1 p-2 mr-3 flex flex-col justify-between min-w-0">
          <Link href={`/restaurant/${place.id}?from=search&tab=${currentTab}`} className="block">
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-gray-900 leading-tight truncate">{place.name}</h3>
              </div>

              <p className="text-sm text-gray-700 truncate">{place.subcategory}</p>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="shrink-0">{place.priceRange}</span>
                <span className="shrink-0">•</span>
                <div className="flex items-center gap-1 truncate min-w-0">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="truncate">{place.address}</span>
                </div>
              </div>

              {showRanking && rank && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded">
                    <span className="text-sm font-bold text-gray-900">{rank}</span>
                    {place.movementAmount !== undefined && place.movementAmount !== 0 && (
                      <div
                        className={`flex items-center ${
                          place.movement === "up"
                            ? "text-green-500"
                            : place.movement === "down"
                              ? "text-red-500"
                              : "text-gray-400"
                        }`}
                      >
                        {place.movement === "up" && <TrendingUp className="h-3 w-3" />}
                        {place.movement === "down" && <TrendingDown className="h-3 w-3" />}
                        {place.movement === "same" && <Minus className="h-3 w-3" />}
                        <span className="text-xs font-semibold">
                          {place.movementAmount > 0 ? `+${place.movementAmount}` : place.movementAmount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Link>
        </div>

        <div className="shrink-0 p-2 flex flex-col justify-between items-end">
          <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded shrink-0">
            <Star className="h-3 w-3 fill-green-500 text-green-500" />
            <span className="text-xs font-semibold text-green-700">{place.rating.toFixed(1)}</span>
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
