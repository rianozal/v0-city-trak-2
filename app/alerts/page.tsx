"use client"

import {
  ArrowLeft,
  TrendingUp,
  Award,
  MessageCircle,
  Bell,
  UserPlus,
  Heart,
  MapPin,
  Star,
  Users,
  Calendar,
} from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function AlertsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromSource = searchParams.get("from") || "/"

  const handleBackClick = () => {
    if (fromSource === "/") {
      router.push("/")
    } else {
      router.push(fromSource)
    }
  }

  const notifications = [
    {
      id: "1",
      type: "trending",
      title: "New #1 Restaurant!",
      message: "Dakshin has moved to #1 in Fine Dining this week",
      time: "2 hours ago",
      unread: true,
      actionUrl: "/restaurant/2?from=alerts",
      actionType: "restaurant",
    },
    {
      id: "2",
      type: "points",
      title: "TrakPoints Earned",
      message: "You earned 25 points for your review of Murugan Idli Shop",
      time: "1 day ago",
      unread: true,
      actionUrl: "/restaurant/1?from=alerts&scrollTo=reviews",
      actionType: "review",
    },
    {
      id: "3",
      type: "social",
      title: "New Follower",
      message: "chennai_foodie started following you",
      time: "2 days ago",
      unread: false,
      actionUrl: "/profile?userId=6&from=alerts",
      actionType: "profile",
    },
    {
      id: "4",
      type: "trending",
      title: "Trail Trending",
      message: "Your Chennai Food Trail is now trending in the top 5",
      time: "3 days ago",
      unread: false,
      actionUrl: "/trail/1?from=alerts",
      actionType: "trail",
    },
    {
      id: "5",
      type: "follow_request",
      title: "Follow Request",
      message: "food_explorer_chennai wants to follow you",
      time: "4 hours ago",
      unread: true,
      actionUrl: "/profile?userId=7&from=alerts&action=follow_request",
      actionType: "follow_request",
    },
    {
      id: "6",
      type: "like",
      title: "Review Liked",
      message: "5 people liked your review of Saravana Bhavan",
      time: "6 hours ago",
      unread: false,
      actionUrl: "/restaurant/3?from=alerts&scrollTo=reviews",
      actionType: "review",
    },
    {
      id: "7",
      type: "place_added",
      title: "Place Added",
      message: "Your suggestion 'Adyar Ananda Bhavan' has been approved and added",
      time: "1 day ago",
      unread: false,
      actionUrl: "/restaurant/4?from=alerts",
      actionType: "restaurant",
    },
    {
      id: "8",
      type: "trail_like",
      title: "Trail Liked",
      message: "12 people liked your 'Street Food Paradise' trail",
      time: "2 days ago",
      unread: false,
      actionUrl: "/trail/2?from=alerts",
      actionType: "trail",
    },
    {
      id: "9",
      type: "friend_activity",
      title: "Friend Activity",
      message: "chennai_foodie visited 3 new places this week",
      time: "3 days ago",
      unread: false,
      actionUrl: "/profile?userId=6&from=alerts&tab=activity",
      actionType: "profile",
    },
    {
      id: "10",
      type: "event",
      title: "Food Festival",
      message: "Chennai Food Festival starts tomorrow near T. Nagar",
      time: "5 days ago",
      unread: false,
      actionUrl: "/events/1?from=alerts",
      actionType: "event",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "trending":
        return <TrendingUp className="h-5 w-5 text-orange-500" />
      case "points":
        return <Award className="h-5 w-5 text-green-500" />
      case "social":
        return <MessageCircle className="h-5 w-5 text-blue-500" />
      case "follow_request":
        return <UserPlus className="h-5 w-5 text-purple-500" />
      case "like":
        return <Heart className="h-5 w-5 text-red-500" />
      case "place_added":
        return <MapPin className="h-5 w-5 text-green-600" />
      case "trail_like":
        return <Star className="h-5 w-5 text-yellow-500" />
      case "friend_activity":
        return <Users className="h-5 w-5 text-indigo-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-pink-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleBackClick} className="p-2 hover:bg-gray-100">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
          </div>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            {notifications.filter((n) => n.unread).length} new
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {notifications.map((notification) => (
          <Link key={notification.id} href={notification.actionUrl}>
            <Card
              className={`cursor-pointer hover:shadow-md transition-all duration-200 my-3 leading-3 py-0 ${
                notification.unread ? "bg-orange-50 border-orange-200" : "bg-white"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{notification.title}</h3>
                      <span className="text-sm text-gray-500 ml-2">{notification.time}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{notification.message}</p>
                  </div>
                  {notification.unread && <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 mt-8">
          <CardHeader className="pb-3">
            <h3 className="font-semibold text-orange-800">Enhanced Notifications (Phase 2)</h3>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="text-sm text-orange-700 space-y-2">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Real-time push notifications</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Personalized restaurant recommendations</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Friend activity updates</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span>Business owner responses to your reviews</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
