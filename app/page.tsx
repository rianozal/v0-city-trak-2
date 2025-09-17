"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  Star,
  Users,
  Clock,
  TrendingUp,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useCity } from "@/components/city-context"
import LikesSection from "@/components/likes-section"
import CommentsSection from "@/components/comments-section"
import { PeopleCardHorizontal } from "@/components/search/people-card-horizontal"
import { useRouter } from "next/navigation"

const mockPosts = [
  {
    id: 1,
    type: "new_place",
    user: {
      id: "1",
      name: "Priya Kumar",
      username: "@priya_foodie",
      avatar: "/indian-woman-profile.png",
    },
    timestamp: "2 hours ago",
    content: {
      text: "Just added this amazing new place to the community! They serve the most authentic Chettinad cuisine with perfect spice levels. The ambiance is traditional and the service is excellent.",
      place: "Chettinad Palace",
      location: "Adyar, Chennai",
      category: "South Indian",
      images: ["/chettinad-spicy-food.png", "/traditional-biryani-restaurant.png"],
      subcategories: [
        { image: "/chettinad-spicy-food.png", item: "Chettinad Chicken", category: "Main Course" },
        { image: "/traditional-biryani-restaurant.png", item: "Mutton Biryani", category: "Rice" },
      ],
    },
    stats: {
      likes: 45,
      comments: 12,
      shares: 7,
    },
  },
  {
    id: 2,
    type: "review",
    user: {
      id: "2",
      name: "Arjun Menon",
      username: "@foodie_chennai",
      avatar: "/indian-man-profile.png",
    },
    timestamp: "4 hours ago",
    content: {
      text: "Had the most incredible ghee roast dosa here! The perfect balance of crispy texture and rich flavors. The filter coffee was equally amazing - served in traditional steel tumblers.",
      place: "Murugan Idli Shop",
      location: "T. Nagar, Chennai",
      rating: 5,
      images: ["/ghee-roast-dosa.png", "/filter-coffee.png"],
      subcategories: [
        { image: "/ghee-roast-dosa.png", item: "Ghee Roast Dosa", category: "South Indian" },
        { image: "/filter-coffee.png", item: "Filter Coffee", category: "Beverages" },
      ],
    },
    stats: {
      likes: 89,
      comments: 23,
      shares: 12,
    },
  },
  {
    id: 3,
    type: "trail",
    user: {
      id: "3",
      name: "Kavya Sharma",
      username: "@kavya_foodie",
      avatar: "/indian-woman-profile.png",
    },
    timestamp: "6 hours ago",
    content: {
      text: "Created a new food trail covering the best South Indian breakfast spots in Chennai! Perfect for weekend food adventures with friends and family.",
      trail: "Best South Indian Breakfast Trail",
      stops: 7,
      distance: "2.5 km",
      duration: "3 hours",
      images: ["/south-indian-thali.png", "/idli-sambar-plate.png", "/chennai-street-food.png"],
    },
    stats: {
      likes: 156,
      comments: 34,
      shares: 28,
    },
  },
  {
    id: 4,
    type: "trail_experience",
    user: {
      id: "4",
      name: "Rajesh Patel",
      username: "@rajesh_eats",
      avatar: "/indian-man-profile.png",
    },
    timestamp: "8 hours ago",
    content: {
      text: "Just completed the 'Street Food Paradise' trail and it was absolutely incredible! Every stop was a flavor explosion. Highly recommend this trail to all food lovers.",
      trail: "Street Food Paradise Trail",
      rating: 5,
      experience: "Completed",
      images: ["/chennai-street-food.png", "/south-indian-thali.png"],
      highlights: ["Amazing variety", "Great value for money", "Perfect for groups"],
    },
    stats: {
      likes: 67,
      comments: 15,
      shares: 9,
    },
  },
  {
    id: 5,
    type: "trending_place",
    user: {
      id: "5",
      name: "City Trak",
      username: "@citytrak",
      avatar: "/ct-logo.jpg",
    },
    timestamp: "12 hours ago",
    content: {
      text: "🔥 Trending Now: Dakshin has moved to #1 in Fine Dining this week! Their authentic South Indian cuisine and elegant ambiance are winning hearts across Chennai.",
      place: "Dakshin",
      location: "Chettinad, Chennai",
      category: "Fine Dining",
      trending: {
        rank: 1,
        movement: "+2",
        category: "Fine Dining",
      },
      images: ["/modern-coffee-shop.png"],
    },
    stats: {
      likes: 234,
      comments: 45,
      shares: 67,
    },
  },
  {
    id: 6,
    type: "trending_review",
    user: {
      id: "6",
      name: "Food Critics Chennai",
      username: "@critics_chn",
      avatar: "/food-critic.png",
    },
    timestamp: "1 day ago",
    content: {
      text: "📈 This review is trending! An honest take on the new fusion restaurant that's got everyone talking. The innovative menu and presentation are truly remarkable.",
      place: "Fusion Delights",
      location: "Nungambakkam, Chennai",
      rating: 4,
      trending: {
        views: "2.5K",
        engagement: "High",
      },
      images: ["/modern-coffee-shop.png", "/traditional-biryani-restaurant.png"],
    },
    stats: {
      likes: 189,
      comments: 78,
      shares: 34,
    },
  },
]

