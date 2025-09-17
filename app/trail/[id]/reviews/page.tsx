"use client"

import { useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import { ArrowLeft, Star, Heart, MessageCircle, Share2, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrailReviewsPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const trailId = params.id as string
  const fromParam = searchParams.get("from")

  const [sortBy, setSortBy] = useState("relevant")

  // Mock trail data
  const trail = {
    id: trailId,
    name: "A Food Trail in Chennai",
    rating: 4.8,
    reviewCount: 1250,
  }

  // Mock reviews data - reusing the same structure as profile reviews
  const trailReviews = [
    {
      id: 1,
      userId: "2",
      userName: "Priya Kumar",
      userAvatar: "/indian-food-blogger.png",
      username: "chennaifoodie",
      rating: 5,
      text: "Amazing trail! Completed it last weekend and every stop was incredible. The Rose Milk at Murugan Idli Shop was indeed legendary. Perfect for authentic South Indian breakfast experience.",
      reviewDate: "2024-01-15",
      timeTaken: "3.5 hours",
      difficulty: 2,
      helpfulVotes: 89,
      media: ["/ghee-roast-dosa.png", "/filter-coffee.png", "/south-indian-thali.png"],
      stopReviews: [
        {
          stopName: "Murugan Idli Shop",
          rating: 5,
          comment: "Best idli and sambar in Chennai!",
          image: "/south-indian-restaurant.png",
        },
        {
          stopName: "Saravana Bhavan",
          rating: 4,
          comment: "Great variety of South Indian dishes",
          image: "/traditional-south-indian-kitchen.png",
        },
      ],
    },
    {
      id: 2,
      userId: "3",
      userName: "Kavya Sharma",
      userAvatar: "/placeholder.svg",
      username: "kavya_foodie",
      rating: 4,
      text: "Great trail for food lovers! Some places were crowded but totally worth the wait. The coconut chutney at Express Avenue Mall was divine. Would recommend doing this on a weekday.",
      reviewDate: "2024-01-10",
      timeTaken: "4 hours",
      difficulty: 3,
      helpfulVotes: 67,
      media: ["/coconut-chutney.png", "/masala-vada.png"],
      stopReviews: [
        {
          stopName: "Express Avenue Mall",
          rating: 4,
          comment: "Perfect for authentic South Indian breakfast",
          image: "/placeholder.svg",
        },
      ],
    },
    {
      id: 3,
      userId: "4",
      userName: "Arjun Menon",
      userAvatar: "/indian-man-profile.png",
      username: "foodie_chennai",
      rating: 5,
      text: "Phenomenal experience! Every stop was carefully curated and the variety was amazing. The trail creator really knows their South Indian cuisine. Took us about 4 hours but we enjoyed every minute.",
      reviewDate: "2024-01-08",
      timeTaken: "4 hours",
      difficulty: 2,
      helpfulVotes: 134,
      media: ["/chettinad-chicken.png", "/appam-stew.png", "/payasam.png", "/rasam.png"],
      stopReviews: [
        {
          stopName: "Dakshin Restaurant",
          rating: 5,
          comment: "Fine dining South Indian at its best",
          image: "/placeholder.svg",
        },
        {
          stopName: "Murugan Idli Shop",
          rating: 5,
          comment: "Legendary Rose Milk and soft idlis",
          image: "/south-indian-restaurant.png",
        },
      ],
    },
  ]

  const handleBackClick = () => {
    if (fromParam) {
      router.push(`/trail/${trailId}?from=${fromParam}`)
    } else {
      router.push(`/trail/${trailId}`)
    }
  }

  const handleViewFullReview = (reviewId: number) => {
    router.push(`/profile/review/${reviewId}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const sortedReviews = [...trailReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      default: // relevant
        return b.helpfulVotes - a.helpfulVotes
    }
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm -mx-4 -mt-6 mb-6">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3 hover:bg-gray-100 -ml-2">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">{trail.name}</h1>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                {trail.rating} • {trail.reviewCount} reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <Card className="p-4">
        <Tabs value={sortBy} onValueChange={setSortBy} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="relevant" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Most Relevant
            </TabsTrigger>
            <TabsTrigger value="newest" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Newest
            </TabsTrigger>
            <TabsTrigger value="highest" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Highest
            </TabsTrigger>
            <TabsTrigger value="lowest" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Lowest
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id} className="p-4 hover:shadow-md transition-shadow">
            {/* Review Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={review.userAvatar || "/placeholder.svg"}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{review.userName}</h4>
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <span>@{review.username}</span>
                    <span>•</span>
                    <span>{formatDate(review.reviewDate)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500">Completed in {review.timeTaken}</div>
              </div>
            </div>

            {/* Review Text */}
            <div className="mb-3">
              <p className="text-gray-700 text-sm line-clamp-3">{review.text}</p>
            </div>

            {/* Stop Reviews */}
            {review.stopReviews && review.stopReviews.length > 0 && (
              <div className="space-y-2 mb-3">
                {review.stopReviews.slice(0, 2).map((stop, stopIndex) => (
                  <div key={stopIndex} className="bg-gray-50 p-2 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <img
                        src={stop.image || "/placeholder.svg"}
                        alt={stop.stopName}
                        className="w-8 h-8 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 text-sm">{stop.stopName}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < stop.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{stop.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {review.stopReviews.length > 2 && (
                  <p className="text-xs text-orange-600">+{review.stopReviews.length - 2} more stops</p>
                )}
              </div>
            )}

            {/* Media */}
            {review.media && review.media.length > 0 && (
              <div className="flex space-x-2 mb-3 overflow-x-auto">
                {review.media.slice(0, 4).map((mediaUrl, mediaIndex) => (
                  <img
                    key={mediaIndex}
                    src={mediaUrl || "/placeholder.svg"}
                    alt={`Review media ${mediaIndex + 1}`}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                ))}
                {review.media.length > 4 && (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs text-gray-600">
                    +{review.media.length - 4}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-xs text-gray-600">
                <button className="flex items-center space-x-1 hover:text-orange-600 transition-colors">
                  <Heart className="h-3 w-3" />
                  <span>{review.helpfulVotes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-orange-600 transition-colors">
                  <MessageCircle className="h-3 w-3" />
                  <span>Reply</span>
                </button>
                <button className="hover:text-green-400 transition-colors">
                  <Share2 className="h-3 w-3" />
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-orange-600 hover:text-orange-700 text-xs"
                onClick={() => handleViewFullReview(review.id)}
              >
                View Full Review
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
