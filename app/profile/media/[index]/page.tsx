"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { Star, Heart, MessageCircle, Share2, Bookmark, MapPin } from "lucide-react"

// Mock data - in real app this would come from API/database
const mockMediaItems = [
  // Review media items
  {
    id: "1",
    src: "/ghee-roast-dosa.png",
    type: "image",
    contentType: "review",
    reviewId: 1,
    likes: 45,
    comments: 12,
    placeName: "Murugan Idli Shop",
    rating: 5,
    location: "T. Nagar, Chennai",
    costForTwo: "₹300 for two",
    itemName: "Ghee Roast Dosa",
    media: ["/ghee-roast-dosa.png", "/filter-coffee.png", "/idli-sambar-plate.png"],
  },
  {
    id: "2",
    src: "/filter-coffee.png",
    type: "image",
    contentType: "review",
    reviewId: 1,
    likes: 32,
    comments: 8,
    placeName: "Murugan Idli Shop",
    rating: 5,
    location: "T. Nagar, Chennai",
    costForTwo: "₹300 for two",
    itemName: "Filter Coffee",
    media: ["/filter-coffee.png"],
  },
  {
    id: "3",
    src: "/south-indian-thali.png",
    type: "image",
    contentType: "review",
    reviewId: 2,
    likes: 67,
    comments: 15,
    placeName: "Adyar Ananda Bhavan",
    rating: 4,
    location: "Adyar, Chennai",
    costForTwo: "₹400 for two",
    itemName: "South Indian Thali",
    media: ["/south-indian-thali.png", "/traditional-biryani-restaurant.png"],
  },
  {
    id: "4",
    src: "/chettinad-chicken.png",
    type: "image",
    contentType: "review",
    reviewId: 3,
    likes: 89,
    comments: 23,
    placeName: "Dakshin Restaurant",
    rating: 4,
    location: "ITC Grand Chola, Chennai",
    costForTwo: "₹800 for two",
    itemName: "Chettinad Chicken",
    media: ["/chettinad-chicken.png"],
  },
  {
    id: "5",
    src: "/appam-stew.png",
    type: "image",
    contentType: "review",
    reviewId: 3,
    likes: 78,
    comments: 19,
    placeName: "Dakshin Restaurant",
    rating: 4,
    location: "ITC Grand Chola, Chennai",
    costForTwo: "₹800 for two",
    itemName: "Appam with Stew",
    media: ["/appam-stew.png"],
  },
  {
    id: "6",
    src: "/payasam.png",
    type: "image",
    contentType: "review",
    reviewId: 3,
    likes: 92,
    comments: 27,
    placeName: "Dakshin Restaurant",
    rating: 4,
    location: "ITC Grand Chola, Chennai",
    costForTwo: "₹800 for two",
    itemName: "Traditional Payasam",
    media: ["/payasam.png"],
  },
  // Trail media items
  {
    id: "7",
    src: "/south-indian-thali.png",
    type: "image",
    contentType: "trail",
    trailId: 1,
    likes: 156,
    comments: 34,
    trailName: "Best South Indian Trail",
    trailRating: 4.8,
    trailReviews: 1250,
    location: "T. Nagar to Mylapore, Chennai",
    stops: 7,
    distance: "2.5 km",
    duration: "3 hours",
    media: ["/south-indian-thali.png", "/chettinad-spicy-food.png", "/traditional-biryani-restaurant.png"],
    placeLocations: [
      { placeName: "Adyar Ananda Bhavan", location: "T. Nagar, Chennai" },
      { placeName: "Chettinad Palace", location: "Mylapore, Chennai" },
      { placeName: "Saravana Bhavan", location: "Luz Corner, Chennai" },
    ],
  },
  {
    id: "8",
    src: "/chennai-street-food.png",
    type: "image",
    contentType: "trail",
    trailId: 2,
    likes: 134,
    comments: 41,
    trailName: "Chennai Street Food Adventure",
    trailRating: 4.6,
    trailReviews: 890,
    location: "Marina Beach to Besant Nagar, Chennai",
    stops: 5,
    distance: "4.2 km",
    duration: "2.5 hours",
    media: ["/chennai-street-food.png", "/modern-coffee-shop.png"],
    placeLocations: [
      { placeName: "Marina Beach Food Stalls", location: "Marina Beach, Chennai" },
      { placeName: "Cafe Coffee Day", location: "Besant Nagar, Chennai" },
    ],
  },
  // Regular media posts
  {
    id: "9",
    src: "/traditional-south-indian-kitchen.png",
    type: "image",
    contentType: "post",
    likes: 78,
    comments: 19,
    media: ["/traditional-south-indian-kitchen.png"],
  },
]

const mockProfileUser = {
  id: 1,
  name: "Arjun Menon",
  username: "foodie_chennai",
  avatar: "/indian-man-profile.png",
}

