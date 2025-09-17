"use client"

import { Star, TrendingUp, TrendingDown, Minus, Eye, Navigation } from "lucide-react"
import type { Restaurant } from "@/lib/dummy-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RestaurantCardProps {
  restaurant: Restaurant
  showRank?: boolean
  horizontal?: boolean
  currentTab?: string
}

export function RestaurantCard({
  restaurant,
  showRank = true,
  horizontal = false,
  currentTab = "all",
}: RestaurantCardProps) {
  const MovementIcon = restaurant.movement === "up" ? TrendingUp : restaurant.movement === "down" ? TrendingDown : Minus

  const movementColor =
    restaurant.movement === "up" ? "text-green-500" : restaurant.movement === "down" ? "text-red-500" : "text-gray-400"

  const trendingScore = Math.max(100 - restaurant.rank * 2 + (restaurant.movementAmount || 0), 50)

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + " " + restaurant.address)}`

  if (horizontal) {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="flex h-28">
          {/* Rank number */}
          {showRank && (
            <div className="shrink-0 flex items-center justify-center w-12 bg-gray-50">
              <span className="text-2xl font-bold text-gray-800">{restaurant.rank}</span>
            </div>
          )}

          {/* Movement indicator */}
          {restaurant.movementAmount !== 0 && (
            <div className="shrink-0 flex items-center justify-center w-8">
              <div className={`flex items-center ${movementColor}`}>
                <MovementIcon className="h-3 w-3" />
                <span className="text-xs font-semibold">
                  {restaurant.movementAmount > 0 ? `+${restaurant.movementAmount}` : restaurant.movementAmount}
                </span>
              </div>
            </div>
          )}

          {/* Updated restaurant link with search context and tab parameter */}
          <Link
            href={`/restaurant/${restaurant.id}?from=search&tab=${currentTab}`}
            className="block shrink-0 ml-3 my-3"
          >
            <div className="relative h-full overflow-hidden">
              <img
                src={restaurant.image || "/placeholder.svg"}
                alt={restaurant.name}
                className="w-22 h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
              />
            </div>
          </Link>

          <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
            {/* Updated restaurant link with search context and tab parameter */}
            <Link href={`/restaurant/${restaurant.id}?from=search&tab=${currentTab}`} className="block">
              <div className="space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-gray-900 leading-tight truncate">{restaurant.name}</h3>
                </div>

                <p className="text-sm text-gray-700 truncate">{restaurant.subcategory}</p>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>
                      {restaurant.rating.toFixed(1)} ({restaurant.reviewCount.toLocaleString()})
                    </span>
                  </div>
                  <span>•</span>
                  <span>₹₹</span>
                  <span>•</span>
                  <div className="flex items-center gap-1 truncate">
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="shrink-0 p-3 flex flex-col justify-between items-end">
            <div className="flex items-center gap-1 bg-blue-50 px-1.5 py-0.5 rounded shrink-0">
              <span className="text-xs font-semibold text-blue-700">Score: {trendingScore.toFixed(1)}</span>
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

  return (
    <Card className="p-4 md:p-6 hover:shadow-md transition-shadow border-0 border-b border-gray-100 rounded-none">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-3 md:space-y-0">
        {/* Mobile: Top row with rank, movement, and trending score */}
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center space-x-3">
            {showRank && <div className="text-2xl font-bold text-gray-900">{restaurant.rank}</div>}
            <div className={`flex items-center ${movementColor}`}>
              <MovementIcon className="h-4 w-4" />
              {restaurant.movementAmount > 0 && <span className="text-sm ml-1">+{restaurant.movementAmount}</span>}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="text-blue-600 font-medium text-sm">Score: {trendingScore.toFixed(1)}</div>
          </div>
        </div>

        {/* Desktop: Left section with rank and movement */}
        <div className="hidden md:flex items-start space-x-3">
          {showRank && <div className="text-3xl font-bold text-gray-900 w-8">{restaurant.rank}</div>}
          <div className={`flex items-center mt-1 ${movementColor}`}>
            <MovementIcon className="h-4 w-4" />
            {restaurant.movementAmount > 0 && <span className="text-sm ml-1">+{restaurant.movementAmount}</span>}
          </div>
        </div>

        {/* Restaurant Details - responsive spacing */}
        <div className="flex-1 md:mx-8">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">{restaurant.name}</h3>
          <div className="flex items-center space-x-3 md:space-x-4 mb-1 md:mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium text-gray-900">
                {restaurant.rating} ({restaurant.reviewCount})
              </span>
            </div>
            <span className="text-sm text-gray-600">₹₹</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">📍</span>
            <span className="truncate md:truncate-none">{restaurant.address}</span>
          </div>
        </div>

        {/* Desktop: Right section with trending score and action buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <div className="text-blue-600 font-medium">Trending Score: {trendingScore.toFixed(1)}</div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Updated restaurant link with search context and tab parameter */}
            <Link href={`/restaurant/${restaurant.id}?from=search&tab=${currentTab}`}>
              <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
                <Eye className="h-3 w-3" />
                <span className="text-xs">View</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 bg-transparent"
              onClick={(e) => {
                e.preventDefault()
                window.open(directionsUrl, "_blank")
              }}
            >
              <Navigation className="h-3 w-3" />
              <span className="text-xs">Directions</span>
            </Button>
          </div>
        </div>

        {/* Mobile: Action buttons row */}
        <div className="flex items-center justify-end space-x-2 md:hidden">
          {/* Updated restaurant link with search context and tab parameter */}
          <Link href={`/restaurant/${restaurant.id}?from=search&tab=${currentTab}`}>
            <Button variant="outline" size="sm" className="flex items-center space-x-1 bg-transparent">
              <Eye className="h-3 w-3" />
              <span className="text-xs">View</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-1 bg-transparent"
            onClick={(e) => {
              e.preventDefault()
              window.open(directionsUrl, "_blank")
            }}
          >
            <Navigation className="h-3 w-3" />
            <span className="text-xs">Directions</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
