"use client"

import type React from "react"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"

export default function LikesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const contentType = searchParams.get("type") // "trail" or "review"
  const contentId = searchParams.get("id")
  const from = searchParams.get("from")

  // Mock data - in real app this would come from API based on contentType and contentId
  const getLikesData = () => {
    return [
      {
        id: 2,
        name: "Priya Kumar",
        username: "chennaifoodie",
        avatar: "/indian-food-blogger.png",
        isFollowing: true,
      },
      {
        id: 3,
        name: "Kavya Sharma",
        username: "kavya_foodie",
        avatar: "/indian-woman-profile.png",
        isFollowing: false,
      },
      {
        id: 4,
        name: "Raj Patel",
        username: "spicylover",
        avatar: "/placeholder.svg",
        isFollowing: true,
      },
      {
        id: 5,
        name: "Sarah Johnson",
        username: "tastehunter",
        avatar: "/placeholder.svg",
        isFollowing: false,
      },
    ]
  }

  const likes = getLikesData()
  const contentTitle = contentType === "trail" ? "Trail" : "Review"

  const handleProfileClick = (clickedUserId: number) => {
    const fromParam = `likes-${contentType}-${contentId}`
    router.push(`/profile/user/${clickedUserId}?from=${fromParam}`)
  }

  const handleFollowClick = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation()
    console.log(`[v0] Toggle follow for user ${userId}`)
  }

  const handleBackClick = () => {
    console.log("[v0] Likes page back button clicked, from:", from)
    if (from) {
      const decodedFrom = decodeURIComponent(from)
      router.push(decodedFrom)
    } else if (contentType === "trail" && contentId) {
      router.push(`/trail/${contentId}`)
    } else if (contentType === "review" && contentId) {
      router.push(`/profile/review/${contentId}`)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Likes</h1>
            <p className="text-sm text-gray-600">{likes.length} likes</p>
          </div>
        </div>

        <div className="space-y-3">
          {likes.map((user) => (
            <Card
              key={user.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleProfileClick(user.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-600">@{user.username}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={user.isFollowing ? "outline" : "default"}
                    size="sm"
                    className={user.isFollowing ? "" : "bg-orange-500 hover:bg-orange-600"}
                    onClick={(e) => handleFollowClick(e, user.id)}
                  >
                    {user.isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
