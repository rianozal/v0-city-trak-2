"use client"

import type React from "react"

import { useState } from "react"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"

interface LikedByUser {
  name: string
  username: string
  avatar: string
}

interface LikesSectionProps {
  initialLikeCount: number
  likedBy: LikedByUser[]
  isInitiallyLiked?: boolean
  onLikeToggle?: (isLiked: boolean) => void
  contentType: "trail" | "review"
  contentId: string
  currentPath?: string
}

export default function LikesSection({
  initialLikeCount,
  likedBy,
  isInitiallyLiked = false,
  onLikeToggle,
  contentType,
  contentId,
  currentPath,
}: LikesSectionProps) {
  const [isLiked, setIsLiked] = useState(isInitiallyLiked)
  const router = useRouter()

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    onLikeToggle?.(newLikedState)
  }

  const handleViewLikes = (e: React.MouseEvent) => {
    e.stopPropagation()
    let fromParam = currentPath || (contentType === "trail" ? `/trail/${contentId}` : `/profile/review/${contentId}`)

    // If coming from profile page, add tab context to preserve trails tab on back navigation
    if (currentPath && currentPath.includes("/profile")) {
      const separator = currentPath.includes("?") ? "&" : "?"
      fromParam = `${currentPath}${separator}tab=trails`
    }

    router.push(`/profile/likes?type=${contentType}&id=${contentId}&from=${encodeURIComponent(fromParam)}`)
  }

  const validInitialCount = typeof initialLikeCount === "number" && !isNaN(initialLikeCount) ? initialLikeCount : 0
  const currentLikeCount = validInitialCount + (isLiked ? 1 : 0)

  return (
    <div className="flex items-center space-x-2">
      <button
        className={`flex items-center space-x-2 transition-colors ${
          isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
        }`}
        onClick={handleLikeToggle}
      >
        <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
      </button>
      <span className="font-medium cursor-pointer hover:underline text-sm text-gray-600" onClick={handleViewLikes}>
        {currentLikeCount} {currentLikeCount === 1 ? "Like" : "Likes"}
      </span>
    </div>
  )
}
