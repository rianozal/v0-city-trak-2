"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, MapPin, MessageCircle, Route, Square } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ItemCard } from "@/components/search/item-card"
import { ItemCardHorizontal } from "@/components/search/item-card-horizontal"
import { PlaceCardHorizontal } from "@/components/search/place-card-horizontal"
import { PeopleCardHorizontal } from "@/components/search/people-card-horizontal"
import { TrailCard } from "@/components/search/trail-card"
import { TrailCardHorizontal } from "@/components/search/trail-card-horizontal"
import { dummyRestaurants, dummyItemResults, dummyCreators, dummyTrails, getCreatorsByCity } from "@/lib/dummy-data"
import { useCity } from "@/components/city-context"
import { Card } from "@/components/ui/card"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredResults, setFilteredResults] = useState(dummyRestaurants)
  const [filteredItemResults, setFilteredItemResults] = useState(dummyItemResults)
  const [filteredCreators, setFilteredCreators] = useState(dummyCreators)
  const [filteredTrails, setFilteredTrails] = useState(dummyTrails)
  const [searchMethod, setSearchMethod] = useState("list")
  const [contentType, setContentType] = useState("all")

  const { selectedCity } = useCity()
  const searchParams = useSearchParams()
  const router = useRouter()

  const hasProcessedInitialQuery = useRef(false)

  const queryParam = searchParams.get("q")
  const tabParam = searchParams.get("tab")

  useEffect(() => {
    if (tabParam && ["all", "places", "items", "trails", "people"].includes(tabParam)) {
      setContentType(tabParam)
    }
  }, [tabParam])

  useEffect(() => {
    if (queryParam && !hasProcessedInitialQuery.current) {
      const decodedQuery = decodeURIComponent(queryParam)
      setSearchQuery(decodedQuery)

      if (decodedQuery.trim() === "") {
        setFilteredResults(dummyRestaurants)
        setFilteredItemResults(dummyItemResults)
        setFilteredCreators(getCreatorsByCity(selectedCity.name))
        setFilteredTrails(dummyTrails)
      } else {
        const filteredRestaurants = dummyRestaurants.filter(
          (restaurant) =>
            restaurant.name.toLowerCase().includes(decodedQuery.toLowerCase()) ||
            restaurant.subcategory.toLowerCase().includes(decodedQuery.toLowerCase()) ||
            restaurant.category.toLowerCase().includes(decodedQuery.toLowerCase()),
        )
        setFilteredResults(filteredRestaurants)

        const filteredItems = dummyItemResults.filter(
          (item) =>
            item.name.toLowerCase().includes(decodedQuery.toLowerCase()) ||
            item.place.name.toLowerCase().includes(decodedQuery.toLowerCase()),
        )
        setFilteredItemResults(filteredItems)

        const filteredCreatorResults = dummyCreators.filter(
          (creator) =>
            creator.name.toLowerCase().includes(decodedQuery.toLowerCase()) ||
            creator.username.toLowerCase().includes(decodedQuery.toLowerCase()) ||
            creator.bio.toLowerCase().includes(decodedQuery.toLowerCase()),
        )
        setFilteredCreators(filteredCreatorResults)

        const filteredTrailResults = dummyTrails.filter(
          (trail) =>
            trail.title.toLowerCase().includes(decodedQuery.toLowerCase()) ||
            trail.description.toLowerCase().includes(decodedQuery.toLowerCase()) ||
            trail.category.toLowerCase().includes(decodedQuery.toLowerCase()) ||
            trail.tags.some((tag) => tag.toLowerCase().includes(decodedQuery.toLowerCase())) ||
            trail.creator.name.toLowerCase().includes(decodedQuery.toLowerCase()),
        )
        setFilteredTrails(filteredTrailResults)
      }

      hasProcessedInitialQuery.current = true
    }
  }, [queryParam, selectedCity.name])

  const handleContentTypeChange = (type: string) => {
    setContentType(type)
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set("tab", type)
    router.replace(`/search?${newSearchParams.toString()}`, { scroll: false })

    if (type === "people") {
      setSearchMethod("list")
      if (searchQuery.trim() === "") {
        setFilteredCreators(getCreatorsByCity(selectedCity.name))
      }
    }
  }

  const availableSearchMethods = contentType === "people" ? ["list"] : ["list", "map", "route", "area"]

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">Search & Discover</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search for a dish, place, cuisine, or trail..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3 text-base border-gray-300"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button
            variant={searchMethod === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearchMethod("list")}
            className={`flex items-center gap-2 whitespace-nowrap ${
              searchMethod === "list" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white hover:bg-gray-50"
            }`}
          >
            <Search className="h-4 w-4" />
            List
          </Button>
          {availableSearchMethods.includes("map") && (
            <Button
              variant={searchMethod === "map" ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchMethod("map")}
              className={`flex items-center gap-2 whitespace-nowrap ${
                searchMethod === "map" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white hover:bg-gray-50"
              }`}
              disabled
            >
              <MapPin className="h-4 w-4" />
              Map
            </Button>
          )}
          {availableSearchMethods.includes("route") && (
            <Button
              variant={searchMethod === "route" ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchMethod("route")}
              className={`flex items-center gap-2 whitespace-nowrap ${
                searchMethod === "route" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white hover:bg-gray-50"
              }`}
              disabled
            >
              <Route className="h-4 w-4" />
              On The Way
            </Button>
          )}
          {availableSearchMethods.includes("area") && (
            <Button
              variant={searchMethod === "area" ? "default" : "outline"}
              size="sm"
              onClick={() => setSearchMethod("area")}
              className={`flex items-center gap-2 whitespace-nowrap ${
                searchMethod === "area" ? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white hover:bg-gray-50"
              }`}
              disabled
            >
              <Square className="h-4 w-4" />
              Draw Area
            </Button>
          )}
        </div>

        <Tabs value={contentType} onValueChange={handleContentTypeChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="places"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600"
            >
              Places
            </TabsTrigger>
            <TabsTrigger
              value="items"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600"
            >
              Items
            </TabsTrigger>
            <TabsTrigger
              value="trails"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600"
            >
              Trails
            </TabsTrigger>
            <TabsTrigger
              value="people"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600"
            >
              People
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {searchMethod === "list" && (
              <>
                {/* Places Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {searchQuery ? `Places for "${searchQuery}"` : "Popular Places"}
                    </h2>
                    <span className="text-sm text-gray-500">{filteredResults.length} places</span>
                  </div>

                  <div className="space-y-3 md:hidden">
                    {filteredResults.slice(0, 3).map((restaurant) => (
                      <PlaceCardHorizontal
                        key={restaurant.id}
                        place={{
                          ...restaurant,
                          trendingScore: Math.max(100 - restaurant.rank * 2 + (restaurant.movementAmount || 0), 50),
                        }}
                        rank={restaurant.rank}
                        currentTab={contentType}
                        showRanking={false}
                      />
                    ))}
                  </div>
                  <div className="hidden md:space-y-3 md:block">
                    {filteredResults.slice(0, 3).map((restaurant) => (
                      <PlaceCardHorizontal
                        key={restaurant.id}
                        place={{
                          ...restaurant,
                          trendingScore: Math.max(100 - restaurant.rank * 2 + (restaurant.movementAmount || 0), 50),
                        }}
                        rank={restaurant.rank}
                        currentTab={contentType}
                        showRanking={false}
                      />
                    ))}
                  </div>
                  {filteredResults.length > 3 && (
                    <div className="text-center">
                      <Button
                        variant="outline"
                        onClick={() => setContentType("places")}
                        className="text-orange-600 border-orange-200 hover:bg-orange-50"
                      >
                        View all {filteredResults.length} places
                      </Button>
                    </div>
                  )}
                </div>

                {/* Items Section */}
                {filteredItemResults.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {searchQuery ? `Items for "${searchQuery}"` : "Popular Items"}
                      </h2>
                      <span className="text-sm text-gray-500">{filteredItemResults.length} items</span>
                    </div>

                    <div className="space-y-3 md:hidden">
                      {filteredItemResults.slice(0, 3).map((item) => (
                        <ItemCardHorizontal key={item.id} item={item} currentTab={contentType} />
                      ))}
                    </div>
                    <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredItemResults.slice(0, 3).map((item) => (
                        <ItemCard key={item.id} item={item} currentTab={contentType} />
                      ))}
                    </div>
                    {filteredItemResults.length > 3 && (
                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={() => setContentType("items")}
                          className="text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          View all {filteredItemResults.length} items
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Trails Section */}
                {filteredTrails.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {searchQuery ? `Trails for "${searchQuery}"` : "Popular Trails"}
                      </h2>
                      <span className="text-sm text-gray-500">{filteredTrails.length} trails</span>
                    </div>

                    <div className="space-y-3 md:hidden">
                      {filteredTrails.slice(0, 3).map((trail) => (
                        <TrailCardHorizontal key={trail.id} trail={trail} currentTab={contentType} />
                      ))}
                    </div>
                    <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredTrails.slice(0, 3).map((trail) => (
                        <TrailCard key={trail.id} trail={trail} currentTab={contentType} />
                      ))}
                    </div>
                    {filteredTrails.length > 3 && (
                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={() => setContentType("trails")}
                          className="text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          View all {filteredTrails.length} trails
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* People Section */}
                {filteredCreators.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {searchQuery ? `Creators for "${searchQuery}"` : `Food Creators in ${selectedCity.name}`}
                      </h2>
                      <span className="text-sm text-gray-500">{filteredCreators.length} creators</span>
                    </div>

                    <div className="space-y-3">
                      {filteredCreators.slice(0, 3).map((creator) => (
                        <PeopleCardHorizontal key={creator.id} creator={creator} currentTab={contentType} />
                      ))}
                    </div>
                    {filteredCreators.length > 3 && (
                      <div className="text-center">
                        <Button
                          variant="outline"
                          onClick={() => setContentType("people")}
                          className="text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          View all {filteredCreators.length} creators
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* No results message */}
                {filteredResults.length === 0 &&
                  filteredItemResults.length === 0 &&
                  filteredTrails.length === 0 &&
                  filteredCreators.length === 0 && (
                    <Card className="p-8 text-center">
                      <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">No results found</h3>
                      <p className="text-gray-600">
                        {searchQuery
                          ? `No results match "${searchQuery}". Try a different search term.`
                          : "Try searching for a dish, place, cuisine, trail, or creator name."}
                      </p>
                    </Card>
                  )}
              </>
            )}
            {searchMethod === "map" && (
              <Card className="p-8 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Map View Coming Soon</h3>
                <p className="text-gray-600">Interactive map search will be available in Phase 2.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="places" className="space-y-4">
            {searchMethod === "list" && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {searchQuery ? `Places for "${searchQuery}"` : "Popular Places"}
                  </h2>
                  <span className="text-sm text-gray-500">{filteredResults.length} places</span>
                </div>

                <div className="space-y-3 md:hidden">
                  {filteredResults.map((restaurant) => (
                    <PlaceCardHorizontal
                      key={restaurant.id}
                      place={{
                        ...restaurant,
                        trendingScore: Math.max(100 - restaurant.rank * 2 + (restaurant.movementAmount || 0), 50),
                      }}
                      rank={restaurant.rank}
                      currentTab={contentType}
                      showRanking={false}
                    />
                  ))}
                </div>
                <div className="hidden md:space-y-3 md:block">
                  {filteredResults.map((restaurant) => (
                    <PlaceCardHorizontal
                      key={restaurant.id}
                      place={{
                        ...restaurant,
                        trendingScore: Math.max(100 - restaurant.rank * 2 + (restaurant.movementAmount || 0), 50),
                      }}
                      rank={restaurant.rank}
                      currentTab={contentType}
                      showRanking={false}
                    />
                  ))}
                </div>
              </>
            )}
            {searchMethod !== "list" && (
              <Card className="p-8 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Advanced Search Coming Soon</h3>
                <p className="text-gray-600">Map-based place search will be available in Phase 2.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            {searchMethod === "list" && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {searchQuery ? `Items for "${searchQuery}"` : "Popular Items"}
                  </h2>
                  <span className="text-sm text-gray-500">{filteredItemResults.length} items</span>
                </div>

                <div className="space-y-3 md:hidden">
                  {filteredItemResults.map((item) => (
                    <ItemCardHorizontal key={item.id} item={item} currentTab={contentType} />
                  ))}
                </div>
                <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredItemResults.map((item) => (
                    <ItemCard key={item.id} item={item} currentTab={contentType} />
                  ))}
                </div>
              </>
            )}
            {searchMethod !== "list" && (
              <Card className="p-8 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Advanced Item Search Coming Soon</h3>
                <p className="text-gray-600">Map-based item search will be available in Phase 2.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="trails" className="space-y-4">
            {searchMethod === "list" && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {searchQuery ? `Trails for "${searchQuery}"` : "Popular Trails"}
                  </h2>
                  <span className="text-sm text-gray-500">{filteredTrails.length} trails</span>
                </div>

                <div className="space-y-3 md:hidden">
                  {filteredTrails.map((trail) => (
                    <TrailCardHorizontal key={trail.id} trail={trail} currentTab={contentType} />
                  ))}
                </div>
                <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTrails.map((trail) => (
                    <TrailCard key={trail.id} trail={trail} currentTab={contentType} />
                  ))}
                </div>

                {filteredTrails.length === 0 && (
                  <Card className="p-8 text-center">
                    <Route className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">No trails found</h3>
                    <p className="text-gray-600">
                      {searchQuery
                        ? `No trails match "${searchQuery}". Try a different search term.`
                        : "No trails available. Check back later for new trails!"}
                    </p>
                  </Card>
                )}
              </>
            )}
            {searchMethod !== "list" && (
              <Card className="p-8 text-center">
                <Route className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Advanced Trail Search Coming Soon</h3>
                <p className="text-gray-600">Map-based trail search will be available in Phase 2.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="people" className="space-y-4">
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {searchQuery ? `Creators for "${searchQuery}"` : `Food Creators in ${selectedCity.name}`}
                </h2>
                <span className="text-sm text-gray-500">{filteredCreators.length} creators</span>
              </div>

              <div className="space-y-3">
                {filteredCreators.map((creator) => (
                  <PeopleCardHorizontal key={creator.id} creator={creator} currentTab={contentType} />
                ))}
              </div>

              {filteredCreators.length === 0 && (
                <Card className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">No creators found</h3>
                  <p className="text-gray-600">
                    {searchQuery
                      ? `No creators match "${searchQuery}". Try a different search term.`
                      : `No creators found in ${selectedCity.name}. Check back later for new creators!`}
                  </p>
                </Card>
              )}
            </>
          </TabsContent>
        </Tabs>
      </div>

      <div className="fixed bottom-20 right-4 md:bottom-4">
        <Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg" disabled>
          <MessageCircle className="h-5 w-5 mr-2" />
          AI Search
        </Button>
      </div>

      <Card className="p-4 bg-orange-50 border-orange-200">
        <h3 className="font-semibold text-orange-800 mb-2">Coming in Phase 2</h3>
        <ul className="text-sm text-orange-700 space-y-1">
          <li>• Interactive map with location-based search</li>
          <li>• "On The Way" route-based discovery</li>
          <li>• Draw custom search areas</li>
          <li>• AI-powered conversational search assistant</li>
          <li>• Item-specific search and trails</li>
          <li>• Creator and reviewer profiles</li>
        </ul>
      </Card>
    </div>
  )
}
