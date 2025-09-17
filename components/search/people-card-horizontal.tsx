"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Creator {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  followers: number
  reviewCount: number
  isFollowing: boolean
  tasteAffinityScore?: number
  recentPhotos: string[]
}

interface PeopleCardHorizontalProps {
  creator: Creator
  currentTab?: string
}

export function PeopleCardHorizontal({ creator, currentTab = "all" }: PeopleCardHorizontalProps) {
  const [isFollowing, setIsFollowing] = useState(creator.isFollowing)

  const handleFollowClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFollowing(!isFollowing)
  }

  const formatFollowers = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 p-0">
      <div className="flex h-28">
        <Link
          href={
            currentTab === "home"
              ? `/profile?userId=${creator.id}&from=home`
              : `/profile?userId=${creator.id}&from=search&tab=${currentTab}`
          }
          className="block shrink-0 ml-3 my-3"
        >
          <div className="relative h-22 w-22 overflow-hidden">
            <img
              src={creator.avatar || "/placeholder.svg"}
              alt={creator.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Link>

        <div className="flex-1 p-2 mr-3 flex flex-col justify-between min-w-0">
          <Link
            href={
              currentTab === "home"
                ? `/profile?userId=${creator.id}&from=home`
                : `/profile?userId=${creator.id}&from=search&tab=${currentTab}`
            }
            className="block"
          >
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-bold text-gray-900 leading-tight truncate">{creator.name}</h3>
              </div>

              <p className="text-sm text-gray-700 truncate">@{creator.username}</p>

              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{formatFollowers(creator.followers)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{creator.reviewCount}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="shrink-0 p-2 flex flex-col justify-between items-end">
          {creator.tasteAffinityScore && (
            <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded shrink-0">
              <span className="text-xs font-semibold text-green-700">{creator.tasteAffinityScore}% Match</span>
            </div>
          )}

          <Button
            variant={isFollowing ? "secondary" : "default"}
            size="sm"
            onClick={handleFollowClick}
            className={`h-8 px-3 text-xs font-medium ${
              isFollowing
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
