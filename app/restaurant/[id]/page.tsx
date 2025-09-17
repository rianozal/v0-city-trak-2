"use client"

import type React from "react"

import { notFound, useRouter, useSearchParams } from "next/navigation"
import { Star, MapPin, Phone, Clock, Share, ArrowLeft, Heart, ChevronLeft, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import { dummyRestaurants, dummyReviews } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"

interface RestaurantPageProps {
  params: { id: string }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromParam = searchParams.get("from")
  const tabParam = searchParams.get("tab")

  const restaurant = dummyRestaurants.find((r) => r.id === params.id)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  if (!restaurant) {
    notFound()
  }

  const restaurantReviews = dummyReviews.filter((r) => r.restaurantId === restaurant.id)
  const mediaImages = restaurant.mediaGallery?.images || [restaurant.image]

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => (prev + 1) % mediaImages.length)
    }
    if (isRightSwipe) {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : mediaImages.length - 1))
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreenOpen) return

      if (e.key === "Escape") {
        setIsFullscreenOpen(false)
      } else if (e.key === "ArrowLeft") {
        setFullscreenImageIndex((prev) => (prev > 0 ? prev - 1 : mediaImages.length - 1))
      } else if (e.key === "ArrowRight") {
        setFullscreenImageIndex((prev) => (prev + 1) % mediaImages.length)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreenOpen, mediaImages.length])

  const openFullscreen = (index: number) => {
    setFullscreenImageIndex(index)
    setIsFullscreenOpen(true)
  }

  const handleBackClick = () => {
    console.log("[v0] Restaurant back button clicked, from:", fromParam, "tab:", tabParam)

    if (fromParam?.startsWith("/profile/media/")) {
      // Navigate back to the specific media viewer page
      router.push(fromParam)
    } else if (fromParam === "saved") {
      router.push("/profile?from=saved")
    } else if (fromParam === "search" && tabParam) {
      router.push(`/search?tab=${tabParam}`)
    } else if (fromParam === "search") {
      router.push("/search")
    } else {
      // Default to home page
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Mobile Header - Floating */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white border-0"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/20 backdrop-blur-sm hover:bg-black/50 text-white border-0"
            >
              <Share className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-black/20 backdrop-blur-sm hover:bg-black/50 text-white border-0"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Image Gallery - Full Screen Swipeable */}
        <div className="relative h-screen">
          <div
            className="relative h-full overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex h-full transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {mediaImages.map((image, index) => (
                <div key={index} className="w-full h-full flex-shrink-0">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${restaurant.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {mediaImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : mediaImages.length - 1))}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/50 transition-colors"
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % mediaImages.length)}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-6 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {mediaImages.length}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="relative -mt-8 bg-white rounded-t-3xl z-10 pb-20">
          <div className="p-6 space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
              <p className="text-gray-600 mt-1">{restaurant.subcategory}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{restaurant.rating}</span>
                <span className="ml-1 text-gray-500 text-sm">({restaurant.reviewCount})</span>
              </div>
              <Badge className="bg-orange-500 text-white">
                #{restaurant.rank} in {restaurant.subcategory}
              </Badge>
            </div>

            {/* Mobile Tabs */}
            <Tabs defaultValue="about" className="mt-6">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                <TabsTrigger
                  value="about"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
                >
                  About
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500"
                >
                  Reviews ({restaurantReviews.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4 space-y-4">
                <div>
                  <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm">{restaurant.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm">{restaurant.phone}</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Reviews</h3>
                  <Link href={`/restaurant/${params.id}/add-review`}>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Write Review
                    </Button>
                  </Link>
                </div>

                {restaurantReviews.map((review) => (
                  <Card key={review.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={review.userAvatar || "/placeholder.svg"}
                        alt={review.userName}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{review.userName}</h4>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{review.text}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Mobile Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{restaurant.rating}</span>
                <span className="ml-1 text-gray-500 text-sm">({restaurant.reviewCount})</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Trending Score: {restaurant.trendingScore}</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" className="px-3 bg-transparent">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600 px-6">
                Directions
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Desktop Header */}
        <div className="flex items-center justify-between p-6 bg-white">
          <Button variant="ghost" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{restaurant.name}</h1>

          <div className="grid grid-cols-2 gap-2 h-[500px] rounded-xl overflow-hidden mb-8">
            {/* Main large image */}
            <div
              className="relative cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openFullscreen(0)}
            >
              <img
                src={mediaImages[0] || "/placeholder.svg"}
                alt={`${restaurant.name} - Main`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Grid of smaller images */}
            <div className="grid grid-cols-2 gap-2">
              {mediaImages.slice(1, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openFullscreen(index + 1)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${restaurant.name} - ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && mediaImages.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-black hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          openFullscreen(0)
                        }}
                      >
                        Show all {mediaImages.length} photos
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Content */}
          <div className="grid grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="col-span-2 space-y-6">
              <div>
                <p className="text-gray-600 text-lg">{restaurant.subcategory}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold text-lg">{restaurant.rating}</span>
                  <span className="ml-1 text-gray-500">({restaurant.reviewCount} reviews)</span>
                  <Badge className="ml-4 bg-orange-500 text-white">
                    #{restaurant.rank} in {restaurant.subcategory}
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{restaurant.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <span>{restaurant.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <span>{restaurant.hours}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-xl">Reviews ({restaurantReviews.length})</h3>
                  <Link href={`/restaurant/${params.id}/add-review`}>
                    <Button className="bg-orange-500 hover:bg-orange-600">Write Review</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {restaurantReviews.map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.userAvatar || "/placeholder.svg"}
                          alt={review.userName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{review.userName}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-gray-600">{review.text}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - Booking Widget */}
            <div className="col-span-1">
              <Card className="p-6 sticky top-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold text-lg">{restaurant.rating}</span>
                    </div>
                    <span className="text-gray-500">{restaurant.reviewCount} Reviews</span>
                  </div>

                  <div className="text-center py-4">
                    <div className="text-2xl font-bold text-gray-900">Trending Score</div>
                    <div className="text-3xl font-bold text-orange-500">{restaurant.trendingScore}</div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 h-12">
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" className="w-full h-12 bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>

                  {restaurant.isClaimed && (
                    <Badge variant="secondary" className="w-full justify-center bg-blue-50 text-blue-700 py-2">
                      Verified Business
                    </Badge>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {isFullscreenOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setIsFullscreenOpen(false)}
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation arrows */}
          {mediaImages.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                onClick={() => setFullscreenImageIndex((prev) => (prev > 0 ? prev - 1 : mediaImages.length - 1))}
              >
                <ChevronLeft className="h-12 w-12" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10"
                onClick={() => setFullscreenImageIndex((prev) => (prev + 1) % mediaImages.length)}
              >
                <ChevronRight className="h-12 w-12" />
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
            {fullscreenImageIndex + 1} / {mediaImages.length}
          </div>

          {/* Main image */}
          <img
            src={mediaImages[fullscreenImageIndex] || "/placeholder.svg"}
            alt={`${restaurant.name} - Image ${fullscreenImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}
