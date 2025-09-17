"use client"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Bookmark,
  Share2,
  Edit3,
  Map,
  List,
  Navigation,
  ChevronDown,
  ChevronUp,
  Star,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TrailStopImage {
  id: string
  url: string
  caption: string
  tags: string[]
  type: "subcategory" | "item"
  file?: File
}

interface TrailStop {
  id: string
  name: string
  address: string
  category: string
  estimatedTime: string
  estimatedTimeUnit: string
  detailedInstructions: string
  images: TrailStopImage[]
}

interface TrailForm {
  title: string
  description: string
  coverImage: string
  coverImageFile?: File
  category: string
  difficulty: string
  estimatedDuration: string
  estimatedDurationUnit: string
  estimatedDistance: string
  stops: TrailStop[]
}

interface PreviewTrail {
  id: string
  title: string
  creator: {
    id: string
    name: string
    username: string
    avatar: string
  }
  stats: {
    stops: number
    distance: string
    duration: string
  }
  mapImage: string
  stops: PreviewTrailStop[]
  isCreator: boolean
  savedCount: number
  rating: number
  reviewCount: number
  description: string
}

interface PreviewTrailStop {
  id: number
  name: string
  images: {
    id: string
    url: string
    caption: string
    tags: string[]
  }[]
  rating: number
  reviewCount: number
  address: string
  creatorNote: string
  detailedInstructions: string
  completed: boolean
  category: string
  estimatedTime: string
}

