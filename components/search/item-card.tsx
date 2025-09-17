"use client"

import { Star, MapPin, ExternalLink, Navigation } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ItemCardProps {
  item: {
    id: string
    name: string
    description: string
    rating: number
    reviewCount: number
    image: string
    place: {
      id: string
      name: string
      rating: number
      reviewCount: number
      priceRange: string
      address: string
    }
    reviewSnippet: string
  }
  currentTab?: string
}

export function ItemCard({ item, currentTab = "all" }: ItemCardProps) {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.place.name + " " + item.place.address)}`

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <Link href={`/restaurant/${item.place.id}?from=search&tab=${currentTab}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link href={`/restaurant/${item.place.id}?from=search&tab=${currentTab}`} className="block">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.name}</h3>
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full shrink-0">
                <Star className="h-3 w-3 fill-green-500 text-green-500" />
                <span className="text-sm font-semibold text-green-700">{item.rating.toFixed(1)}</span>
                <span className="text-xs text-green-600">({item.reviewCount})</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-base text-gray-700">
                at <span className="font-semibold">{item.place.name}</span>
              </p>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{item.place.rating.toFixed(1)}</span>
                  <span>({item.place.reviewCount.toLocaleString()})</span>
                </div>
                <span>•</span>
                <span className="font-medium">{item.place.priceRange}</span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-3 w-3" />
                <span>{item.place.address}</span>
              </div>
            </div>
          </div>
        </Link>

        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-700 italic leading-relaxed">"{item.reviewSnippet}"</p>
        </div>

        <div className="flex gap-2 pt-2">
          <Link href={`/restaurant/${item.place.id}?from=search&tab=${currentTab}`} className="flex-1">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Item
            </Button>
          </Link>

          <Button
            variant="outline"
            size="default"
            onClick={(e) => {
              e.preventDefault()
              window.open(directionsUrl, "_blank")
            }}
            className="px-4"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
