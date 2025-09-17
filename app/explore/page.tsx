"use client"

import { useState } from "react"
import { CategoryCarousel } from "@/components/home/category-carousel"
import { TrendingDropdown } from "@/components/home/trending-dropdown"
import { PlaceCardHorizontal } from "@/components/search/place-card-horizontal"
import { getRestaurantsByCity, categoryStructure } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useCity } from "@/components/city-context"
import Link from "next/link"

export default function ExplorePage() {
  const { selectedCity } = useCity() // Get selected city from context
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [selectedTimeframe, setSelectedTimeframe] = useState("week")
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const filteredRestaurants = (() => {
    const cityKey = `${selectedCity.name}, ${selectedCity.country}`
    let filtered = getRestaurantsByCity(cityKey)

    // Filter by specific item first (most specific)
    if (selectedItem) {
      filtered = filtered.filter((restaurant) => restaurant.specificItems.includes(selectedItem))
    }
    // Then filter by category if no specific item is selected
    else if (selectedCategory !== "All") {
      filtered = filtered.filter((restaurant) => restaurant.category === selectedCategory)
    }

    return filtered
  })()

  const getDisplayTitle = () => {
    if (selectedItem) {
      const currentCategory = categoryStructure.find((cat) => cat.name === selectedCategory)
      const item = currentCategory?.specificItems.find((item) => item.id === selectedItem)
      return `Top Places for ${item?.name || "Selected Item"}`
    }
    return selectedCategory === "All" ? "Top Places" : `Top ${selectedCategory}`
  }

  const getButtonContextText = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768

    if (isMobile) {
      return ""
    }

    let context = selectedCategory !== "All" ? selectedCategory : "Restaurants"

    if (selectedSubcategory && selectedSubcategory !== "All") {
      context += ` - ${selectedSubcategory}`
    }

    if (selectedItem) {
      const currentCategory = categoryStructure.find((cat) => cat.name === selectedCategory)
      const item = currentCategory?.specificItems.find((item) => item.id === selectedItem)
      context += ` for ${item?.name || selectedItem}`
    }

    return ` to ${context}`
  }

  return (
    <div className="w-full px-2 py-4 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Discover {selectedCity.name}'s Best</h1>
        <p className="text-gray-600">Real-time rankings powered by the community</p>
      </div>

      {/* Category Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 hidden sm:inline">Trending:</span>
            <TrendingDropdown selectedTimeframe={selectedTimeframe} onTimeframeChange={setSelectedTimeframe} />
          </div>
        </div>
        <div className="px-2">
          <CategoryCarousel
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            onSubcategoryChange={setSelectedSubcategory}
            selectedItem={selectedItem}
            onItemChange={setSelectedItem}
          />
        </div>
      </div>

      {/* Restaurant Chart */}
      <div className="space-y-4">
        <div className="px-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{getDisplayTitle()}</h2>
              <span className="text-sm text-gray-500 md:hidden">{filteredRestaurants.length} places</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 hidden md:block">{filteredRestaurants.length} places</span>
              <Link href="/add">
                <Button
                  variant="outline"
                  className="border-dashed border-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 bg-transparent whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="md:hidden">Add a new place</span>
                  <span className="hidden md:inline">Add a new place{getButtonContextText()}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-2 px-2">
          <div className="space-y-3">
            {filteredRestaurants.map((restaurant) => (
              <PlaceCardHorizontal
                key={restaurant.id}
                place={{
                  ...restaurant,
                  trendingScore: Math.max(100 - restaurant.rank * 2 + (restaurant.movementAmount || 0), 50),
                  movement: restaurant.movement,
                  movementAmount: restaurant.movementAmount,
                }}
                rank={restaurant.rank}
                currentTab="places"
                showRanking={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Phase 2 Placeholder */}
      <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200 mx-2">
        <h3 className="font-semibold text-orange-800 mb-2">Coming Soon in Phase 2</h3>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Advanced filters (New & Rising, Consistent Winners)</li>
          <li>• Map view integration</li>
          <li>• "On The Way" route-based discovery</li>
          <li>• AI-powered conversational search</li>
        </ul>
      </div>
    </div>
  )
}
