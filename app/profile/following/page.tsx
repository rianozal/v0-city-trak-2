"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"

export default function FollowingPage() {
  console.log("[v0] FollowingPage component is starting to render")

  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  const fromUserId = searchParams.get("from")

  console.log("[v0] FollowingPage component has initialized router")

  const following = [
    { id: 6, name: "Chef Ramesh", username: "cheframesh", avatar: "/placeholder.svg", isFollowing: true },
    { id: 7, name: "Food Network", username: "foodnetwork", avatar: "/placeholder.svg", isFollowing: true },
    { id: 8, name: "Mumbai Eats", username: "mumbaieats", avatar: "/placeholder.svg", isFollowing: true },
  ]

  console.log("[v0] FollowingPage component has prepared data, about to render JSX")

  const handleProfileClick = (clickedUserId: number) => {
    console.log("[v0] Navigating to profile:", clickedUserId)
    const fromParam = fromUserId || (userId ? `following-${userId}` : "following")
    router.push(`/profile/user/${clickedUserId}?from=${fromParam}`)
  }

  const handleBackClick = () => {
    if (userId) {
      const backFromParam = fromUserId ? `&from=${fromUserId}` : ""
      router.push(`/profile?userId=${userId}${backFromParam}`)
    } else {
      // If viewing own following, go back to own profile
      router.push("/profile")
    }
  }

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-6 bg-white min-h-screen"
      style={{ backgroundColor: "white", minHeight: "100vh" }}
    >
      {console.log("[v0] FollowingPage JSX is rendering")}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold">Following</h1>
          <p className="text-sm text-gray-600">{following.length} following</p>
        </div>
      </div>

      <div className="space-y-3">
        {following.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center space-x-3 cursor-pointer flex-1"
                onClick={() => handleProfileClick(user.id)}
              >
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
              <Button variant="outline" size="sm">
                Following
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
