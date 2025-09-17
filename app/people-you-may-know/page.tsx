"use client"

import type React from "react"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
  {
    id: "10",
    name: "Karthik Raj",
    username: "karthik_foodie",
    avatar: "/indian-man-profile.png",
    bio: "Biryani connoisseur",
    followers: 1500,
    reviewCount: 89,
    isFollowing: false,
    tasteAffinityScore: 88,
    recentPhotos: ["/traditional-biryani-restaurant.png", "/chettinad-spicy-food.png"],
  },
  {
    id: "11",
    name: "Divya Nair",
    username: "divya_tastes",
    avatar: "/indian-woman-profile.png",
    bio: "South Indian cuisine expert",
    followers: 950,
    reviewCount: 56,
    isFollowing: false,
    tasteAffinityScore: 82,
    recentPhotos: ["/idli-sambar-plate.png", "/filter-coffee.png"],
  },
  {
    id: "12",
    name: "Arun Krishnan",
    username: "arun_eats",
    avatar: "/indian-man-profile.png",
    bio: "Chennai food explorer",
    followers: 1800,
    reviewCount: 134,
    isFollowing: false,
    tasteAffinityScore: 90,
    recentPhotos: ["/south-indian-thali.png", "/chennai-street-food.png"],
  },
]

export default function PeopleYouMayKnowPage() {
  const router = useRouter()
  const [followingState, setFollowingState] = useState<Record<string, boolean>>({})

  const handleProfileClick = (userId: string) => {
    router.push(`/profile?userId=${userId}&from=home`)
  }

  const handleFollowClick = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation()
    setFollowingState((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }))
  }

  const handleBackClick = () => {
    router.push("/")
  }

  const formatFollowers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <div className="min-h-screen bg-white" style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">People You May Know</h1>
            <p className="text-sm text-gray-600">Discover food lovers with similar tastes</p>
          </div>
        </div>

        <div className="space-y-3">
          {mockPeopleYouMayKnow.map((person) => (
            <Card
              key={person.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleProfileClick(person.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <img
                    src={person.avatar || "/placeholder.svg"}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{person.name}</h3>
                      {person.tasteAffinityScore && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          {person.tasteAffinityScore}% Match
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">@{person.username}</p>
                    <p className="text-xs text-gray-500 mb-2 truncate">{person.bio}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{formatFollowers(person.followers)} followers</span>
                      <span>•</span>
                      <span>{person.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={followingState[person.id] ? "outline" : "default"}
                    size="sm"
                    className={followingState[person.id] ? "" : "bg-orange-500 hover:bg-orange-600"}
                    onClick={(e) => handleFollowClick(e, person.id)}
                  >
                    {followingState[person.id] ? "Following" : "Follow"}
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
