"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  MapPin,
  Search,
  Camera,
  Clock,
  Phone,
  Globe,
  Star,
  ArrowLeft,
  Check,
  X,
  Upload,
  Trophy,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useCity } from "@/components/city-context"
import { categoryStructure } from "@/lib/dummy-data"

export default function AddPlacePage() {
  const router = useRouter()
  const { selectedCity } = useCity()
  const [step, setStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lng: number
    address: string
    name?: string
  } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategories: [] as string[],
    customSubcategory: "",
    tags: [] as string[],
    phone: "",
    website: "",
    googleMapsUrl: "",
    photos: [] as File[],
    hours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "18:00", closed: false },
      sunday: { open: "09:00", close: "18:00", closed: true },
    },
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({})

  const extractLatLngFromUrl = (url: string) => {
    const patterns = [
      /@(-?\d+\.?\d*),(-?\d+\.?\d*)/,
      /!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/,
      /ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) {
        return {
          lat: Number.parseFloat(match[1]),
          lng: Number.parseFloat(match[2]),
        }
      }
    }
    return null
  }

  const handleGoogleMapsUrl = (url: string) => {
    const coords = extractLatLngFromUrl(url)
    if (coords) {
      setSelectedLocation({
        ...coords,
        address: "Location from Google Maps",
        name: formData.name || "Imported Location",
      })
      setFormData((prev) => ({ ...prev, googleMapsUrl: url }))
    }
  }

  const searchSuggestions = [
    `${formData.name || "New Restaurant"} - ${selectedCity.name}`,
    `${selectedCity.name} Downtown`,
    `${selectedCity.name} City Center`,
    `Near ${selectedCity.name} Mall`,
  ]

  const getSubcategories = () => {
    const category = categoryStructure.find((cat) => cat.name === formData.category)
    return category?.subcategories || []
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }))
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const toggleSubcategory = (subcategoryName: string) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.includes(subcategoryName)
        ? prev.subcategories.filter((s) => s !== subcategoryName)
        : [...prev.subcategories, subcategoryName],
    }))
  }

  const handleOtherSubcategory = () => {
    const isOtherSelected = formData.subcategories.includes("Other")
    if (isOtherSelected) {
      setFormData((prev) => ({
        ...prev,
        subcategories: prev.subcategories.filter((s) => s !== "Other"),
        customSubcategory: "",
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        subcategories: [...prev.subcategories, "Other"],
      }))
    }
  }

  const updateHours = (day: string, field: "open" | "close" | "closed", value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day as keyof typeof prev.hours],
          [field]: value,
        },
      },
    }))
  }

  const validateStep1 = () => {
    return selectedLocation !== null
  }

  const validateStep2 = () => {
    const errors: Record<string, boolean> = {}
    if (!formData.name.trim()) errors.name = true
    if (!formData.category) errors.category = true

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (!validateStep2()) return

    setTimeout(() => {
      setStep(3)
    }, 1000)
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const categoryDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCategorySelect = (category: (typeof categoryStructure)[0]) => {
    setFormData((prev) => ({ ...prev, category: category.name, subcategories: [] }))
    setIsCategoryDropdownOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {step <= 2 && (
        <div
          className="promotional-banner-bg text-white"
          style={{
            background: "#f97316 !important",
            backgroundColor: "#f97316 !important",
          }}
        >
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold promotional-banner-title" style={{ color: "#ffffff !important" }}>
                    Help grow City Trak!
                  </h3>
                  <p className="text-sm promotional-banner-text" style={{ color: "#ffffff !important" }}>
                    Add a new place and earn 100 TrakPoints
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold promotional-banner-points" style={{ color: "#ffffff !important" }}>
                  +100
                </div>
                <div className="text-xs promotional-banner-label" style={{ color: "#ffffff !important" }}>
                  TrakPoints
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (step === 1 ? router.back() : setStep(step - 1))}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-gray-600">Step {step} of 2</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 font-serif mb-2">Set Location</h1>
            <p className="text-gray-600">Find the exact location of the place</p>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for an address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                {searchSuggestions
                  .filter((suggestion) => suggestion.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        setSearchQuery(suggestion)
                        setSelectedLocation({
                          lat: 12.9716 + Math.random() * 0.1,
                          lng: 77.5946 + Math.random() * 0.1,
                          address: suggestion,
                          name: suggestion.split(" - ")[0],
                        })
                      }}
                    >
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                        <span>{suggestion}</span>
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>

          <Card className="mb-4 h-64 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Interactive Map</p>
              <p className="text-sm text-gray-500">Drag pin to adjust location</p>
            </div>
            {selectedLocation && (
              <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                <span className="text-sm font-medium text-green-600">📍 Location Set</span>
              </div>
            )}
          </Card>

          {selectedLocation && (
            <Card className="p-4 mb-6 bg-green-50 border-green-200">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-green-800">Location Confirmed</p>
                  <p className="text-sm text-green-700">{selectedLocation.address}</p>
                  <p className="text-xs text-green-600 mt-1">
                    Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Button
            onClick={() => setStep(2)}
            disabled={!validateStep1()}
            className="w-full confirm-location-btn"
            style={{
              backgroundColor: "#f97316 !important",
              color: "#ffffff !important",
            }}
          >
            Confirm Location
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 font-serif mb-2">Add Details</h1>
            <p className="text-gray-600">Tell us about this place</p>
          </div>

          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Place Name *</label>
                <Input
                  placeholder="Enter the official name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={validationErrors.name ? "border-red-300" : ""}
                />
                {validationErrors.name && <p className="text-sm text-red-600 mt-1">Place name is required</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <div className="relative" ref={categoryDropdownRef}>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-between text-left font-normal",
                      !formData.category && "text-muted-foreground",
                      validationErrors.category && "border-red-300",
                    )}
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  >
                    {formData.category || "Select a category"}
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", isCategoryDropdownOpen && "rotate-180")}
                    />
                  </Button>

                  {isCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="max-h-60 overflow-y-auto">
                        {categoryStructure.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategorySelect(category)}
                            className={cn(
                              "w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between",
                              formData.category === category.name && "bg-orange-50 text-orange-600",
                            )}
                          >
                            <span>{category.name}</span>
                            {formData.category === category.name && (
                              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {validationErrors.category && <p className="text-sm text-red-600 mt-1">Category is required</p>}
              </div>

              {formData.category && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sub-Categories (Optional - Select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {getSubcategories().map((subcategory) => (
                      <button
                        key={subcategory.id}
                        type="button"
                        onClick={() => toggleSubcategory(subcategory.name)}
                        className={`p-2 text-sm border rounded-lg text-left transition-colors ${
                          formData.subcategories.includes(subcategory.name)
                            ? "bg-orange-50 border-orange-300 text-orange-800"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {subcategory.name}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleOtherSubcategory}
                      className={`p-2 text-sm border rounded-lg text-left transition-colors ${
                        formData.subcategories.includes("Other")
                          ? "bg-orange-50 border-orange-300 text-orange-800"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Other
                    </button>
                  </div>

                  {formData.subcategories.includes("Other") && (
                    <div className="mt-3">
                      <Input
                        placeholder="Please specify the subcategory..."
                        value={formData.customSubcategory}
                        onChange={(e) => setFormData((prev) => ({ ...prev, customSubcategory: e.target.value }))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Help us improve by suggesting new subcategories for future users
                      </p>
                    </div>
                  )}

                  {formData.subcategories.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {formData.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                        >
                          {sub === "Other" && formData.customSubcategory ? `Other: ${formData.customSubcategory}` : sub}
                          <button
                            type="button"
                            onClick={() => (sub === "Other" ? handleOtherSubcategory() : toggleSubcategory(sub))}
                            className="ml-1 hover:text-orange-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t pt-6 space-y-4">
              <h3 className="font-medium text-gray-900">Optional Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number
                  </label>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="inline h-4 w-4 mr-1" />
                    Website
                  </label>
                  <Input
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Google Maps URL (Optional)</label>
                <Input
                  placeholder="https://maps.google.com/..."
                  value={formData.googleMapsUrl}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, googleMapsUrl: e.target.value }))
                    if (e.target.value) {
                      handleGoogleMapsUrl(e.target.value)
                    }
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">Paste a Google Maps link to update location coordinates</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Camera className="inline h-4 w-4 mr-1" />
                  Photos
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">A photo helps others discover your new spot!</p>
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Photos
                  </Button>
                </div>
                {formData.photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Hours of Operation
                </label>
                <Card className="p-4 space-y-3">
                  {days.map((day) => (
                    <div key={day} className="flex items-center space-x-3">
                      <div className="w-20 text-sm font-medium capitalize">{day}</div>
                      <div className="flex items-center space-x-2 flex-1">
                        <input
                          type="checkbox"
                          checked={!formData.hours[day as keyof typeof formData.hours].closed}
                          onChange={(e) => updateHours(day, "closed", !e.target.checked)}
                          className="rounded"
                        />
                        {!formData.hours[day as keyof typeof formData.hours].closed ? (
                          <>
                            <Input
                              type="time"
                              value={formData.hours[day as keyof typeof formData.hours].open}
                              onChange={(e) => updateHours(day, "open", e.target.value)}
                              className="w-24"
                            />
                            <span className="text-gray-500">to</span>
                            <Input
                              type="time"
                              value={formData.hours[day as keyof typeof formData.hours].close}
                              onChange={(e) => updateHours(day, "close", e.target.value)}
                              className="w-24"
                            />
                          </>
                        ) : (
                          <span className="text-gray-500 text-sm">Closed</span>
                        )}
                      </div>
                    </div>
                  ))}
                </Card>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full submit-place-btn"
              style={{
                backgroundColor: "#f97316 !important",
                color: "#ffffff !important",
              }}
            >
              Submit Place
            </Button>
          </Card>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-green-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">Success! 🥳</h1>
              <p className="text-lg text-gray-600 mb-4">
                You've added <span className="font-semibold">{formData.name}</span> to City Trak.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-orange-500 fill-current mr-2" />
                <span className="text-xl font-bold text-orange-800">+100 TrakPoints</span>
              </div>
              <p className="text-orange-700">have been added to your wallet!</p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => router.push("/")}
                className="w-full home-btn"
                style={{
                  backgroundColor: "#f97316 !important",
                  color: "#ffffff !important",
                }}
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setStep(1)
                  setFormData({
                    name: "",
                    category: "",
                    subcategories: [],
                    customSubcategory: "",
                    tags: [],
                    phone: "",
                    website: "",
                    googleMapsUrl: "",
                    photos: [],
                    hours: {
                      monday: { open: "09:00", close: "18:00", closed: false },
                      tuesday: { open: "09:00", close: "18:00", closed: false },
                      wednesday: { open: "09:00", close: "18:00", closed: false },
                      thursday: { open: "09:00", close: "18:00", closed: false },
                      friday: { open: "09:00", close: "18:00", closed: false },
                      saturday: { open: "09:00", close: "18:00", closed: false },
                      sunday: { open: "09:00", close: "18:00", closed: true },
                    },
                  })
                  setSelectedLocation(null)
                  setSearchQuery("")
                }}
                className="w-full"
              >
                Add Another Place
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