const mockPeopleYouMayKnow = [
  {
    id: "7",
    name: "Sneha Reddy",
    username: "sneha_foodie",
    avatar: "/indian-woman-profile.png",
    bio: "Food blogger and chef",
    followers: 1200,
    reviewCount: 45,
    isFollowing: false,
    tasteAffinityScore: 85,
    recentPhotos: ["/ghee-roast-dosa.png", "/filter-coffee.png"],
  },
  {
    id: "8",
    name: "Vikram Kumar",
    username: "vikram_eats",
    avatar: "/indian-man-profile.png",
    bio: "Street food enthusiast",
    followers: 890,
    reviewCount: 67,
    isFollowing: false,
    tasteAffinityScore: 92,
    recentPhotos: ["/chennai-street-food.png", "/south-indian-thali.png"],
  },
  {
    id: "9",
    name: "Meera Iyer",
    username: "meera_tastes",
    avatar: "/indian-woman-profile.png",
    bio: "Traditional cuisine lover",
    followers: 2100,
    reviewCount: 123,
    isFollowing: false,
    tasteAffinityScore: 78,
    recentPhotos: ["/chettinad-spicy-food.png", "/idli-sambar-plate.png"],
  },
]

const mockComments = [
  {
    id: 1,
    userId: 10,
    user: "Ravi Kumar",
    username: "@ravi_foodie",
    avatar: "/indian-man-profile.png",
    comment: "This looks absolutely delicious! I need to try this place soon.",
    time: "2h",
    likes: 5,
    replies: [],
  },
  {
    id: 2,
    userId: 11,
    user: "Anita Sharma",
    username: "@anita_eats",
    avatar: "/indian-woman-profile.png",
    comment: "Great review! The photos are making me hungry 😋",
    time: "1h",
    likes: 3,
    replies: [
      {
        id: 1,
        userId: 2,
        user: "Arjun Menon",
        username: "@foodie_chennai",
        avatar: "/indian-man-profile.png",
        comment: "Thank you! You should definitely visit this place.",
        time: "45m",
        likes: 1,
      },
    ],
  },
]

