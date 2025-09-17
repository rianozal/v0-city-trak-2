"use client"

import { useState, useEffect } from "react"
import { Star, Heart, MessageCircle, Share2, Bookmark, MapPin } from "lucide-react"

interface MediaItem {
  id: string
  src: string
  type: "image" | "video"
  contentType: "review" | "trail" | "general"
  likes?: number
  comments?: number
  placeName?: string
  rating?: number
  location?: string
  costForTwo?: string
  itemName?: string
  trailName?: string
  reviewId?: number
  tag?: string
}

interface MediaViewerProps {
  mediaItems: MediaItem[]
  currentIndex: number
  onClose: () => void
  onPlaceClick?: (placeName: string, placeId?: number) => void
  onItemClick?: (itemName: string) => void
  onLocationClick?: (location: string) => void
  onViewFullReview?: (reviewId: number) => void
  userInfo?: {
    name: string
    username?: string
    avatar: string
  }
}

export default function MediaViewer({
  mediaItems,
  currentIndex,
  onClose,
  onPlaceClick,
  onItemClick,
  onLocationClick,
  onViewFullReview,
  userInfo,
}: MediaViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex)

  useEffect(() => {
    document.body.classList.add("media-viewer-open")

    return () => {
      document.body.classList.remove("media-viewer-open")
    }
  }, [])

  const navigateWithinGroup = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0))
    } else {
      setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1))
    }
  }

  const currentItem = mediaItems[currentImageIndex]

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center space-x-3">
          {userInfo && (
            <>
              <img src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} className="w-8 h-8 rounded-full" />
              <div>
                <div className="font-semibold text-sm">{userInfo.name}</div>
                {currentItem?.contentType === "review" && currentItem?.placeName && (
                  <div className="text-xs text-gray-300">{currentItem.placeName}</div>
                )}
              </div>
            </>
          )}
        </div>
        <button onClick={handleClose} className="text-white hover:text-gray-300 p-2">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Media Area */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={currentItem?.src || "/placeholder.svg"}
            alt={`Media ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />

          {/* Horizontal Navigation within group */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={() => navigateWithinGroup("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateWithinGroup("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Position Dots */}
          {mediaItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white scale-125" : "bg-white bg-opacity-40"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Image Tag */}
          {currentItem?.contentType === "review" && currentItem?.tag && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
              {currentItem.tag}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Info Panel */}
      <div className="bg-black bg-opacity-80 text-white p-4 space-y-3">
        {/* Review Details */}
        {currentItem?.contentType === "review" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onPlaceClick?.(currentItem?.placeName || "")}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (currentItem?.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{currentItem?.placeName}</span>
              </button>
              {onViewFullReview && currentItem?.reviewId && (
                <button
                  onClick={() => onViewFullReview(currentItem.reviewId!)}
                  className="text-orange-400 text-sm hover:text-orange-300"
                >
                  View Review
                </button>
              )}
            </div>

            {currentItem?.itemName && (
              <button
                onClick={() => onItemClick?.(currentItem.itemName!)}
                className="text-sm text-gray-300 hover:text-white transition-colors text-left"
              >
                {currentItem.itemName}
              </button>
            )}

            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <button
                onClick={() => onLocationClick?.(currentItem?.location || "")}
                className="hover:text-white transition-colors"
              >
                {currentItem?.location}
              </button>
              {currentItem?.costForTwo && (
                <>
                  <span>•</span>
                  <span>{currentItem.costForTwo}</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Trail Details */}
        {currentItem?.contentType === "trail" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium">{currentItem?.trailName}</span>
              </div>
              <button className="text-green-400 text-sm hover:text-green-300">View Trail</button>
            </div>

            {currentItem?.tag && (
              <div className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded inline-block">{currentItem.tag}</div>
            )}

            {currentItem?.itemName && (
              <button
                onClick={() => onItemClick?.(currentItem.itemName!)}
                className="text-sm text-gray-300 hover:text-white transition-colors text-left"
              >
                {currentItem.itemName}
              </button>
            )}

            {currentItem?.placeName && (
              <button
                onClick={() => onPlaceClick?.(currentItem?.placeName || "")}
                className="text-sm text-gray-300 hover:text-white transition-colors text-left"
              >
                {currentItem.placeName}
              </button>
            )}
          </div>
        )}

        {/* Social Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm">{currentItem?.likes || 0}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{currentItem?.comments || 0}</span>
            </button>
            <button className="hover:text-green-400 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          <button className="hover:text-yellow-400 transition-colors">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
