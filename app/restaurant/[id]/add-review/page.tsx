"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Star, Camera, Search, Plus, Minus, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { dummyRestaurants, categoryStructure } from "@/lib/dummy-data"
import { notFound } from "next/navigation"

interface AddReviewPageProps {
  params: { id: string }
}

export default function AddReviewPage({ params }: AddReviewPageProps) {
  const router = useRouter()
  const restaurant = dummyRestaurants.find((r) => r.id === params.id)

  // Step management
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Step 1: Core Review
  const [overallRating, setOverallRating] = useState(0)
  const [attributeRatings, setAttributeRatings] = useState({
    food: 0,
    ambiance: 0,
    service: 0,
  })
  const [reviewText, setReviewText] = useState("")
  const [photos, setPhotos] = useState<File[]>([])

  // Step 2: Sub-Category Deep Dive
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([])
  const [subCategoryDetails, setSubCategoryDetails] = useState<{
    [key: string]: { rating: number; photos: File[]; notes: string }
  }>({})
  const [activeModal, setActiveModal] = useState<string | null>(null)

  // Step 3: Specific Items
  const [searchQuery, setSearchQuery] = useState("")
  const [ratedItems, setRatedItems] = useState<{ [key: string]: { rating: number; photos: File[]; notes: string } }>({})

  // Step 4: Cost Info
  const [groupSize, setGroupSize] = useState(2)
  const [totalBill, setTotalBill] = useState("")

  // Points calculation
  const [earnedPoints, setEarnedPoints] = useState(0)

  if (!restaurant) {
    notFound()
  }

  // Get restaurant category for dynamic attributes
  const restaurantCategory = categoryStructure.find(
    (cat) => cat.name.toLowerCase() === restaurant.category.toLowerCase(),
  )

  const availableSubCategories = restaurantCategory?.subcategories || []
  const availableItems = restaurantCategory?.specificItems || []

  // Calculate points earned
  useEffect(() => {
    let points = 0
    if (overallRating > 0) points += 10 // Base review
    if (attributeRatings.food > 0) points += 10
    if (attributeRatings.ambiance > 0) points += 10
    if (attributeRatings.service > 0) points += 10
    if (reviewText.length > 0) points += 10
    if (photos.length > 0) points += 10

    points += selectedSubCategories.length * 20 // Step 2
    points += Object.keys(ratedItems).length * 15 // Step 3
    if (totalBill && groupSize) points += 25 // Step 4

    setEarnedPoints(points)
  }, [overallRating, attributeRatings, reviewText, photos, selectedSubCategories, ratedItems, totalBill, groupSize])

  const handlePhotoUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "main" | "subcategory" | "item",
    key?: string,
  ) => {
    const files = Array.from(e.target.files || [])
    if (type === "main") {
      setPhotos((prev) => [...prev, ...files])
    } else if (type === "subcategory" && key) {
      setSubCategoryDetails((prev) => ({
        ...prev,
        [key]: { ...prev[key], photos: [...(prev[key]?.photos || []), ...files] },
      }))
    } else if (type === "item" && key) {
      setRatedItems((prev) => ({
        ...prev,
        [key]: { ...prev[key], photos: [...(prev[key]?.photos || []), ...files] },
      }))
    }
  }

  const renderStarRating = (rating: number, onRate: (rating: number) => void, size: "sm" | "lg" = "lg") => {
    const starSize = size === "lg" ? "h-8 w-8" : "h-5 w-5"
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => onRate(star)} className="transition-colors">
            <Star className={`${starSize} ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
    )
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How was {restaurant.name}?</h2>
        <p className="text-gray-600">Your overall experience</p>
      </div>

      {/* Overall Rating */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">{renderStarRating(overallRating, setOverallRating)}</div>
        {overallRating > 0 && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-orange-700">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Awesome! Add these details to earn +10 TrakPoints for each.</span>
              </div>
            </div>

            {/* Attribute Ratings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Food</span>
                {renderStarRating(attributeRatings.food, (rating) =>
                  setAttributeRatings((prev) => ({ ...prev, food: rating })),
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Ambiance</span>
                {renderStarRating(attributeRatings.ambiance, (rating) =>
                  setAttributeRatings((prev) => ({ ...prev, ambiance: rating })),
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Service</span>
                {renderStarRating(attributeRatings.service, (rating) =>
                  setAttributeRatings((prev) => ({ ...prev, service: rating })),
                )}
              </div>
            </div>

            {/* Review Text */}
            <div className="mt-6">
              <Textarea
                placeholder="Share more about your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Photo Upload */}
            <div className="mt-4">
              <label className="block">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e, "main")}
                  className="hidden"
                />
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <span>
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photos ({photos.length})
                  </span>
                </Button>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What did you go for today?</h2>
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-700 font-medium">Tell us more to earn +20 TrakPoints!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableSubCategories.map((subcat) => (
          <Card
            key={subcat.id}
            className={`p-4 cursor-pointer transition-all ${
              selectedSubCategories.includes(subcat.id) ? "border-orange-500 bg-orange-50" : "hover:border-gray-300"
            }`}
            onClick={() => {
              if (selectedSubCategories.includes(subcat.id)) {
                setSelectedSubCategories((prev) => prev.filter((id) => id !== subcat.id))
              } else {
                setSelectedSubCategories((prev) => [...prev, subcat.id])
              }
            }}
          >
            <h3 className="font-medium">{subcat.name}</h3>
            {selectedSubCategories.includes(subcat.id) && (
              <Button
                size="sm"
                variant="outline"
                className="mt-2 bg-transparent"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveModal(subcat.id)
                }}
              >
                Add Details
              </Button>
            )}
            {subCategoryDetails[subcat.id] && <Badge className="mt-2 bg-green-100 text-green-700">Details Added</Badge>}
          </Card>
        ))}
      </div>

      {/* Modal for subcategory details */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Your {availableSubCategories.find((s) => s.id === activeModal)?.name} Experience
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                {renderStarRating(subCategoryDetails[activeModal]?.rating || 0, (rating) =>
                  setSubCategoryDetails((prev) => ({
                    ...prev,
                    [activeModal]: { ...prev[activeModal], rating },
                  })),
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Notes</label>
                <Textarea
                  placeholder="Tell us about this experience..."
                  value={subCategoryDetails[activeModal]?.notes || ""}
                  onChange={(e) =>
                    setSubCategoryDetails((prev) => ({
                      ...prev,
                      [activeModal]: { ...prev[activeModal], notes: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <label className="block">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e, "subcategory", activeModal)}
                    className="hidden"
                  />
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <span>
                      <Camera className="h-4 w-4 mr-2" />
                      Add Photos ({subCategoryDetails[activeModal]?.photos?.length || 0})
                    </span>
                  </Button>
                </label>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setActiveModal(null)} className="flex-1">
                  Save
                </Button>
                <Button variant="outline" onClick={() => setActiveModal(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )

  const renderStep3 = () => {
    const filteredItems = availableItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Anything specific worth mentioning?</h2>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
            <p className="text-purple-700 font-medium">Rate items to earn +15 TrakPoints each!</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for a dish or item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredItems.slice(0, 8).map((item) => (
            <Button
              key={item.id}
              variant={ratedItems[item.id] ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (!ratedItems[item.id]) {
                  setRatedItems((prev) => ({
                    ...prev,
                    [item.id]: { rating: 0, photos: [], notes: "" },
                  }))
                  setActiveModal(item.id)
                }
              }}
              className="text-sm"
            >
              {item.name}
              {ratedItems[item.id] && <Badge className="ml-2 bg-green-100 text-green-700">✓</Badge>}
            </Button>
          ))}
        </div>

        {/* Item rating modal */}
        {activeModal && availableItems.find((i) => i.id === activeModal) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6">
              <h3 className="text-lg font-semibold mb-4">
                Rate: {availableItems.find((i) => i.id === activeModal)?.name}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  {renderStarRating(ratedItems[activeModal]?.rating || 0, (rating) =>
                    setRatedItems((prev) => ({
                      ...prev,
                      [activeModal]: { ...prev[activeModal], rating },
                    })),
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <Textarea
                    placeholder="What did you think of this item?"
                    value={ratedItems[activeModal]?.notes || ""}
                    onChange={(e) =>
                      setRatedItems((prev) => ({
                        ...prev,
                        [activeModal]: { ...prev[activeModal], notes: e.target.value },
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="block">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(e, "item", activeModal)}
                      className="hidden"
                    />
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <span>
                        <Camera className="h-4 w-4 mr-2" />
                        Add Photos ({ratedItems[activeModal]?.photos?.length || 0})
                      </span>
                    </Button>
                  </label>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={() => setActiveModal(null)} className="flex-1">
                    Save
                  </Button>
                  <Button variant="outline" onClick={() => setActiveModal(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    )
  }

  const renderStep4 = () => {
    const perPersonCost = totalBill && groupSize ? Math.round(Number.parseFloat(totalBill) / groupSize) : 0

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">One last detail?</h2>
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-700 font-medium">Completely optional, but you'll get +25 TrakPoints!</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">How many people were in your group?</label>
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setGroupSize(Math.max(1, groupSize - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl font-semibold w-12 text-center">{groupSize}</span>
              <Button variant="outline" size="sm" onClick={() => setGroupSize(groupSize + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">What was the approximate total bill?</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
              <Input
                type="number"
                placeholder="0"
                value={totalBill}
                onChange={(e) => setTotalBill(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {perPersonCost > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <p className="text-orange-700 font-semibold text-lg">That's about ₹{perPersonCost} per person!</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderSuccessScreen = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
          <Trophy className="h-12 w-12 text-white" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Submitted!</h2>
        <p className="text-gray-600">Thank you for contributing to the City Trak community</p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <h3 className="text-xl font-semibold text-orange-800 mb-4">Points Earned Breakdown</h3>
        <div className="space-y-2 text-left">
          {overallRating > 0 && (
            <div className="flex justify-between">
              <span>Overall rating</span>
              <span>+10</span>
            </div>
          )}
          {attributeRatings.food > 0 && (
            <div className="flex justify-between">
              <span>Food rating</span>
              <span>+10</span>
            </div>
          )}
          {attributeRatings.ambiance > 0 && (
            <div className="flex justify-between">
              <span>Ambiance rating</span>
              <span>+10</span>
            </div>
          )}
          {attributeRatings.service > 0 && (
            <div className="flex justify-between">
              <span>Service rating</span>
              <span>+10</span>
            </div>
          )}
          {reviewText.length > 0 && (
            <div className="flex justify-between">
              <span>Written review</span>
              <span>+10</span>
            </div>
          )}
          {photos.length > 0 && (
            <div className="flex justify-between">
              <span>Photos added</span>
              <span>+10</span>
            </div>
          )}
          {selectedSubCategories.length > 0 && (
            <div className="flex justify-between">
              <span>Sub-category details ({selectedSubCategories.length})</span>
              <span>+{selectedSubCategories.length * 20}</span>
            </div>
          )}
          {Object.keys(ratedItems).length > 0 && (
            <div className="flex justify-between">
              <span>Item ratings ({Object.keys(ratedItems).length})</span>
              <span>+{Object.keys(ratedItems).length * 15}</span>
            </div>
          )}
          {totalBill && groupSize && (
            <div className="flex justify-between">
              <span>Cost information</span>
              <span>+25</span>
            </div>
          )}
          <hr className="my-2" />
          <div className="flex justify-between font-bold text-lg text-orange-600">
            <span>Total TrakPoints</span>
            <span>+{earnedPoints}</span>
          </div>
        </div>
      </Card>

      <Button onClick={() => router.push(`/restaurant/${params.id}`)} className="bg-orange-500 hover:bg-orange-600">
        Back to {restaurant.name}
      </Button>
    </div>
  )

  const canProceedToNext = () => {
    if (currentStep === 1) return overallRating > 0
    return true
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCompletedSteps((prev) => [...prev, currentStep])
      setCurrentStep(currentStep + 1)
    } else {
      // Submit review
      setCurrentStep(5) // Success screen
    }
  }

  const handleSkip = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(5) // Success screen
    }
  }

  if (currentStep === 5) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto px-4 py-8">{renderSuccessScreen()}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-sm text-gray-500">Step {currentStep} of 4</div>
        <div className="text-sm font-medium text-orange-600">+{earnedPoints} Points</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1">
        <div
          className="bg-orange-500 h-1 transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          {currentStep > 1 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              Previous
            </Button>
          )}
          <div className="flex space-x-2 ml-auto">
            {currentStep > 1 && currentStep < 4 && (
              <Button variant="ghost" onClick={handleSkip}>
                Skip this step
              </Button>
            )}
            <Button onClick={handleNext} disabled={!canProceedToNext()} className="bg-orange-500 hover:bg-orange-600">
              {currentStep === 4 ? "Submit Review & Earn Points" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
