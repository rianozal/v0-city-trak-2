"use client"

import { MapPin, MessageSquare, Route, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function AddPage() {
  const router = useRouter()

  const addOptions = [
    {
      id: "place",
      title: "Add a New Place",
      description: "Share a hidden gem or favorite spot with the community",
      icon: MapPin,
      href: "/add-place",
      gradient: "from-orange-500 to-red-500",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "review",
      title: "Add a Review Post",
      description: "Write about your experience at a restaurant or place",
      icon: MessageSquare,
      href: "/restaurant/1/add-review", // TODO: Update with proper review flow
      gradient: "from-blue-500 to-purple-500",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "trail",
      title: "Add a Discovery Trail",
      description: "Create a curated journey connecting multiple places",
      icon: Route,
      href: "/add-trail",
      gradient: "from-green-500 to-teal-500",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ]

  const handleOptionClick = (href: string) => {
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-3 hover:bg-muted -ml-2">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-foreground font-serif">Add to City Trak</h1>
          <div className="w-16" /> {/* Spacer for center alignment */}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-0.5">
          <h2 className="text-2xl font-bold text-foreground font-serif mb-2">What would you like to add?</h2>
          <p className="text-muted-foreground text-balance">
            Help grow the City Trak community by sharing your discoveries
          </p>
        </div>

        {/* Add Options */}
        <div className="space-y-4 max-w-md mx-auto">
          {addOptions.map((option) => {
            const IconComponent = option.icon
            return (
              <Card
                key={option.id}
                className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer border-border hover:border-primary/20 active:scale-[0.98]"
                onClick={() => handleOptionClick(option.href)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${option.iconBg} flex-shrink-0`}>
                    <IconComponent className={`h-6 w-6 ${option.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground mb-1 font-serif">{option.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{option.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full opacity-60" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-8">
          <div className="bg-muted rounded-lg p-6 max-w-sm mx-auto">
            <div className="text-2xl mb-2">🏆</div>
            <h3 className="font-semibold text-card-foreground mb-1">Earn TrakPoints</h3>
            <p className="text-sm text-muted-foreground">
              Get rewarded for every contribution you make to the community
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
