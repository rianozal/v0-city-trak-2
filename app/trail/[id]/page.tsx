"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Bookmark,
  Share2,
  Edit3,
  Map,
  List,
  Navigation,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  Camera,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import MediaViewer from "@/components/media-viewer"
import CommentsSection from "@/components/comments-section"
import LikesSection from "@/components/likes-section"

interface TrailStopImage {
  id: string
  url: string
  caption: string
  tags: string[] // subcategory or item tags
}

interface TrailStop {
  id: number
  name: string
  images: TrailStopImage[]
  rating: number
  reviewCount: number
  address: string
  creatorNote: string
  detailedInstructions: string
  completed: boolean
  category: string
  estimatedTime: string
}

interface Trail {
  id: string
  title: string
  creator: {
    id: string
    name: string
    username: string
    avatar: string
  }
  stats: {
    stops: number
    distance: string
    duration: string
  }
  mapImage: string
  stops: TrailStop[]
  isCreator: boolean
  savedCount: number
  likedBy: {
    name: string
    username: string
    avatar: string
  }[]
  rating: number
  reviewCount: number
}

const mockTrail: Trail = {
  id: "1",
  title: "A Food Trail in Chennai",
  creator: {
    id: "2",
    name: "Priya Kumar",
    username: "chennaifoodie",
    avatar: "/indian-woman-profile.png",
  },
  stats: {
    stops: 7,
    distance: "2.5 km",
    duration: "3 hours",
  },
  mapImage: "/chennai-food-trail-map.png",
  stops: [
    {
      id: 1,
      name: "Murugan Idli Shop",
      images: [
        {
          id: "1",
          url: "/traditional-biryani-restaurant.png",
          caption: "The iconic storefront of Murugan Idli Shop",
          tags: ["Restaurant", "Exterior"],
        },
        {
          id: "2",
          url: "/idli-sambar-plate.png",
          caption: "Fresh idlis with sambar and chutneys",
          tags: ["Idli", "South Indian", "Breakfast"],
        },
        {
          id: "3",
          url: "/modern-coffee-shop.png",
          caption: "The famous Rose Milk - a must-try!",
          tags: ["Rose Milk", "Beverages", "Signature Drink"],
        },
      ],
      rating: 4.8,
      reviewCount: 1250,
      address: "T. Nagar, Chennai",
      creatorNote: "Try the Rose Milk here! It's legendary and pairs perfectly with their soft idlis.",
      detailedInstructions:
        "Start your food trail at this iconic establishment. Upon arrival, find a seat (it can get crowded during peak hours). Order the classic idli-sambar combo - ask for extra coconut chutney as it's exceptional here. Most importantly, don't leave without trying their signature Rose Milk. It's a sweet, creamy drink that's been their specialty for decades. The combination of soft, fluffy idlis with the rich Rose Milk is what makes this stop essential. Spend about 30-45 minutes here to fully enjoy the experience.",
      completed: false,
      category: "South Indian",
      estimatedTime: "30-45 min",
    },
    {
      id: 2,
      name: "Sangeetha Veg Restaurant",
      images: [
        {
          id: "4",
          url: "/modern-coffee-shop.png",
          caption: "Sangeetha's welcoming interior",
          tags: ["Restaurant", "Interior", "Ambiance"],
        },
        {
          id: "5",
          url: "/chettinad-spicy-food.png",
          caption: "Crispy masala dosa with accompaniments",
          tags: ["Masala Dosa", "South Indian", "Crispy"],
        },
        {
          id: "6",
          url: "/traditional-biryani-restaurant.png",
          caption: "Authentic filter coffee served in traditional style",
          tags: ["Filter Coffee", "Traditional", "Beverages"],
        },
      ],
      rating: 4.5,
      reviewCount: 890,
      address: "Anna Nagar, Chennai",
      creatorNote: "Their filter coffee is the best in the city. Don't miss the masala dosa!",
      detailedInstructions:
        "This is your second stop for authentic South Indian flavors. Sangeetha is known for its consistent quality and traditional preparation methods. Order their signature masala dosa - it's perfectly crispy and comes with a generous potato filling. Pair it with their filter coffee, which is brewed using traditional methods and served in the classic steel tumbler and davara set. The coffee here has the perfect balance of chicory and coffee beans. Take your time to savor the meal and observe the traditional cooking methods through their open kitchen concept.",
      completed: false,
      category: "Vegetarian",
      estimatedTime: "45-60 min",
    },
    {
      id: 3,
      name: "Saravana Bhavan",
      images: [
        {
          id: "7",
          url: "/chettinad-spicy-food.png",
          caption: "Saravana Bhavan's grand dining hall",
          tags: ["Restaurant", "Interior", "Traditional"],
        },
        {
          id: "8",
          url: "/idli-sambar-plate.png",
          caption: "Traditional South Indian thali",
          tags: ["Thali", "Complete Meal", "Traditional"],
        },
        {
          id: "9",
          url: "/modern-coffee-shop.png",
          caption: "Fresh coconut chutney - their specialty",
          tags: ["Coconut Chutney", "Condiments", "Fresh"],
        },
      ],
      rating: 4.6,
      reviewCount: 2100,
      address: "Express Avenue Mall",
      creatorNote: "Perfect for authentic South Indian breakfast. The coconut chutney is divine!",
      detailedInstructions:
        "Your final major stop brings you to the renowned Saravana Bhavan chain. This location in Express Avenue Mall offers a more upscale dining experience while maintaining authentic flavors. Order their South Indian thali to experience a variety of dishes in one meal. Pay special attention to their coconut chutney - it's freshly ground and has the perfect texture and flavor balance. If you're still hungry, try their rava kesari for dessert. The mall location also offers great views and a comfortable dining environment to reflect on your food trail journey.",
      completed: false,
      category: "South Indian",
      estimatedTime: "40-50 min",
    },
  ],
  isCreator: false,
  savedCount: 1250,
  likedBy: [
    { name: "Arjun Menon", username: "@foodie_chennai", avatar: "/indian-man-profile.png" },
    { name: "Kavya Sharma", username: "@kavya_foodie", avatar: "/indian-woman-profile.png" },
    { name: "Raj Patel", username: "@foodie_raj", avatar: "/placeholder.svg" },
    { name: "Sarah Johnson", username: "@sarahfoodie", avatar: "/placeholder.svg" },
    { name: "Mike Wilson", username: "@mikeeats", avatar: "/placeholder.svg" },
  ],
  rating: 4.8,
  reviewCount: 1250,
}

