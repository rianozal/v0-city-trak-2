"use client"

import { ArrowLeft, Award, Target, Star, Trophy, Gift, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={handleBackClick} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">Dashboard & TrakPoints</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* TrakPoints Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">TrakPoints Overview</h2>
              <div className="text-sm text-gray-600">Level 5 - Silver Explorer</div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                  <div className="text-orange-500 text-sm font-bold">5</div>
                </div>
                <Award className="h-5 w-5" />
                <span className="font-bold text-lg">8,920</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">#1</div>
              <div className="text-sm text-gray-600">City Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">+250</div>
              <div className="text-sm text-gray-600">This Week</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress to Level 6 (Gold Explorer)</span>
              <span>8,920 / 10,000</span>
            </div>
            <Progress value={89} className="h-2" />
            <div className="text-xs text-gray-500">1,080 points to reach Gold Explorer</div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Review Posted</div>
                  <div className="text-sm text-gray-600">Murugan Idli Shop</div>
                </div>
              </div>
              <div className="text-green-600 font-semibold">+50 pts</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Place Added</div>
                  <div className="text-sm text-gray-600">Chettinad Palace</div>
                </div>
              </div>
              <div className="text-blue-600 font-semibold">+100 pts</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-500 p-2 rounded-full">
                  <Trophy className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">Trail Completed</div>
                  <div className="text-sm text-gray-600">Chennai Food Trail</div>
                </div>
              </div>
              <div className="text-purple-600 font-semibold">+200 pts</div>
            </div>
          </div>
        </Card>

        {/* Statistics */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-500">47</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">12</div>
              <div className="text-sm text-gray-600">Places Added</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-500">8</div>
              <div className="text-sm text-gray-600">Trails Created</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-500">1.2K</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-xs font-medium">Top Reviewer</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-xs font-medium">Community Builder</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Gift className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <div className="text-xs font-medium">Early Adopter</div>
            </div>
          </div>
        </Card>

        {/* Leaderboard */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">City Leaderboard</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <div className="font-medium">You</div>
                  <div className="text-sm text-gray-600">@priya_foodie</div>
                </div>
              </div>
              <div className="font-semibold text-yellow-600">8,920 pts</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <div className="font-medium">Ravi Kumar</div>
                  <div className="text-sm text-gray-600">@ravi_foodie</div>
                </div>
              </div>
              <div className="font-semibold text-gray-600">8,750 pts</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <div className="font-medium">Sneha Reddy</div>
                  <div className="text-sm text-gray-600">@sneha_foodie</div>
                </div>
              </div>
              <div className="font-semibold text-orange-600">8,200 pts</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
