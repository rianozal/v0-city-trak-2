"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Star,
  Award,
  Camera,
  Bookmark,
  Plus,
  MapPin,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Play,
  Eye,
  ChevronRight,
  UserPlus,
  UserCheck,
  Lock,
  ArrowLeft,
  Settings,
} from "lucide-react"
import { dummyUser, dummyReviews, leaderboard } from "@/lib/dummy-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import LikesSection from "@/components/likes-section"

export default function ProfilePage({
  searchParams,
}: { searchParams: { userId?: string; from?: string; tab?: string } }) {
  const router = useRouter()

  const rawUserId = searchParams.userId
  const userId = rawUserId ? rawUserId.split("?")[0] : undefined

  const fromUserId = searchParams.from
  const fromSource = searchParams.from
  const tabParam = searchParams.tab

  const currentUserId = "1" // In real app, this would come from auth context
  const isOwnProfile = !userId || userId === currentUserId
  const [isFollowing, setIsFollowing] = useState(false)
  const [isPrivateProfile, setIsPrivateProfile] = useState(false) // Mock privacy setting

  console.log("[v0] Profile page - userId:", userId, "currentUserId:", currentUserId, "isOwnProfile:", isOwnProfile)

  const getUserData = (id: string | null) => {
    if (!id || id === currentUserId) return dummyUser

    const users: Record<string, any> = {
      "2": {
        id: "2",
        name: "Arjun Menon",
        username: "foodie_chennai",
        avatar: "/indian-man-profile.png",
        followers: 890,
        following: 234,
        trakPoints: 4250,
        bio: "Food enthusiast exploring Chennai's authentic flavors 🍛",
        photoCount: 245,
      },
      "3": {
        id: "3",
        name: "Lisa Chen",
        username: "foodieadventures",
        avatar: "/placeholder.svg",
        followers: 4200,
        following: 380,
        trakPoints: 8920,
        bio: "Travel food blogger discovering authentic flavors across Asia! ✈️🍜",
        photoCount: 890,
      },
      "6": {
        id: "6",
        name: "Kavya Sharma",
        username: "kavya_foodie",
        avatar: "/indian-woman-profile.png",
        followers: 1450,
        following: 189,
        trakPoints: 3890,
        bio: "South Indian food lover sharing hidden gems 🌶️✨",
        photoCount: 178,
      },
      "7": {
        id: "7",
        name: "Priya Kumar",
        username: "chennaifoodie",
        avatar: "/indian-food-blogger.png",
        followers: 1200,
        following: 156,
        trakPoints: 5670,
        bio: "Food blogger exploring Chennai's culinary scene 🍛✨",
        photoCount: 320,
      },
    }
    return users[id] || users["2"]
  }

  const profileUser = getUserData(userId)
  const userReviews = dummyReviews.filter((review) => review.userId === profileUser.id)
  const userRank = leaderboard.findIndex((user) => user.id === profileUser.id) + 1

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [currentMediaGroup, setCurrentMediaGroup] = useState<any[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const mediaCount = profileUser.photoCount || 156
  const trailsCount = 5
  const savedCount = 23

  const canViewPrivateContent = isOwnProfile || (isFollowing && !isPrivateProfile)

  const enhancedReviews = [
    // Original review
    {
      id: 1,
      userId: profileUser.id,
      rating: 5,
      text: "Best idli and sambar in Chennai! The coconut chutney is absolutely divine. Been coming here for years and the quality never disappoints.",
      placeName: "Murugan Idli Shop",
      placeCategory: "South Indian",
      itemReviews: [
        {
          name: "Ghee Roast Dosa",
          rating: 5,
          comment: "Perfectly crispy with amazing ghee flavor",
          image: "/ghee-roast-dosa.png",
        },
        { name: "Filter Coffee", rating: 4, comment: "Authentic South Indian coffee", image: "/filter-coffee.png" },
      ],
      media: ["/ghee-roast-dosa.png", "/filter-coffee.png", "/south-indian-thali.png"],
      location: "T. Nagar, Chennai",
      visitDate: "2024-01-15",
      costForTwo: "₹300",
      helpfulVotes: 23,
    },
    // Edge case 1: Single item review with no image
    {
      id: 2,
      userId: profileUser.id,
      rating: 4,
      text: "Quick bite for breakfast. The place gets crowded during peak hours but the service is efficient.",
      placeName: "Adyar Ananda Bhavan",
      placeCategory: "South Indian",
      itemReviews: [
        { name: "Masala Vada", rating: 4, comment: "Crispy and well-spiced, perfect with chutney", image: null },
      ],
      media: ["/masala-vada.png", "/coconut-chutney.png"],
      location: "Adyar, Chennai",
      visitDate: "2024-01-10",
      costForTwo: "₹180",
      helpfulVotes: 15,
    },
    // Edge case 2: Multiple item reviews with long text and many media items
    {
      id: 3,
      userId: profileUser.id,
      rating: 5,
      text: "An absolutely phenomenal dining experience that exceeded all expectations! From the moment we walked in, the ambiance was perfect - warm lighting, comfortable seating, and the aroma of authentic spices filled the air. The staff was incredibly attentive and knowledgeable about the menu, providing excellent recommendations. Each dish was a masterpiece, showcasing the chef's expertise in traditional South Indian cuisine while adding modern touches that elevated the flavors. The presentation was Instagram-worthy, but more importantly, every bite was a burst of authentic flavors that transported us straight to the heart of Tamil Nadu. The quality of ingredients was top-notch, and you could taste the freshness in every component.",
      placeName: "Dakshin Restaurant",
      placeCategory: "Fine Dining South Indian",
      itemReviews: [
        {
          name: "Chettinad Chicken",
          rating: 5,
          comment: "Perfectly spiced with authentic Chettinad flavors",
          image: "/chettinad-chicken.png",
        },
        { name: "Appam with Stew", rating: 5, comment: "Soft appam with rich coconut stew", image: "/appam-stew.png" },
        { name: "Payasam", rating: 4, comment: "Traditional dessert with perfect sweetness", image: "/payasam.png" },
        { name: "Rasam", rating: 5, comment: "Tangy and aromatic, best I've had", image: "/rasam.png" },
      ],
      media: [
        "/chettinad-chicken.png",
        "/appam-stew.png",
        "/payasam.png",
        "/rasam.png",
        "/south-indian-thali.png",
        "/banana-leaf-serving.png",
        "/coconut-rice.png",
        "/sambar.png",
        "/filter-coffee.png",
        "/traditional-south-indian-kitchen.png",
        "/spice-collection.png",
        "/curry-leaves.png",
      ],
      location: "ITC Grand Chola, Chennai",
      visitDate: "2024-01-08",
      costForTwo: "₹2800",
      helpfulVotes: 89,
    },
  ]

  const mediaItems = [
    // Review media items
    {
      id: 1,
      src: "/ghee-roast-dosa.png",
      type: "image",
      contentType: "review",
      reviewId: 1,
      likes: 45,
      comments: 12,
      placeName: "Murugan Idli Shop",
      media: ["/ghee-roast-dosa.png", "/filter-coffee.png", "/idli-sambar-plate.png"],
    },
    {
      id: 2,
      src: "/filter-coffee.png",
      type: "image",
      contentType: "review",
      reviewId: 1,
      likes: 32,
      comments: 8,
      placeName: "Murugan Idli Shop",
      media: ["/filter-coffee.png"],
    },
    {
      id: 3,
      src: "/south-indian-thali.png",
      type: "image",
      contentType: "review",
      reviewId: 2,
      likes: 67,
      comments: 15,
      placeName: "Adyar Ananda Bhavan",
      media: ["/south-indian-thali.png", "/traditional-biryani-restaurant.png"],
    },
    {
      id: 4,
      src: "/chettinad-chicken.png",
      type: "image",
      contentType: "review",
      reviewId: 3,
      likes: 89,
      comments: 23,
      placeName: "Dakshin Restaurant",
      media: ["/chettinad-chicken.png"],
    },
    {
      id: 5,
      src: "/appam-stew.png",
      type: "image",
      contentType: "review",
      reviewId: 3,
      likes: 78,
      comments: 19,
      placeName: "Dakshin Restaurant",
      media: ["/appam-stew.png"],
    },
    {
      id: 6,
      src: "/payasam.png",
      type: "image",
      contentType: "review",
      reviewId: 3,
      likes: 92,
      comments: 27,
      placeName: "Dakshin Restaurant",
      media: ["/payasam.png"],
    },
    // Trail media items
    {
      id: 7,
      src: "/south-indian-thali.png",
      type: "image",
      contentType: "trail",
      trailId: 1,
      likes: 156,
      comments: 34,
      trailName: "Best South Indian Trail",
      media: ["/south-indian-thali.png", "/chettinad-spicy-food.png", "/traditional-biryani-restaurant.png"],
    },
    {
      id: 8,
      src: "/chennai-street-food.png",
      type: "image",
      contentType: "trail",
      trailId: 2,
      likes: 134,
      comments: 41,
      trailName: "Chennai Street Food Adventure",
      media: ["/chennai-street-food.png", "/modern-coffee-shop.png"],
    },
    // Regular media posts
    {
      id: 9,
      src: "/traditional-south-indian-kitchen.png",
      type: "image",
      contentType: "post",
      likes: 78,
      comments: 19,
      media: ["/traditional-south-indian-kitchen.png"],
    },
    {
      id: 10,
      src: "/banana-leaf-serving.png",
      type: "image",
      contentType: "post",
      likes: 92,
      comments: 27,
      media: ["/banana-leaf-serving.png"],
    },
    {
      id: 11,
      src: "/spice-market-video.mp4",
      type: "video",
      contentType: "post",
      likes: 134,
      comments: 41,
      media: ["/spice-market-video.mp4"],
    },
  ]

  const savedItems = [
    {
      id: 1,
      type: "place",
      name: "Murugan Idli Shop",
      category: "South Indian",
      location: "T. Nagar",
      image: "/south-indian-restaurant.png",
    },
    {
      id: 2,
      type: "item",
      name: "Ghee Roast Dosa",
      place: "Murugan Idli Shop",
      rating: 4.8,
      image: "/ghee-roast-dosa.png",
    },
    { id: 3, type: "trail", name: "Best South Indian Trail", places: 8, views: "2.3k", image: "/placeholder.svg" },
    {
      id: 4,
      type: "place",
      name: "Saravana Bhavan",
      category: "Vegetarian",
      location: "Anna Nagar",
      image: "/placeholder.svg",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const handleFollowersClick = () => {
    console.log("[v0] Followers button clicked, isOwnProfile:", isOwnProfile)
    if (isOwnProfile) {
      console.log("[v0] Navigating to /profile/followers")
      router.push("/profile/followers")
    } else {
      console.log("[v0] Navigating to /profile/followers with userId:", profileUser.id)
      const currentFromParam = fromUserId ? `&from=${fromUserId}` : ""
      console.log("[v0] Current from param being passed:", currentFromParam)
      router.push(`/profile/followers?userId=${profileUser.id}${currentFromParam}`)
    }
  }

  const handleFollowingClick = () => {
    console.log("[v0] Following button clicked, isOwnProfile:", isOwnProfile)
    if (isOwnProfile) {
      console.log("[v0] Navigating to /profile/following")
      router.push("/profile/following")
    } else {
      console.log("[v0] Navigating to /profile/following with userId:", profileUser.id)
      const currentFromParam = fromUserId ? `&from=${fromUserId}` : ""
      console.log("[v0] Current from param being passed:", currentFromParam)
      router.push(`/profile/following?userId=${profileUser.id}${currentFromParam}`)
    }
  }

  const handleViewFullReview = (reviewId: number) => {
    // Navigate to full review page
    router.push(`/profile/review/${reviewId}`)
  }

  const handleSavedItemClick = (item: any) => {
    if (item.type === "place") {
      // Navigate to restaurant page with saved tab context
      console.log("[v0] Navigate to place:", item.id)
      router.push(`/restaurant/${item.id}?from=saved`)
    } else if (item.type === "item") {
      // Navigate to restaurant page where the item is available with saved tab context
      console.log("[v0] Navigate to item:", item.id)
      // For now, navigate to the restaurant page - could be enhanced to show specific item
      router.push(`/restaurant/${item.id}?from=saved`)
    } else if (item.type === "trail") {
      // Navigate to trail page with saved tab context
      console.log("[v0] Navigate to trail:", item.id)
      router.push(`/trail/${item.id}?from=saved`)
    }
  }

  const handleTrailClick = (trailId: number) => {
    console.log("[v0] Navigate to trail:", trailId)
    const cleanUserId = userId
    const fromParam = searchParams.from

    let fromContext = "/profile"
    if (cleanUserId) {
      fromContext = `/profile?userId=${cleanUserId}`
      if (fromParam) {
        fromContext += `&from=${encodeURIComponent(fromParam)}`
      }
    } else if (fromParam) {
      fromContext += `?from=${encodeURIComponent(fromParam)}`
    }

    console.log("[v0] Navigating to trail with fromContext:", fromContext)
    router.push(`/trail/${trailId}?from=${encodeURIComponent(fromContext)}`)
  }

  const openMediaViewer = (index: number) => {
    const cleanUserId = userId
    const fromParam = searchParams.from

    const params = new URLSearchParams()
    if (cleanUserId) params.set("userId", cleanUserId)
    if (fromParam) params.set("from", fromParam)

    const queryString = params.toString()
    const url = queryString ? `/profile/media/${index}?${queryString}` : `/profile/media/${index}`

    router.push(url)
  }

  const openReviewMediaViewer = (media: any[], mediaIndex: number) => {
    // For now, just open the first media item - can be enhanced later
    openMediaViewer(0)
  }

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
  }

  const handleBackClick = () => {
    console.log("[v0] Back button clicked - fromUserId:", fromUserId, "userId:", userId, "tabParam:", tabParam)
    if (fromUserId) {
      if (fromUserId === "search") {
        const searchUrl = tabParam ? `/search?tab=${tabParam}` : "/search"
        console.log("[v0] Navigating back to search with tab:", searchUrl)
        router.push(searchUrl)
      } else if (fromUserId.startsWith("/trail/")) {
        console.log("[v0] Navigating back to trail:", fromUserId)
        router.push(fromUserId)
      } else if (fromUserId.startsWith("followers-")) {
        const parts = fromUserId.split("-")
        const originalUserId = parts[1]
        let originalContext = ""

        if (parts.length > 2) {
          // Reconstruct original context from encoded parts
          const contextParts = parts.slice(2)
          if (contextParts[0] === "trail") {
            originalContext = `/${contextParts.join("/")}`
          } else {
            originalContext = contextParts.join("-")
          }
        }

        console.log(
          "[v0] Navigating back to followers page for user:",
          originalUserId,
          "with original context:",
          originalContext,
        )
        const fromParam = originalContext ? `&from=${encodeURIComponent(originalContext)}` : ""
        router.push(`/profile/followers?userId=${originalUserId}${fromParam}`)
      } else if (fromUserId === "followers") {
        console.log("[v0] Navigating back to own followers page")
        router.push("/profile/followers")
      } else if (fromUserId.startsWith("following-")) {
        const parts = fromUserId.split("-")
        const originalUserId = parts[1]
        let originalContext = ""

        if (parts.length > 2) {
          const contextParts = parts.slice(2)
          if (contextParts[0] === "trail") {
            originalContext = `/${contextParts.join("/")}`
          } else {
            originalContext = contextParts.join("-")
          }
        }

        console.log(
          "[v0] Navigating back to following page for user:",
          originalUserId,
          "with original context:",
          originalContext,
        )
        const fromParam = originalContext ? `&from=${encodeURIComponent(originalContext)}` : ""
        router.push(`/profile/following?userId=${originalUserId}${fromParam}`)
      } else if (fromUserId === "following") {
        console.log("[v0] Navigating back to own following page")
        router.push("/profile/following")
      } else if (fromUserId === "saved") {
        console.log("[v0] Navigating back to saved items")
        router.push("/profile?from=saved")
      } else if (fromUserId.startsWith("/profile")) {
        console.log("[v0] Navigating back to profile:", fromUserId)
        router.push(fromUserId)
      } else if (fromUserId === "home") {
        console.log("[v0] Navigating back to homepage")
        router.push("/")
      } else {
        console.log("[v0] Navigating to other context:", fromUserId)
        router.push(fromUserId)
      }
    } else {
      console.log("[v0] No fromUserId, navigating to home page")
      router.push("/")
    }
  }

  const handleItemImageClick = (image: any) => {
    // Handle item image click
    console.log("Item image clicked:", image)
  }

  const getDefaultTab = () => {
    console.log("[v0] getDefaultTab - fromSource:", fromSource, "isOwnProfile:", isOwnProfile)
    if (fromSource && (fromSource === "trail" || fromSource.startsWith("/trail/") || fromSource.startsWith("trail/"))) {
      console.log("[v0] Setting default tab to trails (came from trail)")
      return "trails"
    }
    if (tabParam === "trails") {
      console.log("[v0] Setting default tab to trails (from tab parameter)")
      return "trails"
    }
    if (fromSource === "saved" && isOwnProfile) {
      console.log("[v0] Setting default tab to saved")
      return "saved"
    }
    console.log("[v0] Setting default tab to media")
    return "media"
  }

  const [activeTab, setActiveTab] = useState(getDefaultTab())

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {!isOwnProfile && (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm -mx-4 -mt-6 mb-6">
          <div className="px-4 py-3">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3 hover:bg-gray-100 -ml-2">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">Profile</h1>
            </div>
          </div>
        </div>
      )}

      <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <div className="flex items-start space-x-4 mb-6">
          <div className="relative flex-shrink-0">
            <img
              src={profileUser.avatar || "/placeholder.svg"}
              alt={profileUser.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg object-cover"
              style={{ aspectRatio: "1/1" }}
            />
            <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              #{userRank}
            </div>
          </div>
          <div className="flex-1 min-w-0 pr-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{profileUser.name}</h1>
            <p className="text-gray-600 text-base sm:text-lg truncate">@{profileUser.username}</p>
            {profileUser.bio && <p className="text-gray-700 mt-2 text-sm line-clamp-2">{profileUser.bio}</p>}
            <div className="flex items-center mt-3 space-x-4 sm:space-x-6 text-sm">
              <button
                onClick={handleFollowersClick}
                className="flex items-center space-x-1 hover:text-orange-600 transition-colors"
              >
                <Users className="h-4 w-4 text-gray-500" />
                <span className="font-semibold text-gray-900">{profileUser.followers}</span>
                <span className="text-gray-600">followers</span>
              </button>
              <button
                onClick={handleFollowingClick}
                className="flex items-center space-x-1 hover:text-orange-600 transition-colors"
              >
                <span className="font-semibold text-gray-900">{profileUser.following}</span>
                <span className="text-gray-600">following</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group flex-shrink-0"
              onClick={() => router.push("/dashboard")}
            >
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                    <div className="text-orange-500 text-sm font-bold">5</div>
                  </div>
                  <Award className="h-4 w-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <div className="text-sm font-bold">{profileUser.trakPoints} TrakPoints</div>
                </div>
                <ChevronRight className="h-4 w-4 text-orange-200 group-hover:text-white transition-colors" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isOwnProfile ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white hover:bg-gray-50"
                    onClick={() => router.push("/profile/edit")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Profile & Settings
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleFollowToggle}
                  className={
                    isFollowing
                      ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }
                  size="sm"
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue={getDefaultTab()} className="w-full" onValueChange={setActiveTab}>
        <TabsList className={`grid w-full ${isOwnProfile ? "grid-cols-4" : "grid-cols-3"} bg-gray-100`}>
          <TabsTrigger value="media" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Media ({mediaCount})
          </TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Reviews ({userReviews.length})
          </TabsTrigger>
          <TabsTrigger value="trails" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Trails ({trailsCount})
          </TabsTrigger>
          {isOwnProfile && (
            <TabsTrigger value="saved" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Saved ({savedCount})
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="media" className="space-y-4">
          {!canViewPrivateContent ? (
            <Card className="p-8 text-center">
              <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">This Account is Private</h3>
              <p className="text-gray-600 mb-4">Follow @{profileUser.username} to see their photos and videos.</p>
              <Button onClick={handleFollowToggle} className="bg-orange-500 hover:bg-orange-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaItems.map((media, index) => (
                <div
                  key={media.id}
                  className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    openMediaViewer(index)
                  }}
                >
                  <img
                    src={media.src || "/placeholder.svg"}
                    alt={`Media ${media.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />

                  <div className="absolute top-2 right-2">
                    {media.contentType === "review" && (
                      <div className="bg-orange-500 text-white p-1 rounded-full shadow-lg">
                        <Star className="h-3 w-3" />
                      </div>
                    )}
                    {media.contentType === "trail" && (
                      <div className="bg-green-500 text-white p-1 rounded-full shadow-lg">
                        <MapPin className="h-3 w-3" />
                      </div>
                    )}
                    {media.type === "video" && (
                      <div className="bg-black bg-opacity-60 text-white p-1 rounded-full shadow-lg ml-1">
                        <Play className="h-3 w-3" />
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-2">
                    {media.contentType === "review" && media.placeName && (
                      <div className="text-white text-xs mb-1 truncate">{media.placeName}</div>
                    )}
                    {media.contentType === "trail" && media.trailName && (
                      <div className="text-white text-xs mb-1 truncate">{media.trailName}</div>
                    )}
                    <div className="flex items-center justify-between text-white text-xs">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-3 w-3" />
                        <span>{media.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-3 w-3" />
                        <span>{media.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          {!canViewPrivateContent ? (
            <Card className="p-8 text-center">
              <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">This Account is Private</h3>
              <p className="text-gray-600 mb-4">Follow @{profileUser.username} to see their reviews and activity.</p>
              <Button onClick={handleFollowToggle} className="bg-orange-500 hover:bg-orange-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {enhancedReviews.map((review, index) => (
                <Card key={review.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/south-indian-restaurant.png"
                        alt={review.placeName}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{review.placeName}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Badge variant="secondary" className="text-xs px-1 py-0">
                            {review.placeCategory}
                          </Badge>
                          <span>•</span>
                          <MapPin className="h-3 w-3" />
                          <span>{review.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{formatDate(review.visitDate)}</div>
                      <div className="text-xs font-medium text-gray-700">{review.costForTwo} for two</div>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium">Overall Experience</span>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">{review.text}</p>
                  </div>

                  {review.itemReviews && review.itemReviews.length > 0 && (
                    <div className="space-y-2 mb-1">
                      {review.itemReviews.slice(0, 2).map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-gray-50 p-2 rounded-lg">
                          <div className="flex items-start space-x-3">
                            {item.image ? (
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-10 h-10 rounded object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  handleItemImageClick(item.image)
                                }}
                              />
                            ) : (
                              <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <Camera className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{item.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {review.itemReviews.length > 2 && (
                        <p className="text-xs text-orange-600">+{review.itemReviews.length - 2} more items</p>
                      )}
                    </div>
                  )}

                  {review.media && review.media.length > 0 && (
                    <div className="flex space-x-2 mt-1 mb-1 overflow-x-auto">
                      {review.media.slice(0, 4).map((mediaUrl, mediaIndex) => (
                        <img
                          key={mediaIndex}
                          src={mediaUrl || "/placeholder.svg"}
                          alt={`Review media ${mediaIndex + 1}`}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            openReviewMediaViewer(review.media, mediaIndex)
                          }}
                        />
                      ))}
                      {review.media.length > 4 && (
                        <button
                          className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            openReviewMediaViewer(review.media, 0)
                          }}
                        >
                          +{review.media.length - 4}
                        </button>
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
                        <span>Reply ({Math.floor(Math.random() * 10) + 1})</span>
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
          )}
        </TabsContent>

        <TabsContent value="trails" className="space-y-4 relative">
          {!canViewPrivateContent ? (
            <Card className="p-8 text-center">
              <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">This Account is Private</h3>
              <p className="text-gray-600 mb-4">Follow @{profileUser.username} to see their discovery trails.</p>
              <Button onClick={handleFollowToggle} className="bg-orange-500 hover:bg-orange-600">
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </Button>
            </Card>
          ) : (
            <>
              {trailsCount > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[...Array(trailsCount)].map((_, i) => (
                    <Card
                      key={i}
                      className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleTrailClick(i + 1)}
                    >
                      <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-lg mb-0.5 flex items-center justify-center relative overflow-hidden">
                        <img src="/placeholder.svg" alt={`Trail ${i + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-3">
                          <div className="flex items-center justify-between w-full text-white text-sm">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>7 stops</span>
                              </div>
                              <span>•</span>
                              <span>2.5 km</span>
                              <span>•</span>
                              <span>3 hours</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Eye className="h-4 w-4" />
                              <span>2.3k views</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-0.5">
                        <LikesSection
                          initialLikeCount={156}
                          likedBy={[
                            { name: "Arjun Menon", username: "foodie_chennai", avatar: "/indian-man-profile.png" },
                            { name: "Kavya Sharma", username: "kavya_foodie", avatar: "/indian-woman-profile.png" },
                            { name: "Priya Kumar", username: "chennaifoodie", avatar: "/indian-food-blogger.png" },
                          ]}
                          isInitiallyLiked={false}
                          contentType="trail"
                          contentId={(i + 1).toString()}
                          currentPath={`/profile${userId ? `?userId=${userId}` : ""}`}
                        />
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900">4.8</span>
                          <span className="text-sm text-gray-600">(1250)</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">Best South Indian Trail</h4>
                        <p className="text-sm text-gray-600">2 weeks ago</p>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center border-2 border-dashed border-gray-300">
                  <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Create Your First Trail</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Curate a collection of your favorite places and share your discoveries with the community.
                  </p>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Trail
                  </Button>
                </Card>
              )}
            </>
          )}

          {isOwnProfile && canViewPrivateContent && activeTab === "trails" && (
            <div className="fixed bottom-20 right-4 md:bottom-4">
              <Button
                size="lg"
                className="rounded-full bg-orange-500 hover:bg-orange-600 shadow-lg"
                onClick={() => {
                  console.log("[v0] Create new trail FAB clicked")
                  router.push("/add-trail")
                }}
                aria-label="Create new trail"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Trail
              </Button>
            </div>
          )}
        </TabsContent>

        {isOwnProfile && (
          <TabsContent value="saved" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {savedItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleSavedItemClick(item)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="absolute -top-1 -right-1">
                        {item.type === "place" && (
                          <MapPin className="h-4 w-4 text-blue-500 bg-white rounded-full p-0.5" />
                        )}
                        {item.type === "item" && (
                          <Star className="h-4 w-4 text-yellow-500 bg-white rounded-full p-0.5" />
                        )}
                        {item.type === "trail" && (
                          <Camera className="h-4 w-4 text-green-500 bg-white rounded-full p-0.5" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <div className="text-sm text-gray-600">
                        {item.type === "place" && (
                          <div className="flex items-center space-x-1">
                            <Badge variant="outline" className="text-xs">
                              {item.category}
                            </Badge>
                            <span>•</span>
                            <span>{item.location}</span>
                          </div>
                        )}
                        {item.type === "item" && (
                          <div className="flex items-center space-x-1">
                            <span>at {item.place}</span>
                            <span>•</span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                              <span>{item.rating}</span>
                            </div>
                          </div>
                        )}
                        {item.type === "trail" && (
                          <div className="flex items-center space-x-1">
                            <span>{item.places} places</span>
                            <span>•</span>
                            <span>{item.views} views</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Bookmark className="h-5 w-5 text-orange-500 fill-current" />
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-8 text-center">
              <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Start Saving Places</h3>
              <p className="text-gray-600">
                Bookmark your favorite places, items, and trails to easily find them later.
              </p>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