export default function TrailPreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [previewTrail, setPreviewTrail] = useState<PreviewTrail | null>(null)
  const [activeView, setActiveView] = useState<"list" | "map">("list")
  const [expandedStops, setExpandedStops] = useState<Set<number>>(new Set())

  useEffect(() => {
    const trailData = localStorage.getItem("trailPreviewData")
    if (trailData) {
      const formData: TrailForm = JSON.parse(trailData)

      // Convert form data to preview format
      const convertedTrail: PreviewTrail = {
        id: "preview",
        title: formData.title || "Untitled Trail",
        creator: {
          id: "current-user",
          name: "You",
          username: "preview",
          avatar: "/placeholder.svg",
        },
        stats: {
          stops: formData.stops.length,
          distance: formData.estimatedDistance || "TBD",
          duration: formData.estimatedDuration
            ? `${formData.estimatedDuration} ${formData.estimatedDurationUnit}`
            : "TBD",
        },
        mapImage: formData.coverImage || "/placeholder.svg",
        stops: formData.stops.map((stop, index) => ({
          id: index + 1,
          name: stop.name || `Stop ${index + 1}`,
          images: stop.images.map((img) => ({
            id: img.id,
            url: img.url || "/placeholder.svg",
            caption: img.caption || "No caption",
            tags: img.tags,
          })),
          rating: 4.5, // Default preview rating
          reviewCount: 0,
          address: stop.address || "Address not set",
          creatorNote: "This is a preview of your trail stop.",
          detailedInstructions: stop.detailedInstructions || "No detailed instructions provided yet.",
          completed: false,
          category: stop.category || "General",
          estimatedTime: stop.estimatedTime ? `${stop.estimatedTime} ${stop.estimatedTimeUnit}` : "TBD",
        })),
        isCreator: true,
        savedCount: 0,
        rating: 4.5,
        reviewCount: 0,
        description: formData.description || "No description provided yet.",
      }

      setPreviewTrail(convertedTrail)
    }
  }, [])

  const handleBackClick = () => {
    router.back()
  }

  const toggleStopExpansion = (stopId: number) => {
    const newExpanded = new Set(expandedStops)
    if (newExpanded.has(stopId)) {
      newExpanded.delete(stopId)
    } else {
      newExpanded.add(stopId)
    }
    setExpandedStops(newExpanded)
  }

  const handleEditTrail = () => {
    router.back()
  }

  if (!previewTrail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 mb-2">Loading Preview...</div>
          <div className="text-sm text-gray-600">Preparing your trail preview</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3 hover:bg-gray-100 -ml-2">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Edit
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 truncate">Trail Preview</h1>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            Preview
          </Badge>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${previewTrail.mapImage})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">{previewTrail.title}</h1>
            <div className="flex items-center mb-3">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={previewTrail.creator.avatar || "/placeholder.svg"} />
                <AvatarFallback>{previewTrail.creator.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">by @{previewTrail.creator.username}</span>
            </div>
            <div className="flex items-center text-sm space-x-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                {previewTrail.rating} (Preview)
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {previewTrail.stats.stops} Stops
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {previewTrail.stats.distance}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Approx. {previewTrail.stats.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between space-x-3">
            <Button disabled className="flex-1 bg-gray-300 text-gray-500 cursor-not-allowed">
              Preview Mode
            </Button>
            <Button variant="outline" size="icon" disabled>
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleEditTrail}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      {previewTrail.description && (
        <div className="bg-white border-b border-gray-200 p-4">
          <p className="text-gray-700 text-sm leading-relaxed">{previewTrail.description}</p>
        </div>
      )}

      {/* View Toggle */}
      <div className="bg-white border-b border-gray-200 p-4">
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "list" | "map")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list" className="flex items-center">
              <List className="h-4 w-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center">
              <Map className="h-4 w-4 mr-2" />
              Map View
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeView === "list" ? (
          <div className="space-y-4">
            {previewTrail.stops.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">No stops added yet</h3>
                  <p className="text-sm">Add some stops to your trail to see them in the preview</p>
                  <Button onClick={handleEditTrail} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                    Add Stops
                  </Button>
                </div>
              </Card>
            ) : (
              previewTrail.stops.map((stop, index) => {
                const isExpanded = expandedStops.has(stop.id)
                return (
                  <Card key={stop.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold bg-orange-500">
                            {index + 1}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{stop.name}</h3>
                              <div className="flex items-center text-sm text-gray-600 mt-1">
                                <div className="flex items-center mr-3">
                                  <span className="text-yellow-400 mr-1">★</span>
                                  {stop.rating} (Preview)
                                </div>
                                <Badge variant="secondary" className="text-xs mr-2">
                                  {stop.category}
                                </Badge>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {stop.estimatedTime}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{stop.address}</p>
                            </div>

                            {stop.images.length > 0 && (
                              <img
                                src={stop.images[0]?.url || "/placeholder.svg"}
                                alt={stop.name}
                                className="w-16 h-16 rounded-lg object-cover ml-4"
                              />
                            )}
                          </div>

                          <div className="bg-orange-50 border-l-4 border-orange-400 p-3 mb-3">
                            <p className="text-sm text-gray-700 italic">"{stop.creatorNote}"</p>
                          </div>

                          <div className="mb-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleStopExpansion(stop.id)}
                              className="p-0 h-auto text-orange-600 hover:text-orange-700"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="h-4 w-4 mr-1" />
                                  Hide Details
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4 mr-1" />
                                  Show Detailed Instructions
                                </>
                              )}
                            </Button>
                          </div>

                          {isExpanded && (
                            <div className="space-y-4 mb-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">What to do here:</h4>
                                <p className="text-sm text-gray-700 leading-relaxed">{stop.detailedInstructions}</p>
                              </div>

                              {stop.images.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-3">
                                    Gallery ({stop.images.length} photos)
                                  </h4>
                                  <div className="grid grid-cols-3 gap-2">
                                    {stop.images.map((image) => (
                                      <div key={image.id} className="relative group">
                                        <img
                                          src={image.url || "/placeholder.svg"}
                                          alt={image.caption}
                                          className="w-full h-20 object-cover rounded-lg"
                                        />
                                        <div className="absolute bottom-1 left-1 right-1">
                                          <div className="flex flex-wrap gap-1">
                                            {image.tags.slice(0, 2).map((tag) => (
                                              <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="text-xs px-1 py-0 bg-black bg-opacity-60 text-white"
                                              >
                                                {tag}
                                              </Badge>
                                            ))}
                                            {image.tags.length > 2 && (
                                              <Badge
                                                variant="secondary"
                                                className="text-xs px-1 py-0 bg-black bg-opacity-60 text-white"
                                              >
                                                +{image.tags.length - 2}
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <Button variant="outline" size="sm" disabled className="flex items-center bg-transparent">
                              <Navigation className="h-4 w-4 mr-2" />
                              Directions (Preview)
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="p-4">
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Map className="h-12 w-12 mx-auto mb-2" />
                  <p>Map view in preview mode</p>
                  <p className="text-sm">Interactive map will be available after publishing</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Preview Notice */}
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <Camera className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-orange-900">Preview Mode</h3>
              <p className="text-sm text-orange-700">
                This is how your trail will appear to others. Some features like directions and interactions are
                disabled in preview mode.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
