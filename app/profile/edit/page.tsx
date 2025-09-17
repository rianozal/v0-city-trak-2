"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { ArrowLeft, Camera, Upload, X, LogOut, Bell, HelpCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { dummyUser } from "@/lib/dummy-data"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  bio: z.string().max(150, "Bio must be less than 150 characters").optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  location: z.string().max(100, "Location must be less than 100 characters").optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfileSettingsPage() {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string>(dummyUser.avatar || "/placeholder.svg")
  const [isUploading, setIsUploading] = useState(false)

  const [settings, setSettings] = useState({
    isPrivateAccount: false,
    showActivityStatus: true,
    pushNotifications: true,
  })

  const [showPrivateAccountModal, setShowPrivateAccountModal] = useState(false)
  const [showActivityStatusModal, setShowActivityStatusModal] = useState(false)

  const [formData, setFormData] = useState<ProfileFormValues>({
    name: dummyUser.name,
    username: dummyUser.username,
    bio: dummyUser.bio || "",
    email: "priya@example.com",
    phone: "+91 98765 43210",
    location: "Chennai, India",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormValues, string>>>({})

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      setTimeout(() => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setProfileImage(e.target?.result as string)
          setIsUploading(false)
        }
        reader.readAsDataURL(file)
      }, 1000)
    }
  }

  const removeImage = () => {
    setProfileImage("/placeholder.svg")
  }

  const handleInputChange = (field: keyof ProfileFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePrivateAccountToggle = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, isPrivateAccount: enabled }))
  }

  const handleActivityStatusToggle = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, showActivityStatus: enabled }))
  }

  const handlePushNotificationsToggle = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, pushNotifications: enabled }))
  }

  const validateForm = (): boolean => {
    const result = profileSchema.safeParse(formData)
    if (!result.success) {
      const newErrors: Partial<Record<keyof ProfileFormValues, string>> = {}
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ProfileFormValues
        newErrors[field] = error.message
      })
      setErrors(newErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleLogout = () => {
    console.log("[v0] User logged out")
    router.push("/login")
  }

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    console.log("[v0] Profile form submitted:", { ...formData, settings })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/profile")
  }

  const handleBackClick = () => {
    router.push("/profile")
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm -mx-4 -mt-6 mb-6">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3 hover:bg-gray-100 -ml-2">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
              <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">Profile & Settings</h1>
            </div>
            <Button type="submit" form="profile-form" className="bg-orange-500 hover:bg-orange-600">
              Save
            </Button>
          </div>
        </div>
      </div>

      <form id="profile-form" onSubmit={onSubmit} className="space-y-6">
        {/* Profile Picture Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              )}
              {profileImage !== "/placeholder.svg" && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Photo</h3>
              <p className="text-sm text-gray-600 mb-4">Upload a photo to help others recognize you</p>
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("profile-upload")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button type="button" variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Basic Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={errors.username ? "border-red-500" : ""}
              />
              <p className="text-sm text-gray-600 mt-1">This is your unique identifier on City Trak</p>
              {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell others about yourself..."
                className={`min-h-20 ${errors.bio ? "border-red-500" : ""}`}
                value={formData.bio || ""}
                onChange={(e) => handleInputChange("bio", e.target.value)}
              />
              <p className="text-sm text-gray-600 mt-1">{(formData.bio || "").length}/150 characters</p>
              {errors.bio && <p className="text-sm text-red-500 mt-1">{errors.bio}</p>}
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              <p className="text-sm text-gray-600 mt-1">Used for account recovery and notifications</p>
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                type="text"
                placeholder="Enter your city or location"
                value={formData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className={errors.location ? "border-red-500" : ""}
              />
              <p className="text-sm text-gray-600 mt-1">Help others discover local recommendations</p>
              {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Private Account</Label>
                <p className="text-sm text-gray-600">Only followers can see your posts and activity</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowPrivateAccountModal(true)}>
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Activity Status</Label>
                <p className="text-sm text-gray-600">Show when you're active on City Trak</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowActivityStatusModal(true)}>
                Configure
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-400" />
              <div>
                <Label className="text-sm font-medium">Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications about likes, comments, and follows</p>
              </div>
            </div>
            <Switch checked={settings.pushNotifications} onCheckedChange={handlePushNotificationsToggle} />
          </div>
        </Card>

        {/* Support */}
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Support</h3>
          <button
            type="button"
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900">Help & Support</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </Card>

        {/* Logout */}
        <Card className="p-6">
          <Button
            type="button"
            onClick={handleLogout}
            variant="destructive"
            className="w-full flex items-center gap-3 bg-red-500 hover:bg-red-600"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </Button>
        </Card>
      </form>

      <Dialog open={showPrivateAccountModal} onOpenChange={setShowPrivateAccountModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Private Account</DialogTitle>
            <DialogDescription>Control who can see your posts and activity on City Trak</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Make account private</Label>
                <p className="text-sm text-gray-600">
                  When your account is private, only people you approve can follow you and see your posts, reviews, and
                  trails.
                </p>
              </div>
              <Switch checked={settings.isPrivateAccount} onCheckedChange={handlePrivateAccountToggle} />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">What happens when your account is private:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• New followers need your approval</li>
                <li>• Only followers can see your posts and reviews</li>
                <li>• Your profile won't appear in search results</li>
                <li>• Your activity won't be visible to non-followers</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowPrivateAccountModal(false)}>
                Cancel
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowPrivateAccountModal(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showActivityStatusModal} onOpenChange={setShowActivityStatusModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Activity Status</DialogTitle>
            <DialogDescription>Control when others can see your activity on City Trak</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Show activity status</Label>
                <p className="text-sm text-gray-600">
                  Let others see when you're active on City Trak. This helps friends know when you're online.
                </p>
              </div>
              <Switch checked={settings.showActivityStatus} onCheckedChange={handleActivityStatusToggle} />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Activity status includes:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• When you're currently online</li>
                <li>• Last seen timestamp</li>
                <li>• Active status in messages</li>
                <li>• Real-time activity indicators</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowActivityStatusModal(false)}>
                Cancel
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowActivityStatusModal(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
