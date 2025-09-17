"use client"
import { categories, categoryStructure } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface CategoryCarouselProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedSubcategory: string | null
  onSubcategoryChange: (subcategory: string | null) => void
  selectedItem: string | null
  onItemChange: (item: string | null) => void
}

export function CategoryCarousel({
  selectedCategory,
  onCategoryChange,
  selectedSubcategory,
  onSubcategoryChange,
  selectedItem,
  onItemChange,
}: CategoryCarouselProps) {
  const [showAllSubcategories, setShowAllSubcategories] = useState(false)
  const [isExpandedView, setIsExpandedView] = useState(false)

  const currentCategory = categoryStructure.find((cat) => cat.name === selectedCategory)

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category)
    onSubcategoryChange("all")
    onItemChange(null)
    setShowAllSubcategories(false)
  }

  const handleSubcategoryClick = (subcategoryId: string) => {
    onSubcategoryChange(subcategoryId)
    onItemChange(null)
  }

  const handleItemClick = (itemId: string) => {
    if (selectedItem === itemId) {
      onItemChange(null)
    } else {
      onItemChange(itemId)
    }
  }

  const getInitialItemCount = () => {
    return 8 // Show 8 items initially (2 lines on desktop, 2 lines on mobile)
  }

  const handleToggleView = () => {
    setIsExpandedView(!isExpandedView)
    if (!isExpandedView) {
      setShowAllSubcategories(true)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(category)}
            className={cn(
              "whitespace-nowrap flex-shrink-0",
              selectedCategory === category
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "text-gray-600 hover:text-gray-900",
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      {selectedCategory !== "All" && currentCategory && (
        <div className="space-y-4">
          {/* Cuisine/Venue subcategories */}
          {currentCategory.subcategories.filter(
            (sub) =>
              sub.type === "cuisine" ||
              sub.type === "venue" ||
              sub.type === "activity" ||
              sub.type === "shopping" ||
              sub.type === "wellness" ||
              sub.type === "vibe",
          ).length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">
                  {selectedCategory === "Restaurants" ? "By Cuisine & Vibe" : "Venues & Types"}
                </h4>
                {currentCategory.subcategories.filter(
                  (sub) =>
                    sub.type === "cuisine" ||
                    sub.type === "venue" ||
                    sub.type === "activity" ||
                    sub.type === "shopping" ||
                    sub.type === "wellness" ||
                    sub.type === "vibe",
                ).length > getInitialItemCount() && (
                  <>
                    {/* Desktop Show More/Less */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllSubcategories(!showAllSubcategories)}
                      className="text-xs text-gray-500 hover:text-gray-700 p-1 h-auto hidden md:flex"
                    >
                      {showAllSubcategories ? (
                        <>
                          Show Less <ChevronUp className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          Show More <ChevronDown className="ml-1 h-3 w-3" />
                        </>
                      )}
                    </Button>

                    {/* Mobile See More/Less */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleToggleView}
                      className="text-xs text-gray-500 hover:text-gray-700 p-1 h-auto md:hidden"
                    >
                      {isExpandedView ? (
                        <>
                          See Less <ChevronUp className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          See More <ChevronDown className="ml-1 h-3 w-3" />
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>

              <div
                className={cn(
                  "gap-2 pb-2",
                  isExpandedView
                    ? "grid grid-cols-2 md:flex md:flex-wrap md:overflow-visible" // Expanded: grid on mobile, flex on desktop
                    : "flex overflow-x-auto scrollbar-hide md:flex-wrap md:overflow-visible", // Default: horizontal scroll on mobile, flex wrap on desktop
                )}
              >
                <Button
                  variant={selectedSubcategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSubcategoryClick("all")}
                  className={cn(
                    "whitespace-nowrap flex-shrink-0",
                    selectedSubcategory === "all"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  All
                </Button>

                {currentCategory.subcategories
                  .filter(
                    (sub) =>
                      sub.type === "cuisine" ||
                      sub.type === "venue" ||
                      sub.type === "activity" ||
                      sub.type === "shopping" ||
                      sub.type === "wellness" ||
                      sub.type === "vibe",
                  )
                  .slice(0, isExpandedView || showAllSubcategories ? undefined : getInitialItemCount())
                  .map((subcategory) => (
                    <Button
                      key={subcategory.id}
                      variant={selectedSubcategory === subcategory.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSubcategoryClick(subcategory.id)}
                      className={cn(
                        "whitespace-nowrap flex-shrink-0",
                        selectedSubcategory === subcategory.id
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "text-gray-600 hover:text-gray-900",
                      )}
                    >
                      {subcategory.name}
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  ))}
              </div>
            </div>
          )}

          {selectedSubcategory && selectedSubcategory !== "all" && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">🔥 Hot 100 - Specific Experiences</h4>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-visible">
                {currentCategory.specificItems
                  .filter((item) => {
                    const subcategory = currentCategory.subcategories.find((sub) => sub.id === selectedSubcategory)
                    return subcategory?.items?.includes(item.id)
                  })
                  .map((item) => (
                    <Button
                      key={item.id}
                      variant={selectedItem === item.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleItemClick(item.id)}
                      className={cn(
                        "whitespace-nowrap border-red-200 hover:border-red-300 hover:bg-red-50 flex-shrink-0",
                        selectedItem === item.id
                          ? "bg-red-500 hover:bg-red-600 text-white border-red-500"
                          : "text-gray-600 hover:text-gray-900 bg-transparent",
                      )}
                      title={item.description}
                    >
                      {item.name}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
