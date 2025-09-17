"use client"

import type React from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"

export default function FollowersPage() {
  console.log("[v0] FollowersPage component is starting to render")

  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  const fromUserId = searchParams.get("from")

  console.log("[v0] FollowersPage component has initialized router")
  console.log("[v0] FollowersPage - userId:", userId, "fromUserId:", fromUserId)

  const getFollowersData = () => {
    if (!userId) {
      // Current user's followers (user ID 1)
      return [
        {
          id: 7, // Fixed user ID for Priya Kumar from 2 to 7
          name: "Priya Kumar",
          username: "chennaifoodie",
          avatar: "/indian-food-blogger.png",
          isFollowing: true,
        },
        { id: 3, name: "Lisa Chen", username: "foodieadventures", avatar: "/placeholder.svg", isFollowing: false },
        { id: 4, name: "Raj Patel", username: "spicylover", avatar: "/placeholder.svg", isFollowing: true },
        { id: 5, name: "Sarah Johnson", username: "tastehunter", avatar: "/placeholder.svg", isFollowing: false },
      ]
    } else if (userId === "2") {
      // Arjun Menon's followers (user ID 2 is now Arjun Menon)
      return [
        {
          id: 1,
          name: "Current User", // This would be the logged-in user
          username: "current_user",
          avatar: "/placeholder.svg",
          isFollowing: false,
        },
        {
          id: 6,
          name: "Kavya Sharma",
          username: "kavya_foodie",
          avatar: "/indian-woman-profile.png",
          isFollowing: true,
        },
        {
          id: 7,
          name: "Priya Kumar",
          username: "chennaifoodie",
          avatar: "/indian-food-blogger.png",
          isFollowing: false,
        },
      ]
    } else if (userId === "3") {
      // Lisa Chen's followers
      return [
        {
          id: 1,
          name: "Current User",
          username: "current_user",
          avatar: "/placeholder.svg",
          isFollowing: false,
        },
        {
          id: 2,
          name: "Arjun Menon", // Updated to match profile data
          username: "foodie_chennai",
          avatar: "/indian-man-profile.png",
          isFollowing: true,
        },
        { id: 8, name: "David Kim", username: "asianfusion", avatar: "/placeholder.svg", isFollowing: false },
      ]
    } else if (userId === "6") {
      return [
        {
          id: 2,
          name: "Arjun Menon",
          username: "foodie_chennai",
          avatar: "/indian-man-profile.png",
          isFollowing: false,
        },
        {
          id: 7,
          name: "Priya Kumar",
          username: "chennaifoodie",
          avatar: "/indian-food-blogger.png",
          isFollowing: true,
        },
        { id: 3, name: "Lisa Chen", username: "foodieadventures", avatar: "/placeholder.svg", isFollowing: false },
      ]
    } else {
      // Default followers for other users
      return [
        {
          id: 2, // This is now correctly Arjun Menon
          name: "Arjun Menon",
          username: "foodie_chennai",
          avatar: "/indian-man-profile.png",
          isFollowing: false,
        },
        {
          id: 7, // Fixed user ID for Priya Kumar from 2 to 7
          name: "Priya Kumar",
          username: "chennaifoodie",
          avatar: "/indian-food-blogger.png",
          isFollowing: true,
        },
      ]
    }
  }

  const followers = getFollowersData()

  console.log("[v0] FollowersPage component has prepared data, about to render JSX")

  const handleProfileClick = (clickedUserId: number) => {
    console.log("[v0] Profile click for userId:", clickedUserId)
    let fromParam = userId ? `followers-${userId}` : "followers"
    if (fromUserId && fromUserId.startsWith("/trail/")) {
      // If we came from a trail, encode that in the from parameter
      fromParam = `followers-${userId}-${fromUserId.replace("/", "")}`
    }
    router.push(`/profile/user/${clickedUserId}?from=${fromParam}`)
  }

  const handleFollowClick = (e: React.MouseEvent, followerId: number) => {
    e.stopPropagation()
    console.log(`[v0] Toggle follow for user ${followerId}`)
  }

  const handleBackClick = () => {
    console.log("[v0] Followers back button clicked - userId:", userId, "fromUserId:", fromUserId)
    if (userId) {
      // When going back to a user's profile, we need to restore the original context
      const backFromParam = fromUserId ? `&from=${fromUserId}` : ""
      console.log("[v0] Navigating back to profile with preserved from param:", backFromParam)
      router.push(`/profile?userId=${userId}${backFromParam}`)
    } else {
      // If viewing own followers, go back to own profile
      console.log("[v0] Navigating back to own profile")
      router.push("/profile")
    }
  }

  return (
    <div className="min-h-screen bg-white" style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {console.log("[v0] FollowersPage JSX is rendering")}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Followers</h1>
            <p className="text-sm text-gray-600">{followers.length} followers</p>
          </div>
        </div>

        <div className="space-y-3">
          {followers.map((follower) => (
            <Card
              key={follower.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleProfileClick(follower.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <img
                    src={follower.avatar || "/placeholder.svg"}
                    alt={follower.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{follower.name}</h3>
                    <p className="text-sm text-gray-600">@{follower.username}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={follower.isFollowing ? "outline" : "default"}
                    size="sm"
                    className={follower.isFollowing ? "" : "bg-orange-500 hover:bg-orange-600"}
                    onClick={(e) => handleFollowClick(e, follower.id)}
                  >
                    {follower.isFollowing ? "Following" : "Follow"}
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