export default function MediaViewerPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentMediaGroup, setCurrentMediaGroup] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const mediaIndex = Number.parseInt(params.index as string)
  const userId = searchParams.get("userId")
  const fromParam = searchParams.get("from")

  console.log("[v0] MediaViewer - mediaIndex:", mediaIndex, "userId:", userId, "fromParam:", fromParam)
  console.log("[v0] MediaViewer - mockMediaItems length:", mockMediaItems.length)
  console.log("[v0] MediaViewer - selectedMediaItem:", mockMediaItems[mediaIndex])

  const getCurrentMediaViewerUrl = () => {
    const currentUrl = `/profile/media/${mediaIndex}`
    const params = new URLSearchParams()
    if (userId) params.set("userId", userId)
    if (fromParam) params.set("from", fromParam)
    return params.toString() ? `${currentUrl}?${params.toString()}` : currentUrl
  }

  const handlePlaceClick = (placeName: string, placeId?: number) => {
    // Navigate to restaurant page - using placeId if available, otherwise default to 1
    const id = placeId || 1
    const currentMediaUrl = encodeURIComponent(getCurrentMediaViewerUrl())
    router.push(`/restaurant/${id}?from=${currentMediaUrl}`)
  }

  const handleItemClick = (itemName: string) => {
    // Navigate to search page with item query
    const encodedQuery = encodeURIComponent(itemName)
    const currentMediaUrl = encodeURIComponent(getCurrentMediaViewerUrl())
    router.push(`/search?q=${encodedQuery}&type=item&from=${currentMediaUrl}`)
  }

  const handleLocationClick = (location: string) => {
    // Navigate to search page with location query
    const encodedLocation = encodeURIComponent(location)
    const currentMediaUrl = encodeURIComponent(getCurrentMediaViewerUrl())
    router.push(`/search?q=${encodedLocation}&type=location&from=${currentMediaUrl}`)
  }

  const handleViewFullTrail = (trailId: number) => {
    const currentMediaUrl = encodeURIComponent(getCurrentMediaViewerUrl())
    router.push(`/trail/${trailId}?from=${currentMediaUrl}`)
  }

  const handleViewFullReview = (reviewId: number) => {
    const currentMediaUrl = encodeURIComponent(getCurrentMediaViewerUrl())
    router.push(`/profile/review/${reviewId}?from=${currentMediaUrl}`)
  }

  useEffect(() => {
    console.log("[v0] MediaViewer useEffect - mediaIndex:", mediaIndex)

    // Load media data based on index
    const selectedMediaItem = mockMediaItems[mediaIndex]
    console.log("[v0] MediaViewer - selectedMediaItem in useEffect:", selectedMediaItem)

    if (selectedMediaItem) {
      let mediaGroup = []

      if (selectedMediaItem.contentType === "review" && selectedMediaItem.media) {
        console.log("[v0] MediaViewer - Processing review media")
        mediaGroup = selectedMediaItem.media.map((src, idx) => ({
          id: `review-${selectedMediaItem.reviewId}-${idx}`,
          src,
          type: "image",
          contentType: "review",
          reviewId: selectedMediaItem.reviewId,
          itemName: idx === 0 ? selectedMediaItem.itemName : `Item ${idx + 1}`,
          likes: selectedMediaItem.likes + Math.floor(Math.random() * 20),
          comments: selectedMediaItem.comments + Math.floor(Math.random() * 10),
          placeName: selectedMediaItem.placeName,
          rating: selectedMediaItem.rating,
          location: selectedMediaItem.location,
          costForTwo: selectedMediaItem.costForTwo,
        }))
      } else if (selectedMediaItem.contentType === "trail" && selectedMediaItem.media) {
        console.log("[v0] MediaViewer - Processing trail media")
        mediaGroup = selectedMediaItem.media.map((src, idx) => ({
          id: `trail-${selectedMediaItem.trailId}-${idx}`,
          src,
          type: "image",
          contentType: "trail",
          trailId: selectedMediaItem.trailId,
          trailName: selectedMediaItem.trailName,
          trailRating: selectedMediaItem.trailRating,
          trailReviews: selectedMediaItem.trailReviews,
          likes: selectedMediaItem.likes + Math.floor(Math.random() * 20),
          comments: selectedMediaItem.comments + Math.floor(Math.random() * 10),
          location: selectedMediaItem.location,
          stops: selectedMediaItem.stops,
          distance: selectedMediaItem.distance,
          duration: selectedMediaItem.duration,
          placeName: selectedMediaItem.placeLocations?.[idx]?.placeName,
          placeLocation: selectedMediaItem.placeLocations?.[idx]?.location,
        }))
      } else {
        console.log("[v0] MediaViewer - Processing single media item")
        mediaGroup = [
          {
            ...selectedMediaItem,
            likes: selectedMediaItem.likes + Math.floor(Math.random() * 20),
            comments: selectedMediaItem.comments + Math.floor(Math.random() * 10),
          },
        ]
      }

      console.log("[v0] MediaViewer - Final mediaGroup:", mediaGroup)
      setCurrentMediaGroup(mediaGroup)
      setLoading(false)
    } else {
      console.log("[v0] MediaViewer - No selectedMediaItem found, setting loading to false")
      setLoading(false)
    }
  }, [mediaIndex])

  const handleClose = () => {
    if (userId) {
      const backUrl = fromParam
        ? `/profile/user/${userId}?from=${encodeURIComponent(fromParam)}`
        : `/profile/user/${userId}`
      router.push(backUrl)
    } else {
      const backUrl = fromParam ? `/profile?from=${encodeURIComponent(fromParam)}` : "/profile"
      router.push(backUrl)
    }
  }

  const navigateWithinGroup = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev < currentMediaGroup.length - 1 ? prev + 1 : 0))
    } else {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : currentMediaGroup.length - 1))
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!currentMediaGroup.length) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white">Media not found</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center space-x-3">
          <img
            src={mockProfileUser.avatar || "/placeholder.svg"}
            alt={mockProfileUser.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-semibold text-sm">{mockProfileUser.name}</div>
            {currentMediaGroup[currentImageIndex]?.placeName && (
              <div className="text-xs text-gray-300">{currentMediaGroup[currentImageIndex].placeName}</div>
            )}
          </div>
        </div>
        <button onClick={handleClose} className="text-white hover:text-gray-300 p-2">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Media Area */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Current Media */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={currentMediaGroup[currentImageIndex]?.src || "/placeholder.svg"}
            alt={`Media ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          {/* Horizontal Navigation within group */}
          {currentMediaGroup.length > 1 && (
            <>
              <button
                onClick={() => navigateWithinGroup("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateWithinGroup("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Position Dots */}
          {currentMediaGroup.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {currentMediaGroup.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white scale-125" : "bg-white bg-opacity-40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Info Panel */}
      <div className="bg-black bg-opacity-80 text-white p-4 space-y-3">
        {/* Review Details */}
        {currentMediaGroup[currentImageIndex]?.contentType === "review" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handlePlaceClick(currentMediaGroup[currentImageIndex]?.placeName)}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (currentMediaGroup[currentImageIndex]?.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{currentMediaGroup[currentImageIndex]?.placeName}</span>
              </button>
              <button
                onClick={() => handleViewFullReview(currentMediaGroup[currentImageIndex]?.reviewId)}
                className="text-orange-400 text-sm hover:text-orange-300"
              >
                View Review
              </button>
            </div>

            {currentMediaGroup[currentImageIndex]?.itemName && (
              <button
                onClick={() => handleItemClick(currentMediaGroup[currentImageIndex].itemName)}
                className="text-sm text-gray-300 hover:text-white transition-colors text-left"
              >
                {currentMediaGroup[currentImageIndex].itemName}
              </button>
            )}

            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <button
                onClick={() => handleLocationClick(currentMediaGroup[currentImageIndex]?.location)}
                className="hover:text-white transition-colors"
              >
                {currentMediaGroup[currentImageIndex]?.location}
              </button>
              <span>•</span>
              <span>{currentMediaGroup[currentImageIndex]?.costForTwo}</span>
            </div>
          </div>
        )}

        {/* Trail Details */}
        {currentMediaGroup[currentImageIndex]?.contentType === "trail" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium">{currentMediaGroup[currentImageIndex]?.trailName}</span>
              </div>
              <button
                onClick={() => handleViewFullTrail(currentMediaGroup[currentImageIndex]?.trailId)}
                className="text-green-400 text-sm hover:text-green-300"
              >
                View Trail
              </button>
            </div>

            {currentMediaGroup[currentImageIndex]?.placeName && (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(currentMediaGroup[currentImageIndex]?.trailRating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-300 ml-1">
                    {currentMediaGroup[currentImageIndex]?.trailRating} (
                    {currentMediaGroup[currentImageIndex]?.trailReviews})
                  </span>
                </div>
                <span className="text-sm text-white font-medium">
                  {currentMediaGroup[currentImageIndex]?.placeName}
                </span>
              </div>
            )}

            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <button
                onClick={() =>
                  handleLocationClick(
                    currentMediaGroup[currentImageIndex]?.placeLocation ||
                      currentMediaGroup[currentImageIndex]?.location,
                  )
                }
                className="hover:text-white transition-colors"
              >
                {currentMediaGroup[currentImageIndex]?.placeLocation || currentMediaGroup[currentImageIndex]?.location}
              </button>
              {currentMediaGroup[currentImageIndex]?.stops && (
                <>
                  <span>•</span>
                  <span>{currentMediaGroup[currentImageIndex]?.stops} stops</span>
                </>
              )}
              {currentMediaGroup[currentImageIndex]?.distance && (
                <>
                  <span>•</span>
                  <span>{currentMediaGroup[currentImageIndex]?.distance}</span>
                </>
              )}
              {currentMediaGroup[currentImageIndex]?.duration && (
                <>
                  <span>•</span>
                  <span>{currentMediaGroup[currentImageIndex]?.duration}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Post Details */}
        {currentMediaGroup[currentImageIndex]?.contentType === "post" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="/placeholder.svg" alt="Post" className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium">Post</span>
              </div>
            </div>
          </div>
        )}

        {/* Social Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm">{currentMediaGroup[currentImageIndex]?.likes || 0}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{currentMediaGroup[currentImageIndex]?.comments || 0}</span>
            </button>
            <button className="hover:text-green-400 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          <button className="hover:text-yellow-400 transition-colors">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
