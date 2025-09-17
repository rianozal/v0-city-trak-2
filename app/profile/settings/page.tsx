"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, LogOut, User, Bell, Shield, HelpCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [privateProfile, setPrivateProfile] = useState(false)

  const handleLogout = () => {
    console.log("[v0] User logged out")
    // In real app, clear auth tokens and redirect
    router.push("/login")
  }

  const handleBackClick = () => {
    router.push("/profile")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={handleBackClick} className="p-2 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Account Section */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">Account</h2>
            </div>

            <div className="divide-y divide-gray-100">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">Edit Profile</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">Private Profile</span>
                </div>
                <Switch checked={privateProfile} onCheckedChange={setPrivateProfile} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">Push Notifications</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-900">Support</h2>
            </div>

            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">Help & Support</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card>
          <CardContent className="p-4">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
