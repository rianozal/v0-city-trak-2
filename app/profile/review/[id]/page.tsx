"use client"

import { useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Star, MapPin, ArrowLeft, MessageCircle, Share2, Camera, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CommentsSection from "@/components/comments-section"
import LikesSection from "@/components/likes-section"

export default function FullReviewPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLiked, setIsLiked] = useState(false)
  const [showMediaViewer, setShowMediaViewer] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Priya Kumar",
      username: "@chennaifoodie",
      avatar: "/indian-food-blogger.png",
      comment: "Totally agree! Their sambar is the best in the city. Have you tried their rava dosa?",
      time: "2 hours ago",
      likes: 3,
      replies: [
        {
          id: 11,
          user: "Arjun Menon",
          username: "@foodie_chennai",
          avatar: "/placeholder.svg",
          comment: "Yes! The rava dosa is amazing too. Will add it to my next review.",
          time: "1 hour ago",
          likes: 1,
        },
      ],
    },
    {
      id: 2,
      user: "Raj Patel",
      username: "@foodie_raj",
      avatar: "/placeholder.svg",
      comment: "Thanks for the detailed review! Will definitely visit this weekend.",
      time: "5 hours ago",
      likes: 1,
      replies: [],
    },
  ])

  const review = {
    id: 1,
    placeName: "Murugan Idli Shop",
    placeCategory: "South Indian",
    location: "T. Nagar, Chennai",
    visitDate: "15 Jan 2024",
    costForTwo: "₹300",
    overallRating: 5,
    subcategoryReviews: [
      {
        name: "Traditional Breakfast",
        rating: 5,
        comment: "Authentic South Indian breakfast experience with traditional recipes and preparation methods.",
        images: ["/traditional-south-indian-kitchen.png", "/idli-sambar.png"],
      },
      {
        name: "Vegetarian Options",
        rating: 4,
        comment: "Great variety of vegetarian dishes with fresh ingredients and traditional flavors.",
        images: ["/south-indian-thali.png"],
      },
    ],
    itemReviews: [
      {
        name: "Ghee Roast Dosa",
        rating: 5,
        image: "/ghee-roast-dosa.png",
        comment:
          "Perfectly crispy with amazing ghee flavor. The ghee was aromatic and the dosa had the perfect golden color. The potato filling was well-spiced and the accompaniments were fresh.",
      },
      {
        name: "Filter Coffee",
        rating: 4,
        image: "/filter-coffee.png",
        comment:
          "Authentic South Indian coffee with the right balance of milk and decoction. Served in traditional steel tumbler which enhanced the experience.",
      },
      {
        name: "Idli Sambar",
        rating: 5,
        image: "/south-indian-thali.png",
        comment:
          "Soft, fluffy idlis with flavorful sambar. The coconut chutney was fresh and complemented the dish perfectly. The sambar had the right consistency and spice level.",
      },
    ],
    text: "Best idli and sambar in Chennai! The coconut chutney is absolutely divine. Been coming here for years and the quality never disappoints. The ambiance is traditional and the service is quick. Highly recommend for authentic South Indian breakfast. The place maintains its authentic taste and the staff is courteous. Perfect for family dining and the prices are very reasonable for the quality offered.",
    media: [
      "/ghee-roast-dosa.png",
      "/filter-coffee.png",
      "/south-indian-thali.png",
      "/idli-sambar.png",
      "/coconut-chutney.png",
      "/traditional-south-indian-kitchen.png",
    ],
    helpfulVotes: 23,
    replies: 5,
    likedBy: [
      { name: "Priya Kumar", username: "@chennaifoodie", avatar: "/indian-food-blogger.png" },
      { name: "Lisa Chen", username: "@foodieadventures", avatar: "/placeholder.svg" },
      { name: "Raj Patel", username: "@foodie_raj", avatar: "/placeholder.svg" },
      { name: "Sarah Johnson", username: "@sarahfoodie", avatar: "/placeholder.svg" },
      { name: "Mike Wilson", username: "@mikeeats", avatar: "/placeholder.svg" },
    ],
  }

  const openMediaViewer = (index: number) => {
    setCurrentMediaIndex(index)
    setShowMediaViewer(true)
  }

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev < review.media.length - 1 ? prev + 1 : 0))
  }

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : review.media.length - 1))
  }

  const handleAddComment = (comment: string) => {
    const newComment = {
      id: comments.length + 1,
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

  const handleBackClick = () => {
    const fromParam = searchParams.get("from")
    console.log("[v0] Review back button clicked, from:", fromParam)

    if (fromParam && fromParam.startsWith("/profile/media/")) {
      // Navigate back to the specific media viewer page
      router.push(fromParam)
    } else {
      // Default to profile page
      router.push("/profile")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3 hover:bg-gray-100 -ml-2">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-semibold text-gray-900">Review Details</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <Card className="overflow-hidden shadow-sm border-0">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-start space-x-3">
              <img
                src="/south-indian-restaurant.png"
                alt={review.placeName}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1">
                {/* Line 1: Restaurant name and date */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">{review.placeName}</h2>
                  <div className="text-sm text-gray-500 flex-shrink-0">{review.visitDate}</div>
                </div>

                {/* Line 2: Category badge */}
                <div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {review.placeCategory}
                  </span>
                </div>

                {/* Line 3: Location and price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{review.location}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900 flex-shrink-0">
                    {review.costForTwo} <span className="text-xs font-normal text-gray-500">for two</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="mb-3">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.overallRating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-base font-semibold text-gray-900">Overall Experience</span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">{review.text}</p>
            </div>

            {review.subcategoryReviews && review.subcategoryReviews.length > 0 && (
              <div className="mb-3">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Category Experience</h3>
                <div className="space-y-2">
                  {review.subcategoryReviews.map((subcategory, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{subcategory.name}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < subcategory.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-xs mb-2">{subcategory.comment}</p>
                      {subcategory.images && subcategory.images.length > 0 && (
                        <div className="flex space-x-1">
                          {subcategory.images.map((image, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={image || "/placeholder.svg"}
                              alt={`${subcategory.name} ${imgIndex + 1}`}
                              className="w-10 h-10 rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => {
                                const imageIndex = review.media.findIndex((media) => media === image)
                                if (imageIndex !== -1) openMediaViewer(imageIndex)
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Items Reviewed</h3>
              <div className="space-y-2">
                {review.itemReviews.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 bg-gray-50 rounded-lg">
                    {item.image ? (
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-10 h-10 rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                        onClick={() => {
                          const itemImageIndex = review.media.findIndex((media) => media === item.image)
                          if (itemImageIndex !== -1) openMediaViewer(itemImageIndex)
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <Camera className="h-4 w-4 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                        <div className="flex items-center ml-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < item.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-xs leading-relaxed">{item.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Photos & Videos</h3>
              <div className="grid grid-cols-3 gap-2">
                {review.media.slice(0, 6).map((media, index) => (
                  <div
                    key={index}
                    className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => openMediaViewer(index)}
                  >
                    <img
                      src={media || "/placeholder.svg"}
                      alt={`Review media ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    {index === 5 && review.media.length > 6 && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">+{review.media.length - 6}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-2">
              <div className="flex items-center space-x-6 mb-1">
                <LikesSection
                  initialLikeCount={review.helpfulVotes}
                  likedBy={review.likedBy}
                  isInitiallyLiked={isLiked}
                  onLikeToggle={setIsLiked}
                  contentType="review"
                  contentId={params.id as string}
                  currentPath={`/profile/review/${params.id}`}
                />
                <button
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-medium text-sm">Reply ({comments.length})</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span className="font-medium text-sm">Share</span>
                </button>
              </div>

              {showComments && (
                <div className="border-t border-gray-200 pt-4">
                  <CommentsSection
                    comments={comments}
                    onAddComment={handleAddComment}
                    onAddReply={handleAddReply}
                    onLikeComment={handleLikeComment}
                    placeholder="Add a comment..."
                    title="Comments"
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {showMediaViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowMediaViewer(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </button>

            <img
              src={review.media[currentMediaIndex] || "/placeholder.svg"}
              alt={`Media ${currentMediaIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {review.media.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-3"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-3"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
              {currentMediaIndex + 1} of {review.media.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