export default function HomePage() {
  const { selectedCity } = useCity()
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set())
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
  const [selectedImage, setSelectedImage] = useState<{ postId: number; imageIndex: number } | null>(null)
  const router = useRouter()

  const handleSave = (postId: number) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleShare = (postId: number) => {
    // Implement share functionality
    console.log("[v0] Sharing post:", postId)
  }

  const handleUserClick = (userId: string) => {
    router.push(`/profile?userId=${userId}&from=home`)
  }

  const handlePlaceClick = (placeName: string) => {
    // Navigate to restaurant page - you can add proper ID mapping
    router.push(`/restaurant/1?from=home`)
  }

  const handleTrailClick = (trailName: string) => {
    // Navigate to trail page - you can add proper ID mapping
    router.push(`/trail/1?from=home`)
  }

  const toggleComments = (postId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleAddComment = (comment: string) => {
    console.log("[v0] Adding comment:", comment)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const renderPostContent = (post: any) => {
    switch (post.type) {
      case "new_place":
        return (
          <div className="bg-orange-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Plus className="w-4 h-4 text-orange-600" />
              <span className="font-medium text-gray-900">Added New Place</span>
            </div>
            <button
              onClick={() => handlePlaceClick(post.content.place)}
              className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              {post.content.place}
            </button>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm">{post.content.location}</p>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {post.content.category}
              </span>
            </div>
          </div>
        )

      case "review":
        return (
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handlePlaceClick(post.content.place)}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900">{post.content.place}</span>
              </button>
              <div className="flex items-center space-x-1">{renderStars(post.content.rating!)}</div>
            </div>
            <p className="text-gray-600 text-sm">{post.content.location}</p>
          </div>
        )

      case "trail":
        return (
          <div className="bg-green-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900">Created New Trail</span>
            </div>
            <button
              onClick={() => handleTrailClick(post.content.trail)}
              className="font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              {post.content.trail}
            </button>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{post.content.stops} stops</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{post.content.distance}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.content.duration}</span>
              </div>
            </div>
          </div>
        )

      case "trail_experience":
        return (
          <div className="bg-blue-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-900">Completed Trail</span>
              </div>
              <div className="flex items-center space-x-1">{renderStars(post.content.rating!)}</div>
            </div>
            <button
              onClick={() => handleTrailClick(post.content.trail)}
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {post.content.trail}
            </button>
            {post.content.highlights && (
              <div className="flex flex-wrap gap-1">
                {post.content.highlights.map((highlight: string, index: number) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </div>
        )

      case "trending_place":
        return (
          <div className="bg-red-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <span className="font-medium text-gray-900">Trending Place</span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                #{post.content.trending.rank} {post.content.trending.category}
              </span>
            </div>
            <button
              onClick={() => handlePlaceClick(post.content.place)}
              className="font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              {post.content.place}
            </button>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm">{post.content.location}</p>
              <span className="text-green-600 text-sm font-medium">{post.content.trending.movement}</span>
            </div>
          </div>
        )

      case "trending_review":
        return (
          <div className="bg-purple-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-gray-900">Trending Review</span>
              </div>
              <div className="flex items-center space-x-1">{renderStars(post.content.rating!)}</div>
            </div>
            <button
              onClick={() => handlePlaceClick(post.content.place)}
              className="font-semibold text-purple-600 hover:text-purple-700 transition-colors"
            >
              {post.content.place}
            </button>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-sm">{post.content.location}</p>
              <span className="text-purple-600 text-sm">{post.content.trending.views} views</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const openImageViewer = (postId: number, imageIndex: number) => {
    setSelectedImage({ postId, imageIndex })
  }

  const closeImageViewer = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return

    const post = mockPosts.find((p) => p.id === selectedImage.postId)
    if (!post?.content.images) return

    const currentIndex = selectedImage.imageIndex
    const totalImages = post.content.images.length

    let newIndex
    if (direction === "next") {
      newIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1
    }

    setSelectedImage({ postId: selectedImage.postId, imageIndex: newIndex })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 font-serif">What's Happening in {selectedCity.name}</h1>
        <p className="text-gray-600">Discover new places, trails, and reviews from the community</p>
      </div>

      {/* People You May Know Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">People You May Know</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-orange-500 hover:text-orange-600"
            onClick={() => router.push("/people-you-may-know")}
          >
            See All
          </Button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {mockPeopleYouMayKnow.map((person) => (
            <div key={person.id} className="flex-shrink-0 w-80">
              <PeopleCardHorizontal creator={person} currentTab="home" />
            </div>
          ))}
        </div>
      </div>

      {/* Social Feed */}
      <div className="space-y-6">
        {mockPosts.map((post) => (
          <Card
            key={post.id}
            className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 py-0"
          >
            <CardContent className="p-4 space-y-4">
              {/* User Header */}
              <div className="flex items-center space-x-3">
                <button onClick={() => handleUserClick(post.user.id)} className="hover:opacity-80 transition-opacity">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                    <AvatarFallback>
                      {post.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </button>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUserClick(post.user.id)}
                      className="font-semibold text-gray-900 hover:text-orange-500 transition-colors"
                    >
                      {post.user.name}
                    </button>
                    <span className="text-gray-500 text-sm">{post.user.username}</span>
                  </div>
                  <p className="text-gray-500 text-sm">{post.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="space-y-3">
                <p className="text-gray-800 leading-relaxed">{post.content.text}</p>

                {/* Post Type Specific Content */}
                {renderPostContent(post)}

                {/* Images with Subcategory Info */}
                {post.content.images && (
                  <div
                    className={`grid gap-2 ${post.content.images.length > 1 ? "grid-cols-2" : "grid-cols-1"} ${post.content.images.length > 2 ? "grid-rows-2" : ""}`}
                  >
                    {post.content.images.slice(0, 4).map((image: string, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                          onClick={() => openImageViewer(post.id, index)}
                        />

                        {/* More images indicator */}
                        {index === 3 && post.content.images.length > 4 && (
                          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">+{post.content.images.length - 4}</span>
                          </div>
                        )}

                        {/* Subcategory/Item Info Overlay */}
                        {post.content.subcategories && post.content.subcategories[index] && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                            <p className="text-sm font-medium">{post.content.subcategories[index].item}</p>
                            <p className="text-xs text-gray-300">{post.content.subcategories[index].category}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <LikesSection
                    initialLikeCount={post.stats.likes}
                    likedBy={[]}
                    contentType="review"
                    contentId={post.id.toString()}
                    currentPath="/home"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.stats.comments}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-green-500 hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{post.stats.shares}</span>
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSave(post.id)}
                  className={`transition-colors hover:bg-gray-100 ${
                    savedPosts.has(post.id)
                      ? "text-orange-500 hover:text-orange-500"
                      : "text-gray-500 hover:text-orange-500"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${savedPosts.has(post.id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Comments Section */}
              {expandedComments.has(post.id) && (
                <div className="pt-4 border-t border-gray-100">
                  <CommentsSection
                    comments={mockComments}
                    onAddComment={handleAddComment}
                    currentPath="/home"
                    className="space-y-3"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="w-full bg-transparent hover:bg-gray-50 transition-colors">
          Load More Posts
        </Button>
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageViewer}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {(() => {
              const post = mockPosts.find((p) => p.id === selectedImage.postId)
              if (!post?.content.images) return null

              return (
                <>
                  <img
                    src={post.content.images[selectedImage.imageIndex] || "/placeholder.svg"}
                    alt="Post content"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />

                  {post.content.images.length > 1 && (
                    <>
                      <button
                        onClick={() => navigateImage("prev")}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => navigateImage("next")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {post.content.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage({ postId: selectedImage.postId, imageIndex: index })}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === selectedImage.imageIndex ? "bg-white scale-125" : "bg-white bg-opacity-40"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}