export default function TrailDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromParam = searchParams.get("from")
  const tabParam = searchParams.get("tab")

  const [trail, setTrail] = useState<Trail>(mockTrail)
  const [activeView, setActiveView] = useState<"list" | "map">("list")
  const [isNavigationMode, setIsNavigationMode] = useState(false)
  const [currentStopIndex, setCurrentStopIndex] = useState(0)
  const [expandedStops, setExpandedStops] = useState<Set<number>>(new Set())
  const [mediaViewer, setMediaViewer] = useState<{
    isOpen: boolean
    images: any[]
    currentIndex: number
  }>({ isOpen: false, images: [], currentIndex: 0 })

  const [isTrailCompleted, setIsTrailCompleted] = useState(false)
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false)

  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewData, setReviewData] = useState({
    overallRating: 0,
    reviewText: "",
    photos: [] as File[],
    stopRatings: {} as { [key: number]: { rating: number; notes: string } },
    difficulty: 0,
    groupSize: 2,
    totalTime: "",
    timeValue: "",
    timeUnit: "hours" as "hours" | "days",
  })

  const [comments, setComments] = useState([
    {
      id: "1",
      userId: 2, // Added userId field mapping to Arjun Menon's profile
      user: "Arjun Menon",
      username: "@foodie_chennai",
      avatar: "/indian-man-profile.png",
      comment: "Amazing trail! Completed it last weekend and every stop was incredible.",
      time: "2 days ago",
      likes: 5,
      replies: [],
    },
    {
      id: "2",
      userId: 6, // Added userId field mapping to Kavya Sharma's profile
      user: "Kavya Sharma",
      username: "@kavya_foodie",
      avatar: "/indian-woman-profile.png",
      comment: "The Rose Milk at Murugan Idli Shop was indeed legendary! Thanks for the tip.",
      time: "1 week ago",
      likes: 3,
      replies: [
        {
          id: "21",
          userId: 7, // Added userId field mapping to Priya Kumar's profile
          user: "Priya Kumar",
          username: "@chennaifoodie",
          avatar: "/indian-woman-profile.png",
          comment: "So glad you enjoyed it! That's exactly why I included it in the trail.",
          time: "6 days ago",
          likes: 2,
        },
      ],
    },
  ])

  const [trailLikes, setTrailLikes] = useState(trail.savedCount)
  const [isLiked, setIsLiked] = useState(false)

  const handleBackClick = () => {
    console.log("[v0] Trail back button clicked - fromParam:", fromParam)
    if (fromParam) {
      if (fromParam.startsWith("/profile/media/")) {
        console.log("[v0] Navigating to media viewer:", fromParam)
        router.push(fromParam)
      } else if (fromParam === "saved") {
        console.log("[v0] Navigating to profile with saved context")
        router.push("/profile?from=saved")
      } else if (fromParam === "/search") {
        const searchUrl = tabParam ? `/search?tab=${tabParam}` : "/search"
        console.log("[v0] Navigating back to search page with tab:", tabParam)
        router.push(searchUrl)
      } else if (fromParam.startsWith("/profile")) {
        // Parse the existing URL to extract base path and existing parameters
        const [basePath, queryString] = fromParam.split("?")
        const params = new URLSearchParams(queryString || "")

        // Set the from parameter to indicate coming from trail
        params.set("from", "trail")

        // Construct the final URL
        const finalUrl = `${basePath}?${params.toString()}`
        console.log("[v0] Navigating to profile with trail context - originalUrl:", fromParam, "finalUrl:", finalUrl)
        router.push(finalUrl)
      } else {
        console.log("[v0] Navigating to other context:", fromParam)
        router.push(fromParam)
      }
    } else {
      console.log("[v0] No fromParam, navigating to home")
      router.push("/")
    }
  }

  const handleStartTrail = () => {
    setIsNavigationMode(true)
    setCurrentStopIndex(0)
  }

  const handleMarkCompleted = (stopIndex: number) => {
    const updatedStops = [...trail.stops]
    updatedStops[stopIndex].completed = true
    setTrail({ ...trail, stops: updatedStops })

    const allCompleted = updatedStops.every((stop) => stop.completed)
    if (allCompleted && !isTrailCompleted) {
      setIsTrailCompleted(true)
      setShowCompletionAnimation(true)
      // Hide animation after 3 seconds
      setTimeout(() => setShowCompletionAnimation(false), 3000)
    }

    if (isNavigationMode && stopIndex === currentStopIndex) {
      const nextIncompleteIndex = updatedStops.findIndex((stop, index) => index > stopIndex && !stop.completed)
      if (nextIncompleteIndex !== -1) {
        setCurrentStopIndex(nextIncompleteIndex)
      } else {
        setIsNavigationMode(false)
      }
    }
  }

  const handleDirections = (stop: TrailStop) => {
    const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.name + " " + stop.address)}`
    window.open(directionsUrl, "_blank")
  }

  const toggleStopExpansion = (stopId: number) => {
    const newExpanded = new Set(expandedStops)
    if (newExpanded.has(stopId)) {
      newExpanded.delete(stopId)
    } else {
      newExpanded.add(stopId)
    }
    setExpandedStops(newExpanded)
  }

  const openImageViewer = (images: TrailStopImage[], startIndex = 0) => {
    const mediaItems = images.map((image) => ({
      id: image.id,
      src: image.url,
      type: "image" as const,
      contentType: "trail" as const,
      tag: image.tags.join(", "),
      trailName: trail.title,
      itemName: image.tags[0], // Use first tag as item name
      likes: Math.floor(Math.random() * 50) + 10,
      comments: Math.floor(Math.random() * 20) + 5,
    }))
    setMediaViewer({ isOpen: true, images: mediaItems, currentIndex: startIndex })
  }

  const closeImageViewer = () => {
    setMediaViewer({ isOpen: false, images: [], currentIndex: 0 })
  }

  const currentStop = isNavigationMode ? trail.stops[currentStopIndex] : null

  const handleAddComment = (comment: string) => {
    const newComment = {
      id: Date.now().toString(),
      userId: 1, // Added userId field for current user
      user: "You",
      username: "@foodie_chennai",
      avatar: "/placeholder.svg",
      comment,
      time: "Just now",
      likes: 0,
      replies: [],
    }
    setComments([newComment, ...comments])
  }

  const handleAddReply = (commentId: string | number, reply: string) => {
    const newReply = {
      id: Date.now(),
      userId: 1, // Added userId field for current user
      user: "You",
      username: "@foodie_chennai",
      avatar: "/placeholder.svg",
      comment: reply,
      time: "Just now",
      likes: 0,
    }

    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [...comment.replies, newReply] } : comment,
      ),
    )
  }

  const handleLikeComment = (commentId: string | number) => {
    setComments(
      comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  const handleTrailLikeToggle = (isLiked: boolean) => {
    setTrailLikes((prev) => (isLiked ? prev + 1 : prev - 1))
    setIsLiked(isLiked)
  }

  const renderStarRating = (rating: number, onRate: (rating: number) => void, size: "sm" | "lg" = "lg") => {
    const starSize = size === "lg" ? "h-8 w-8" : "h-5 w-5"
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => onRate(star)} className="transition-colors">
            <Star className={`${starSize} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setReviewData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }))
  }

  const handleSubmitReview = () => {
    // Here you would typically submit to your backend
    console.log("Submitting trail review:", reviewData)
    setShowReviewModal(false)
    // Reset form
    setReviewData({
      overallRating: 0,
      reviewText: "",
      photos: [],
      stopRatings: {},
      difficulty: 0,
      groupSize: 2,
      totalTime: "",
      timeValue: "",
      timeUnit: "hours" as "hours" | "days",
    })
  }

  const handleRatingClick = () => {
    const url = fromParam ? `/trail/${params.id}/reviews?from=${fromParam}` : `/trail/${params.id}/reviews`
    router.push(url)
  }

  const renderReviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 pb-4 rounded-t-lg z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Review This Trail</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowReviewModal(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pt-4">
          <div className="space-y-6">
            {/* Overall Rating */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-3">How was your overall experience?</h3>
              <div className="flex justify-center mb-4">
                {renderStarRating(reviewData.overallRating, (rating) =>
                  setReviewData((prev) => ({ ...prev, overallRating: rating })),
                )}
              </div>
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Share your experience</label>
              <Textarea
                placeholder="Tell others about your trail experience..."
                value={reviewData.reviewText}
                onChange={(e) => setReviewData((prev) => ({ ...prev, reviewText: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>

            {/* Difficulty Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">How difficult was this trail?</label>
              <div className="flex justify-center">
                {renderStarRating(reviewData.difficulty, (rating) =>
                  setReviewData((prev) => ({ ...prev, difficulty: rating })),
                )}
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">1 = Very Easy, 5 = Very Difficult</p>
            </div>

            {/* Stop Ratings */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Rate Individual Stops</h3>
              <div className="space-y-3">
                {trail.stops.map((stop, index) => (
                  <div key={stop.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{stop.name}</h4>
                      <div className="flex">
                        {renderStarRating(
                          reviewData.stopRatings[stop.id]?.rating || 0,
                          (rating) =>
                            setReviewData((prev) => ({
                              ...prev,
                              stopRatings: {
                                ...prev.stopRatings,
                                [stop.id]: { ...prev.stopRatings[stop.id], rating },
                              },
                            })),
                          "sm",
                        )}
                      </div>
                    </div>
                    <Textarea
                      placeholder="Notes about this stop..."
                      value={reviewData.stopRatings[stop.id]?.notes || ""}
                      onChange={(e) =>
                        setReviewData((prev) => ({
                          ...prev,
                          stopRatings: {
                            ...prev.stopRatings,
                            [stop.id]: { ...prev.stopRatings[stop.id], notes: e.target.value },
                          },
                        }))
                      }
                      className="text-sm"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Group Size</label>
                <Input
                  type="number"
                  min="1"
                  value={reviewData.groupSize}
                  onChange={(e) =>
                    setReviewData((prev) => ({ ...prev, groupSize: Number.parseInt(e.target.value) || 1 }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Total Time Taken</label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    step="0.5"
                    min="0"
                    placeholder="0"
                    value={reviewData.timeValue}
                    onChange={(e) => setReviewData((prev) => ({ ...prev, timeValue: e.target.value }))}
                    className="flex-1"
                  />
                  <select
                    value={reviewData.timeUnit}
                    onChange={(e) =>
                      setReviewData((prev) => ({ ...prev, timeUnit: e.target.value as "hours" | "days" }))
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Add Photos</label>
              <label className="block">
                <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <span>
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photos ({reviewData.photos.length})
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 pt-4 rounded-b-lg">
          <div className="flex space-x-3">
            <Button
              onClick={handleSubmitReview}
              disabled={reviewData.overallRating === 0}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Submit Review
            </Button>
            <Button variant="outline" onClick={() => setShowReviewModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3 hover:bg-gray-100 -ml-2">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 truncate">Trail</h1>
          <div className="w-16" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${trail.mapImage})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">{trail.title}</h1>
            <Link
              href={`/profile/user/${trail.creator.id}?from=${encodeURIComponent(window.location.pathname)}`}
              className="flex items-center mb-3 hover:opacity-80"
            >
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={trail.creator.avatar || "/placeholder.svg"} />
                <AvatarFallback>{trail.creator.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">by @{trail.creator.username}</span>
            </Link>
            <div className="flex items-center text-sm space-x-4">
              <button onClick={handleRatingClick} className="flex items-center hover:text-orange-600 transition-colors">
                <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                {trail.rating} ({trail.reviewCount})
              </button>

              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {trail.stats.stops} Stops
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {trail.stats.distance}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Approx. {trail.stats.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between space-x-3">
            <Button onClick={handleStartTrail} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
              Start Trail
            </Button>
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => setShowReviewModal(true)}>
              Review
            </Button>
            {trail.isCreator && (
              <Button variant="outline" size="icon">
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white border-b border-gray-200 p-4">
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "list" | "map")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list" className="flex items-center">
              <List className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center">
              <Map className="h-4 w-4 mr-2" />
              Map View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeView === "list" ? (
          <div className="space-y-4">
            {trail.stops.map((stop, index) => {
              const isExpanded = expandedStops.has(stop.id)
              return (
                <Card key={stop.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                            stop.completed ? "bg-green-500" : "bg-orange-500"
                          }`}
                        >
                          {stop.completed ? <Check className="h-4 w-4" /> : index + 1}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{stop.name}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <div className="flex items-center mr-3">
                                <span className="text-yellow-400 mr-1">★</span>
                                {stop.rating} ({stop.reviewCount})
                              </div>
                              <Badge variant="secondary" className="text-xs mr-2">
                                {stop.category}
                              </Badge>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {stop.estimatedTime}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{stop.address}</p>
                          </div>

                          <img
                            src={stop.images[0]?.url || "/placeholder.svg"}
                            alt={stop.name}
                            className="w-16 h-16 rounded-lg object-cover ml-4 cursor-pointer hover:opacity-80"
                            onClick={() => openImageViewer(stop.images, 0)}
                          />
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mb-3">
                          <p className="text-sm text-gray-700 italic">"{stop.creatorNote}"</p>
                        </div>

                        <div className="mb-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStopExpansion(stop.id)}
                            className="p-0 h-auto text-orange-600 hover:text-orange-700"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Hide Details
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Show Detailed Instructions
                              </>
                            )}
                          </Button>
                        </div>

                        {isExpanded && (
                          <div className="space-y-4 mb-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-2">What to do here:</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{stop.detailedInstructions}</p>
                            </div>

                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Gallery ({stop.images.length} photos)</h4>
                              <div className="grid grid-cols-3 gap-2">
                                {stop.images.map((image, imageIndex) => (
                                  <div key={image.id} className="relative group">
                                    <img
                                      src={image.url || "/placeholder.svg"}
                                      alt={image.caption}
                                      className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                      onClick={() => openImageViewer(stop.images, imageIndex)}
                                    />
                                    <div className="absolute bottom-1 left-1 right-1">
                                      <div className="flex flex-wrap gap-1">
                                        {image.tags.slice(0, 2).map((tag) => (
                                          <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="text-xs px-1 py-0 bg-black bg-opacity-60 text-white"
                                          >
                                            {tag}
                                          </Badge>
                                        ))}
                                        {image.tags.length > 2 && (
                                          <Badge
                                            variant="secondary"
                                            className="text-xs px-1 py-0 bg-black bg-opacity-60 text-white"
                                          >
                                            +{image.tags.length - 2}
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDirections(stop)}
                            className="flex items-center"
                          >
                            <Navigation className="h-4 w-4 mr-2" />
                            Directions
                          </Button>

                          {!stop.completed && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMarkCompleted(index)}
                              className="flex items-center text-green-600 border-green-600 hover:bg-green-50"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Mark as Completed
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Map className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive map view coming soon</p>
                  <p className="text-sm">Will show all stops with route lines</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Social Proof & Comments */}
        <Card className="p-4 mt-8">
          <div className="mb-6">
            <LikesSection
              likesCount={trail.likedBy.length}
              likedBy={trail.likedBy}
              isLiked={isLiked}
              onToggleLike={handleTrailLikeToggle}
              contentType="trail"
              contentId={params.id}
              currentPath={`/trail/${params.id}`}
            />
          </div>

          {trail.isCreator && (
            <div className="mb-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Trail Insights</h3>

              {/* Main Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                  <div className="text-2xl font-bold text-green-600">1,247</div>
                  <div className="text-sm text-green-700">Completed</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">4.8</div>
                  <div className="text-sm text-blue-700">Avg Rating</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">3.2h</div>
                  <div className="text-sm text-orange-700">Avg Time</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">2.8</div>
                  <div className="text-sm text-purple-700">Difficulty</div>
                </div>
              </div>

              {/* Completion Rate Progress */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                  <span className="text-sm text-gray-600">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">1,247 out of 1,598 people completed this trail</p>
              </div>

              {/* Recent Completions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Recent Completions</h4>
                <div className="space-y-2">
                  {[
                    {
                      name: "Sarah Chen",
                      username: "@sarahfoodie",
                      avatar: "/placeholder.svg",
                      time: "2 hours ago",
                      rating: 5,
                    },
                    {
                      name: "Mike Patel",
                      username: "@mikeeats",
                      avatar: "/placeholder.svg",
                      time: "5 hours ago",
                      rating: 4,
                    },
                    {
                      name: "Lisa Wong",
                      username: "@foodielisa",
                      avatar: "/placeholder.svg",
                      time: "1 day ago",
                      rating: 5,
                    },
                  ].map((completion, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={completion.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{completion.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{completion.name}</p>
                          <p className="text-xs text-gray-500">{completion.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < completion.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3 text-orange-600 hover:text-orange-700">
                  View All Completions
                </Button>
              </div>

              {/* Monthly Completion Trend */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Monthly Completions</h4>
                <div className="flex items-end space-x-2 h-20">
                  {[45, 62, 38, 71, 89, 67, 94].map((height, index) => (
                    <div key={index} className="flex-1 bg-orange-200 rounded-t" style={{ height: `${height}%` }}>
                      <div className="w-full bg-orange-500 rounded-t" style={{ height: "60%" }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
            </div>
          )}

          <CommentsSection
            comments={comments}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onLikeComment={handleLikeComment}
            placeholder="Share your experience with this trail..."
            title="Comments"
            currentPath={window.location.pathname}
          />
        </Card>
      </div>

      {/* Navigation Mode Banner */}
      {isNavigationMode && currentStop && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Next Stop:</p>
              <p className="font-semibold text-gray-900">{currentStop.name}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={() => handleDirections(currentStop)}>
                <Navigation className="h-4 w-4 mr-2" />
                Directions
              </Button>
              <Button
                size="sm"
                onClick={() => handleMarkCompleted(currentStopIndex)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Completed
              </Button>
            </div>
          </div>
        </div>
      )}

      {showCompletionAnimation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 mx-4 text-center max-w-sm w-full relative overflow-hidden">
            {/* Confetti Animation */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-orange-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
              {[...Array(15)].map((_, i) => (
                <div
                  key={`confetti-${i}`}
                  className="absolute w-1 h-4 bg-green-400 rounded-full animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                    animationDelay: `${Math.random() * 1.5}s`,
                    animationDuration: `${0.8 + Math.random() * 0.4}s`,
                  }}
                />
              ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Trail Completed!</h2>
              <p className="text-gray-600 mb-4">Congratulations on finishing the entire trail!</p>

              <div className="bg-orange-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-2 text-orange-600 mb-2">
                  <Check className="h-6 w-6" />
                  <span className="font-semibold">All {trail.stats.stops} stops completed</span>
                </div>
                <p className="text-sm text-gray-600">You've earned 50 TrakPoints!</p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => setShowCompletionAnimation(false)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Share Your Achievement
                </Button>
                <Button variant="outline" onClick={() => setShowCompletionAnimation(false)} className="w-full">
                  Continue Exploring
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {mediaViewer.isOpen && (
        <MediaViewer
          mediaItems={mediaViewer.images}
          currentIndex={mediaViewer.currentIndex}
          onClose={closeImageViewer}
          userInfo={{
            name: trail.creator.name,
            username: trail.creator.username,
            avatar: trail.creator.avatar,
          }}
        />
      )}

      {showReviewModal && renderReviewModal()}
    </div>
  )
}
