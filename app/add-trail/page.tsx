"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Plus,
  X,
  Camera,
  Save,
  Eye,
  Trash2,
  Upload,
  Search,
  Phone,
  Globe,
  Check,
  Star,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TrailStopImage {
  id: string
  url: string
  caption: string
  tags: string[]
  type: "subcategory" | "item" // Added image type for database categorization
  file?: File // Added file property for actual file uploads
}

interface TrailStop {
  id: string
  name: string
  address: string
  category: string
  estimatedTime: string
  estimatedTimeUnit: string // Added time unit for stops
  detailedInstructions: string
  images: TrailStopImage[]
}

interface TrailForm {
  title: string
  description: string
  coverImage: string
  coverImageFile?: File // Added cover image file property
  category: string
  difficulty: string
  estimatedDuration: string
  estimatedDurationUnit: string
  estimatedDistance: string
  stops: TrailStop[]
}

const mockPlaces = [
  { id: "1", name: "Murugan Idli Shop", address: "T. Nagar, Chennai", category: "Food & Dining" },
  { id: "2", name: "Adyar Ananda Bhavan", address: "Adyar, Chennai", category: "Food & Dining" },
  { id: "3", name: "Dakshin Restaurant", address: "ITC Grand Chola, Chennai", category: "Food & Dining" },
  { id: "4", name: "Phoenix MarketCity", address: "Velachery, Chennai", category: "Shopping" },
  { id: "5", name: "Express Avenue", address: "Royapettah, Chennai", category: "Shopping" },
  { id: "6", name: "Kapaleeshwarar Temple", address: "Mylapore, Chennai", category: "Culture & Heritage" },
  { id: "7", name: "Marina Beach", address: "Marina, Chennai", category: "Nature & Parks" },
  { id: "8", name: "Elliot's Beach", address: "Besant Nagar, Chennai", category: "Nature & Parks" },
]

const mockSubcategories = [
  { id: "1", name: "Dosa", type: "item", placeId: "1" },
  { id: "2", name: "Idli", type: "item", placeId: "1" },
  { id: "3", name: "Sambar", type: "item", placeId: "1" },
  { id: "4", name: "Ambiance", type: "subcategory", placeId: "1" },
  { id: "5", name: "Interior", type: "subcategory", placeId: "1" },
  { id: "6", name: "Sweets", type: "item", placeId: "2" },
  { id: "7", name: "South Indian Breakfast", type: "subcategory", placeId: "2" },
  { id: "8", name: "Fine Dining", type: "subcategory", placeId: "3" },
  { id: "9", name: "Buffet", type: "item", placeId: "3" },
]

const categories = [
  "Food & Dining",
  "Shopping",
  "Culture & Heritage",
  "Nature & Parks",
  "Entertainment",
  "Architecture",
  "Local Markets",
  "Street Art",
  "Nightlife",
  "Family Friendly",
]

const difficulties = ["Easy", "Moderate", "Challenging"]

const categoryStructure = [
  {
    name: "Food & Dining",
    subcategories: [
      { id: "1", name: "Dosa" },
      { id: "2", name: "Idli" },
      { id: "3", name: "Sambar" },
      { id: "4", name: "Ambiance" },
      { id: "5", name: "Interior" },
    ],
  },
  {
    name: "Shopping",
    subcategories: [
      { id: "6", name: "Clothing" },
      { id: "7", name: "Electronics" },
    ],
  },
  {
    name: "Culture & Heritage",
    subcategories: [
      { id: "8", name: "Temples" },
      { id: "9", name: "Museums" },
    ],
  },
  {
    name: "Nature & Parks",
    subcategories: [
      { id: "10", name: "Beaches" },
      { id: "11", name: "Parks" },
    ],
  },
]

export default function AddTrailPage() {
  const router = useRouter()
  const [expandedStops, setExpandedStops] = useState<Set<string>>(new Set())
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [placeSearchQuery, setPlaceSearchQuery] = useState<{ [key: string]: string }>({})
  const [showPlaceDropdown, setShowPlaceDropdown] = useState<{ [key: string]: boolean }>({})
  const [showAddNewPlace, setShowAddNewPlace] = useState<{ [key: string]: boolean }>({})
  const [subcategorySearchQuery, setSubcategorySearchQuery] = useState<{ [key: string]: string }>({})
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState<{ [key: string]: boolean }>({})
  const [showAddNewSubcategory, setShowAddNewSubcategory] = useState<{ [key: string]: boolean }>({})
  const [newSubcategoryForm, setNewSubcategoryForm] = useState<{
    [key: string]: { name: string; type: "subcategory" | "item" }
  }>({})
  const [showAddPlaceModal, setShowAddPlaceModal] = useState<{ [key: string]: boolean }>({})
  const [addPlaceStep, setAddPlaceStep] = useState<{ [key: string]: number }>({})
  const [addPlaceForm, setAddPlaceForm] = useState<{
    [key: string]: {
      // Step 1: Location
      searchQuery: string
      selectedLocation: {
        lat: number
        lng: number
        address: string
        name?: string
      } | null
      // Step 2: Details
      name: string
      category: string
      subcategories: string[]
      customSubcategory: string
      phone: string
      website: string
      googleMapsUrl: string
      photos: File[]
      hours: {
        monday: { open: string; close: string; closed: boolean }
        tuesday: { open: string; close: string; closed: boolean }
        wednesday: { open: string; close: string; closed: boolean }
        thursday: { open: string; close: string; closed: boolean }
        friday: { open: string; close: string; closed: boolean }
        saturday: { open: string; close: string; closed: boolean }
        sunday: { open: string; close: string; closed: boolean }
      }
    }
  }>({})
  const [addPlaceValidationErrors, setAddPlaceValidationErrors] = useState<{ [key: string]: Record<string, boolean> }>(
    {},
  )
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  const placeDropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const subcategoryDropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const [trailForm, setTrailForm] = useState<TrailForm>({
    title: "",
    description: "",
    coverImage: "",
    category: "",
    difficulty: "",
    estimatedDuration: "",
    estimatedDurationUnit: "hours",
    estimatedDistance: "",
    stops: [],
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close place dropdowns
      Object.keys(showPlaceDropdown).forEach((stopId) => {
        if (showPlaceDropdown[stopId] && placeDropdownRefs.current[stopId]) {
          const dropdownElement = placeDropdownRefs.current[stopId]
          if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
            setShowPlaceDropdown((prev) => ({ ...prev, [stopId]: false }))
          }
        }
      })

      // Close subcategory dropdowns
      Object.keys(showSubcategoryDropdown).forEach((key) => {
        if (showSubcategoryDropdown[key] && subcategoryDropdownRefs.current[key]) {
          const dropdownElement = subcategoryDropdownRefs.current[key]
          if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
            setShowSubcategoryDropdown((prev) => ({ ...prev, [key]: false }))
          }
        }
      })
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showPlaceDropdown, showSubcategoryDropdown])

  const calculateTotalTime = () => {
    let totalMinutes = 0

    trailForm.stops.forEach((stop) => {
      const time = Number.parseFloat(stop.estimatedTime) || 0
      switch (stop.estimatedTimeUnit) {
        case "mins":
          totalMinutes += time
          break
        case "hours":
          totalMinutes += time * 60
          break
        case "days":
          totalMinutes += time * 24 * 60
          break
      }
    })

    // Convert back to most appropriate unit
    if (totalMinutes < 60) {
      return `${Math.round(totalMinutes)} mins`
    } else if (totalMinutes < 1440) {
      // Less than 24 hours
      const hours = Math.floor(totalMinutes / 60)
      const mins = Math.round(totalMinutes % 60)
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    } else {
      const days = Math.floor(totalMinutes / 1440)
      const hours = Math.floor((totalMinutes % 1440) / 60)
      return hours > 0 ? `${days}d ${hours}h` : `${days}d`
    }
  }

  const handleCoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setTrailForm((prev) => ({
        ...prev,
        coverImage: imageUrl,
        coverImageFile: file,
      }))
    }
  }

  const handlePlaceSearch = (stopId: string, query: string) => {
    setPlaceSearchQuery((prev) => ({ ...prev, [stopId]: query }))
    setShowPlaceDropdown((prev) => ({ ...prev, [stopId]: query.length > 0 }))
    updateStop(stopId, "name", query)
  }

  const selectPlace = (stopId: string, place: (typeof mockPlaces)[0]) => {
    updateStop(stopId, "name", place.name)
    updateStop(stopId, "address", place.address)
    updateStop(stopId, "category", place.category)
    setPlaceSearchQuery((prev) => ({ ...prev, [stopId]: place.name }))
    setShowPlaceDropdown((prev) => ({ ...prev, [stopId]: false }))
    setShowAddNewPlace((prev) => ({ ...prev, [stopId]: false }))
  }

  const toggleAddPlaceModal = (stopId: string) => {
    setShowAddPlaceModal((prev) => ({ ...prev, [stopId]: !prev[stopId] }))
    setShowPlaceDropdown((prev) => ({ ...prev, [stopId]: false }))
    if (!addPlaceForm[stopId]) {
      setAddPlaceStep((prev) => ({ ...prev, [stopId]: 1 }))
      setAddPlaceForm((prev) => ({
        ...prev,
        [stopId]: {
          searchQuery: placeSearchQuery[stopId] || "",
          selectedLocation: null,
          name: "",
          category: "",
          subcategories: [],
          customSubcategory: "",
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
        },
      }))
    }
  }

  const validateAddPlaceStep1 = (stopId: string) => {
    return addPlaceForm[stopId]?.selectedLocation !== null
  }

  const validateAddPlaceStep2 = (stopId: string) => {
    const form = addPlaceForm[stopId]
    const errors: Record<string, boolean> = {}
    if (!form?.name?.trim()) errors.name = true
    if (!form?.category) errors.category = true

    setAddPlaceValidationErrors((prev) => ({ ...prev, [stopId]: errors }))
    return Object.keys(errors).length === 0
  }

  const handleAddPlaceSubmit = (stopId: string) => {
    if (!validateAddPlaceStep2(stopId)) return

    const form = addPlaceForm[stopId]
    if (form && form.name && form.category) {
      // Add to mock database
      const newPlace = {
        id: Date.now().toString(),
        name: form.name,
        address: form.selectedLocation?.address || `${form.name} Location`,
        category: form.category,
      }
      mockPlaces.push(newPlace)

      // Select the new place for the current stop
      selectPlace(stopId, newPlace)

      // Show success step
      setAddPlaceStep((prev) => ({ ...prev, [stopId]: 3 }))

      // Auto-close after 2 seconds
      setTimeout(() => {
        cancelAddPlace(stopId)
      }, 2000)
    }
  }

  const cancelAddPlace = (stopId: string) => {
    setShowAddPlaceModal((prev) => ({ ...prev, [stopId]: false }))
    setAddPlaceStep((prev) => ({ ...prev, [stopId]: 1 }))
    setAddPlaceForm((prev) => ({
      ...prev,
      [stopId]: {
        searchQuery: "",
        selectedLocation: null,
        name: "",
        category: "",
        subcategories: [],
        customSubcategory: "",
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
      },
    }))
    setAddPlaceValidationErrors((prev) => ({ ...prev, [stopId]: {} }))
  }

  const togglePlaceSubcategory = (stopId: string, subcategoryName: string) => {
    setAddPlaceForm((prev) => ({
      ...prev,
      [stopId]: {
        ...prev[stopId],
        subcategories: prev[stopId].subcategories.includes(subcategoryName)
          ? prev[stopId].subcategories.filter((s) => s !== subcategoryName)
          : [...prev[stopId].subcategories, subcategoryName],
      },
    }))
  }

  const handlePlacePhotoUpload = (stopId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAddPlaceForm((prev) => ({
      ...prev,
      [stopId]: {
        ...prev[stopId],
        photos: [...prev[stopId].photos, ...files],
      },
    }))
  }

  const removePlacePhoto = (stopId: string, index: number) => {
    setAddPlaceForm((prev) => ({
      ...prev,
      [stopId]: {
        ...prev[stopId],
        photos: prev[stopId].photos.filter((_, i) => i !== index),
      },
    }))
  }

  const updatePlaceHours = (
    stopId: string,
    day: string,
    field: "open" | "close" | "closed",
    value: string | boolean,
  ) => {
    setAddPlaceForm((prev) => ({
      ...prev,
      [stopId]: {
        ...prev[stopId],
        hours: {
          ...prev[stopId].hours,
          [day]: {
            ...(prev[stopId].hours as any)[day][field],
            [field]: value,
          },
        },
      },
    }))
  }

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

  const handleGoogleMapsUrl = (stopId: string, url: string) => {
    const coords = extractLatLngFromUrl(url)
    if (coords) {
      setAddPlaceForm((prev) => ({
        ...prev,
        [stopId]: {
          ...prev[stopId],
          selectedLocation: {
            ...coords,
            address: "Location from Google Maps",
            name: prev[stopId].name || "Imported Location",
          },
          googleMapsUrl: url,
        },
      }))
    }
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const toggleAddNewPlace = (stopId: string) => {
    toggleAddPlaceModal(stopId)
  }

  const handleAddPlaceSubmitOld = (stopId: string) => {
    const form = addPlaceForm[stopId]
    if (form && form.name && form.category) {
      // Add to mock database
      const newPlace = {
        id: Date.now().toString(),
        name: form.name,
        address: form.address || `${form.name} Location`,
        category: form.category,
      }
      mockPlaces.push(newPlace)

      // Select the new place for the current stop
      selectPlace(stopId, newPlace)

      // Close modal and reset form
      setShowAddPlaceModal((prev) => ({ ...prev, [stopId]: false }))
      setAddPlaceForm((prev) => ({
        ...prev,
        [stopId]: {
          name: "",
          category: "",
          subcategories: [],
          customSubcategory: "",
          phone: "",
          website: "",
          address: "",
        },
      }))
    }
  }

  const cancelAddPlaceOld = (stopId: string) => {
    setShowAddPlaceModal((prev) => ({ ...prev, [stopId]: false }))
    setAddPlaceForm((prev) => ({
      ...prev,
      [stopId]: {
        name: "",
        category: "",
        subcategories: [],
        customSubcategory: "",
        phone: "",
        website: "",
        address: "",
      },
    }))
  }

  const togglePlaceSubcategoryOld = (stopId: string, subcategoryName: string) => {
    setAddPlaceForm((prev) => ({
      ...prev,
      [stopId]: {
        ...prev[stopId],
        subcategories: prev[stopId].subcategories.includes(subcategoryName)
          ? prev[stopId].subcategories.filter((s) => s !== subcategoryName)
          : [...prev[stopId].subcategories, subcategoryName],
      },
    }))
  }

  const getSubcategoriesForCategory = (categoryName: string) => {
    const categoryData = categoryStructure.find((cat) => cat.name === categoryName)
    return categoryData?.subcategories || []
  }

  const filteredPlaces = (query: string) => {
    if (!query) return mockPlaces
    return mockPlaces.filter(
      (place) =>
        place.name.toLowerCase().includes(query.toLowerCase()) ||
        place.address.toLowerCase().includes(query.toLowerCase()),
    )
  }

  const handleBackClick = () => {
    router.push("/profile")
  }

  const addNewStop = () => {
    const newStop: TrailStop = {
      id: Date.now().toString(),
      name: "",
      address: "",
      category: "",
      estimatedTime: "",
      estimatedTimeUnit: "mins",
      detailedInstructions: "",
      images: [],
    }

    setExpandedStops(new Set([newStop.id]))

    setTrailForm((prev) => ({
      ...prev,
      stops: [...prev.stops, newStop],
    }))
  }

  const removeStop = (stopId: string) => {
    setTrailForm((prev) => ({
      ...prev,
      stops: prev.stops.filter((stop) => stop.id !== stopId),
    }))
    setExpandedStops((prev) => {
      const newSet = new Set(prev)
      newSet.delete(stopId)
      return newSet
    })
  }

  const updateStop = (stopId: string, field: keyof TrailStop, value: any) => {
    setTrailForm((prev) => ({
      ...prev,
      stops: prev.stops.map((stop) => (stop.id === stopId ? { ...stop, [field]: value } : stop)),
    }))
  }

  const addImageToStop = (stopId: string) => {
    const newImage: TrailStopImage = {
      id: Date.now().toString(),
      url: "",
      caption: "",
      tags: [],
      type: "item", // Set default image type to 'item'
    }
    updateStop(stopId, "images", [...(trailForm.stops.find((s) => s.id === stopId)?.images || []), newImage])
  }

  const handleStopImageUpload = (stopId: string, imageId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      updateStopImage(stopId, imageId, "url", imageUrl)
      updateStopImage(stopId, imageId, "file", file)
    }
  }

  const removeImageFromStop = (stopId: string, imageId: string) => {
    const stop = trailForm.stops.find((s) => s.id === stopId)
    if (stop) {
      updateStop(
        stopId,
        "images",
        stop.images.filter((img) => img.id !== imageId),
      )
    }
  }

  const updateStopImage = (stopId: string, imageId: string, field: keyof TrailStopImage, value: any) => {
    const stop = trailForm.stops.find((s) => s.id === stopId)
    if (stop) {
      const updatedImages = stop.images.map((img) => (img.id === imageId ? { ...img, [field]: value } : img))
      updateStop(stopId, "images", updatedImages)
    }
  }

  const toggleStopExpansion = (stopId: string) => {
    setExpandedStops((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(stopId)) {
        newSet.delete(stopId)
      } else {
        newSet.add(stopId)
      }
      return newSet
    })
  }

  const handleSaveTrail = () => {
    console.log("[v0] Saving trail:", trailForm)
    // TODO: Implement trail saving logic
    router.push("/profile")
  }

  const handlePreview = () => {
    localStorage.setItem("trailPreviewData", JSON.stringify(trailForm))
    router.push("/add-trail/preview")
  }

  const getSubcategoriesForPlace = (placeId: string, query = "") => {
    const placeSubcategories = mockSubcategories.filter((sub) => sub.placeId === placeId)
    if (!query) return placeSubcategories
    return placeSubcategories.filter((sub) => sub.name.toLowerCase().includes(query.toLowerCase()))
  }

  const getDefaultSubcategories = (query = "") => {
    // Show items from the first place as default
    const defaultSubcategories = mockSubcategories.filter((sub) => sub.placeId === "1")
    if (!query) return defaultSubcategories
    return defaultSubcategories.filter((sub) => sub.name.toLowerCase().includes(query.toLowerCase()))
  }

  const handleSubcategorySearch = (stopId: string, imageId: string, query: string) => {
    const key = `${stopId}-${imageId}`
    setSubcategorySearchQuery((prev) => ({ ...prev, [key]: query }))
    setShowSubcategoryDropdown((prev) => ({ ...prev, [key]: true }))
  }

  const selectSubcategory = (stopId: string, imageId: string, subcategory: (typeof mockSubcategories)[0]) => {
    const key = `${stopId}-${imageId}`
    setSubcategorySearchQuery((prev) => ({ ...prev, [key]: subcategory.name }))
    setShowSubcategoryDropdown((prev) => ({ ...prev, [key]: false }))
    updateStopImage(stopId, imageId, "tags", [subcategory.name])
    updateStopImage(stopId, imageId, "type", subcategory.type as "subcategory" | "item")
  }

  const handleAddNewSubcategory = (stopId: string, imageId: string) => {
    const key = `${stopId}-${imageId}`
    setShowAddNewSubcategory((prev) => ({ ...prev, [key]: true }))
    setShowSubcategoryDropdown((prev) => ({ ...prev, [key]: false }))
    setNewSubcategoryForm((prev) => ({
      ...prev,
      [key]: { name: subcategorySearchQuery[key] || "", type: "item" },
    }))
  }

  const saveNewSubcategory = (stopId: string, imageId: string) => {
    const key = `${stopId}-${imageId}`
    const form = newSubcategoryForm[key]
    const selectedPlace = mockPlaces.find((p) => p.name === trailForm.stops.find((s) => s.id === stopId)?.name)

    if (form && form.name && selectedPlace) {
      // Add to mock database
      const newSubcategory = {
        id: Date.now().toString(),
        name: form.name,
        type: form.type,
        placeId: selectedPlace.id,
      }
      mockSubcategories.push(newSubcategory)

      // Update the image with the new subcategory
      updateStopImage(stopId, imageId, "tags", [form.name])
      updateStopImage(stopId, imageId, "type", form.type)

      // Reset form and close modal
      setShowAddNewSubcategory((prev) => ({ ...prev, [key]: false }))
      setNewSubcategoryForm((prev) => ({ ...prev, [key]: { name: "", type: "item" } }))
      setSubcategorySearchQuery((prev) => ({ ...prev, [key]: form.name }))
    }
  }

  const cancelNewSubcategory = (stopId: string, imageId: string) => {
    const key = `${stopId}-${imageId}`
    setShowAddNewSubcategory((prev) => ({ ...prev, [key]: false }))
    setNewSubcategoryForm((prev) => ({ ...prev, [key]: { name: "", type: "item" } }))
  }

  const [showNewSubcategoryModal, setShowNewSubcategoryModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={handleBackClick} className="mr-3 hover:bg-gray-100 -ml-2">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Create Trail</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={handleSaveTrail} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Basic Trail Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Trail Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trail Title *</label>
              <Input
                placeholder="e.g., Best Food Trail in Chennai"
                value={trailForm.title}
                onChange={(e) => setTrailForm((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                placeholder="Describe what makes this trail special..."
                value={trailForm.description}
                onChange={(e) => setTrailForm((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <Select
                  value={trailForm.category}
                  onValueChange={(value) => setTrailForm((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <Select
                  value={trailForm.difficulty}
                  onValueChange={(value) => setTrailForm((prev) => ({ ...prev, difficulty: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Est. Duration</label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="e.g., 3"
                    value={trailForm.estimatedDuration}
                    onChange={(e) => setTrailForm((prev) => ({ ...prev, estimatedDuration: e.target.value }))}
                    className="flex-1"
                    min="1"
                    step="0.5"
                  />
                  <Select
                    value={trailForm.estimatedDurationUnit}
                    onValueChange={(value) => setTrailForm((prev) => ({ ...prev, estimatedDurationUnit: value }))}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Distance</label>
              <Input
                placeholder="e.g., 2.5 km"
                value={trailForm.estimatedDistance}
                onChange={(e) => setTrailForm((prev) => ({ ...prev, estimatedDistance: e.target.value }))}
                className="w-full md:w-1/3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
              {trailForm.coverImage ? (
                <div className="relative">
                  <img
                    src={trailForm.coverImage || "/placeholder.svg"}
                    alt="Cover preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTrailForm((prev) => ({ ...prev, coverImage: "", coverImageFile: undefined }))}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="block">
                  <input type="file" accept="image/*" onChange={handleCoverImageUpload} className="hidden" />
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </Card>

        {/* Trail Stops */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Trail Stops ({trailForm.stops.length})</h2>
            <Button onClick={addNewStop} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Stop
            </Button>
          </div>

          {trailForm.stops.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No stops added yet</p>
              <p className="text-sm">Add your first stop to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trailForm.stops.map((stop, index) => {
                const isExpanded = expandedStops.has(stop.id)
                const searchQuery = placeSearchQuery[stop.id] || ""
                const showDropdown = showPlaceDropdown[stop.id] || false
                const showAddNew = showAddNewPlace[stop.id] || false

                return (
                  <Card key={stop.id} className="p-4 border border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-3">
                            <div className="relative">
                              <Input
                                placeholder="Search for a place or add new..."
                                value={stop.name}
                                onChange={(e) => handlePlaceSearch(stop.id, e.target.value)}
                                onFocus={() => setShowPlaceDropdown((prev) => ({ ...prev, [stop.id]: true }))}
                                className="font-medium pr-10"
                              />
                              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>

                            {showDropdown && (
                              <div
                                ref={(el) => (placeDropdownRefs.current[stop.id] = el)}
                                className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg left-0 right-0"
                              >
                                <div className="max-h-40 md:max-h-48 overflow-auto">
                                  {filteredPlaces(searchQuery).map((place) => (
                                    <button
                                      key={place.id}
                                      onClick={() => selectPlace(stop.id, place)}
                                      className="w-full px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                    >
                                      <div className="font-medium text-sm">{place.name}</div>
                                      <div className="text-xs text-gray-500">{place.address}</div>
                                    </button>
                                  ))}
                                </div>
                                <div className="sticky bottom-0 bg-white border-t border-gray-200">
                                  <button
                                    onClick={() => toggleAddNewPlace(stop.id)}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 text-orange-600 font-medium text-sm"
                                  >
                                    <Plus className="h-4 w-4 inline mr-2" />
                                    Add new place
                                  </button>
                                </div>
                              </div>
                            )}

                            {showAddPlaceModal[stop.id] && (
                              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                  {/* Header with progress */}
                                  <div className="bg-white border-b p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          const currentStep = addPlaceStep[stop.id] || 1
                                          if (currentStep === 1) {
                                            cancelAddPlace(stop.id)
                                          } else {
                                            setAddPlaceStep((prev) => ({ ...prev, [stop.id]: currentStep - 1 }))
                                          }
                                        }}
                                        className="p-2"
                                      >
                                        <ArrowLeft className="h-4 w-4" />
                                      </Button>
                                      <span className="text-sm font-medium text-gray-600">
                                        Step {addPlaceStep[stop.id] || 1} of 2
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => cancelAddPlace(stop.id)}
                                        className="text-gray-400 hover:text-gray-600"
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div
                                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${((addPlaceStep[stop.id] || 1) / 2) * 100}%` }}
                                      />
                                    </div>
                                  </div>

                                  {/* Step 1: Set Location */}
                                  {(addPlaceStep[stop.id] || 1) === 1 && (
                                    <div className="p-6">
                                      <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Set Location</h3>
                                        <p className="text-gray-600">Find the exact location of the place</p>
                                      </div>

                                      <div className="space-y-4">
                                        <div className="relative">
                                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                          <Input
                                            placeholder="Search for an address..."
                                            value={addPlaceForm[stop.id]?.searchQuery || ""}
                                            onChange={(e) =>
                                              setAddPlaceForm((prev) => ({
                                                ...prev,
                                                [stop.id]: { ...prev[stop.id], searchQuery: e.target.value },
                                              }))
                                            }
                                            className="pl-10"
                                          />
                                          {addPlaceForm[stop.id]?.searchQuery && (
                                            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-10">
                                              {[
                                                `${addPlaceForm[stop.id].searchQuery} - Chennai`,
                                                "Chennai Downtown",
                                                "Chennai City Center",
                                                "Near Chennai Mall",
                                              ]
                                                .filter((suggestion) =>
                                                  suggestion
                                                    .toLowerCase()
                                                    .includes(addPlaceForm[stop.id].searchQuery.toLowerCase()),
                                                )
                                                .map((suggestion, index) => (
                                                  <button
                                                    key={index}
                                                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                                    onClick={() => {
                                                      setAddPlaceForm((prev) => ({
                                                        ...prev,
                                                        [stop.id]: {
                                                          ...prev[stop.id],
                                                          searchQuery: suggestion,
                                                          selectedLocation: {
                                                            lat: 12.9716 + Math.random() * 0.1,
                                                            lng: 77.5946 + Math.random() * 0.1,
                                                            address: suggestion,
                                                            name: suggestion.split(" - ")[0],
                                                          },
                                                        },
                                                      }))
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

                                        <Card className="h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
                                          <div className="text-center">
                                            <MapPin className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                                            <p className="text-gray-600 font-medium">Interactive Map</p>
                                            <p className="text-sm text-gray-500">Drag pin to adjust location</p>
                                          </div>
                                          {addPlaceForm[stop.id]?.selectedLocation && (
                                            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
                                              <span className="text-sm font-medium text-green-600">
                                                📍 Location Set
                                              </span>
                                            </div>
                                          )}
                                        </Card>

                                        {addPlaceForm[stop.id]?.selectedLocation && (
                                          <Card className="p-4 bg-green-50 border-green-200">
                                            <div className="flex items-start">
                                              <Check className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                                              <div>
                                                <p className="font-medium text-green-800">Location Confirmed</p>
                                                <p className="text-sm text-green-700">
                                                  {addPlaceForm[stop.id].selectedLocation.address}
                                                </p>
                                                <p className="text-xs text-green-600 mt-1">
                                                  Lat: {addPlaceForm[stop.id].selectedLocation.lat.toFixed(6)}, Lng:{" "}
                                                  {addPlaceForm[stop.id].selectedLocation.lng.toFixed(6)}
                                                </p>
                                              </div>
                                            </div>
                                          </Card>
                                        )}
                                      </div>

                                      <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t">
                                        <Button variant="outline" onClick={() => cancelAddPlace(stop.id)}>
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={() => setAddPlaceStep((prev) => ({ ...prev, [stop.id]: 2 }))}
                                          disabled={!validateAddPlaceStep1(stop.id)}
                                          className="bg-orange-500 hover:bg-orange-600 text-white"
                                        >
                                          Confirm Location
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Step 2: Add Details */}
                                  {addPlaceStep[stop.id] === 2 && (
                                    <div className="p-6">
                                      <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Add Details</h3>
                                        <p className="text-gray-600">Tell us about this place</p>
                                      </div>

                                      <div className="space-y-6">
                                        {/* Basic Information */}
                                        <div className="space-y-4">
                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Place Name *
                                            </label>
                                            <Input
                                              placeholder="Enter the official name"
                                              value={addPlaceForm[stop.id]?.name || ""}
                                              onChange={(e) =>
                                                setAddPlaceForm((prev) => ({
                                                  ...prev,
                                                  [stop.id]: { ...prev[stop.id], name: e.target.value },
                                                }))
                                              }
                                              className={
                                                addPlaceValidationErrors[stop.id]?.name ? "border-red-300" : ""
                                              }
                                            />
                                            {addPlaceValidationErrors[stop.id]?.name && (
                                              <p className="text-sm text-red-600 mt-1">Place name is required</p>
                                            )}
                                          </div>

                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Category *
                                            </label>
                                            <Select
                                              value={addPlaceForm[stop.id]?.category || ""}
                                              onValueChange={(value) =>
                                                setAddPlaceForm((prev) => ({
                                                  ...prev,
                                                  [stop.id]: { ...prev[stop.id], category: value, subcategories: [] },
                                                }))
                                              }
                                            >
                                              <SelectTrigger
                                                className={
                                                  addPlaceValidationErrors[stop.id]?.category ? "border-red-300" : ""
                                                }
                                              >
                                                <SelectValue placeholder="Select a category" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                {categories.map((category) => (
                                                  <SelectItem key={category} value={category}>
                                                    {category}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                            {addPlaceValidationErrors[stop.id]?.category && (
                                              <p className="text-sm text-red-600 mt-1">Category is required</p>
                                            )}
                                          </div>

                                          {addPlaceForm[stop.id]?.category && (
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Sub-Categories (Optional - Select multiple)
                                              </label>
                                              <div className="grid grid-cols-2 gap-2">
                                                {getSubcategoriesForCategory(addPlaceForm[stop.id].category).map(
                                                  (subcategory) => (
                                                    <button
                                                      key={subcategory.id}
                                                      type="button"
                                                      onClick={() => togglePlaceSubcategory(stop.id, subcategory.name)}
                                                      className={`p-2 text-sm border rounded-lg text-left transition-colors ${
                                                        addPlaceForm[stop.id].subcategories.includes(subcategory.name)
                                                          ? "bg-orange-50 border-orange-300 text-orange-800"
                                                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                                      }`}
                                                    >
                                                      {subcategory.name}
                                                    </button>
                                                  ),
                                                )}
                                                <button
                                                  type="button"
                                                  onClick={() => togglePlaceSubcategory(stop.id, "Other")}
                                                  className={`p-2 text-sm border rounded-lg text-left transition-colors ${
                                                    addPlaceForm[stop.id].subcategories.includes("Other")
                                                      ? "bg-orange-50 border-orange-300 text-orange-800"
                                                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                                                  }`}
                                                >
                                                  Other
                                                </button>
                                              </div>

                                              {addPlaceForm[stop.id].subcategories.includes("Other") && (
                                                <div className="mt-3">
                                                  <Input
                                                    placeholder="Please specify the subcategory..."
                                                    value={addPlaceForm[stop.id].customSubcategory}
                                                    onChange={(e) =>
                                                      setAddPlaceForm((prev) => ({
                                                        ...prev,
                                                        [stop.id]: {
                                                          ...prev[stop.id],
                                                          customSubcategory: e.target.value,
                                                        },
                                                      }))
                                                    }
                                                  />
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>

                                        {/* Optional Details */}
                                        <div className="border-t pt-6 space-y-4">
                                          <h4 className="font-medium text-gray-900">Optional Details</h4>

                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Phone className="inline h-4 w-4 mr-1" />
                                                Phone Number
                                              </label>
                                              <Input
                                                placeholder="+91 98765 43210"
                                                value={addPlaceForm[stop.id]?.phone || ""}
                                                onChange={(e) =>
                                                  setAddPlaceForm((prev) => ({
                                                    ...prev,
                                                    [stop.id]: { ...prev[stop.id], phone: e.target.value },
                                                  }))
                                                }
                                              />
                                            </div>

                                            <div>
                                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                                <Globe className="inline h-4 w-4 mr-1" />
                                                Website
                                              </label>
                                              <Input
                                                placeholder="https://example.com"
                                                value={addPlaceForm[stop.id]?.website || ""}
                                                onChange={(e) =>
                                                  setAddPlaceForm((prev) => ({
                                                    ...prev,
                                                    [stop.id]: { ...prev[stop.id], website: e.target.value },
                                                  }))
                                                }
                                              />
                                            </div>
                                          </div>

                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Google Maps URL (Optional)
                                            </label>
                                            <Input
                                              placeholder="https://maps.google.com/..."
                                              value={addPlaceForm[stop.id]?.googleMapsUrl || ""}
                                              onChange={(e) => {
                                                setAddPlaceForm((prev) => ({
                                                  ...prev,
                                                  [stop.id]: { ...prev[stop.id], googleMapsUrl: e.target.value },
                                                }))
                                                if (e.target.value) {
                                                  handleGoogleMapsUrl(stop.id, e.target.value)
                                                }
                                              }}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                              Paste a Google Maps link to update location coordinates
                                            </p>
                                          </div>

                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              <Camera className="inline h-4 w-4 mr-1" />
                                              Photos
                                            </label>
                                            <input
                                              ref={(el) => (fileInputRefs.current[stop.id] = el)}
                                              type="file"
                                              multiple
                                              accept="image/*"
                                              onChange={(e) => handlePlacePhotoUpload(stop.id, e)}
                                              className="hidden"
                                            />
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-400 transition-colors">
                                              <Camera className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                                              <p className="text-gray-600 mb-2">
                                                A photo helps others discover your new spot!
                                              </p>
                                              <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => fileInputRefs.current[stop.id]?.click()}
                                              >
                                                <Upload className="h-4 w-4 mr-2" />
                                                Choose Photos
                                              </Button>
                                            </div>
                                            {addPlaceForm[stop.id]?.photos?.length > 0 && (
                                              <div className="mt-4 grid grid-cols-3 gap-2">
                                                {addPlaceForm[stop.id].photos.map((photo, index) => (
                                                  <div key={index} className="relative">
                                                    <img
                                                      src={URL.createObjectURL(photo) || "/placeholder.svg"}
                                                      alt={`Upload ${index + 1}`}
                                                      className="w-full h-16 object-cover rounded-lg"
                                                    />
                                                    <button
                                                      type="button"
                                                      onClick={() => removePlacePhoto(stop.id, index)}
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
                                            <Card className="p-4 space-y-3 max-h-48 overflow-y-auto">
                                              {days.map((day) => (
                                                <div key={day} className="flex items-center space-x-3">
                                                  <div className="w-16 text-sm font-medium capitalize">
                                                    {day.slice(0, 3)}
                                                  </div>
                                                  <div className="flex items-center space-x-2 flex-1">
                                                    <input
                                                      type="checkbox"
                                                      checked={
                                                        !addPlaceForm[stop.id]?.hours?.[
                                                          day as keyof (typeof addPlaceForm)[typeof stop.id]["hours"]
                                                        ]?.closed
                                                      }
                                                      onChange={(e) =>
                                                        updatePlaceHours(stop.id, day, "closed", !e.target.checked)
                                                      }
                                                      className="rounded"
                                                    />
                                                    {!addPlaceForm[stop.id]?.hours?.[
                                                      day as keyof (typeof addPlaceForm)[typeof stop.id]["hours"]
                                                    ]?.closed ? (
                                                      <>
                                                        <Input
                                                          type="time"
                                                          value={
                                                            addPlaceForm[stop.id]?.hours?.[
                                                              day as keyof (typeof addPlaceForm)[typeof stop.id]["hours"]
                                                            ]?.open || "09:00"
                                                          }
                                                          onChange={(e) =>
                                                            updatePlaceHours(stop.id, day, "open", e.target.value)
                                                          }
                                                          className="w-20 text-xs"
                                                        />
                                                        <span className="text-gray-500 text-xs">to</span>
                                                        <Input
                                                          type="time"
                                                          value={
                                                            addPlaceForm[stop.id]?.hours?.[
                                                              day as keyof (typeof addPlaceForm)[typeof stop.id]["hours"]
                                                            ]?.close || "18:00"
                                                          }
                                                          onChange={(e) =>
                                                            updatePlaceHours(stop.id, day, "close", e.target.value)
                                                          }
                                                          className="w-20 text-xs"
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
                                      </div>

                                      <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t">
                                        <Button
                                          variant="outline"
                                          onClick={() => setAddPlaceStep((prev) => ({ ...prev, [stop.id]: 1 }))}
                                        >
                                          Back
                                        </Button>
                                        <Button
                                          onClick={() => handleAddPlaceSubmit(stop.id)}
                                          className="bg-orange-500 hover:bg-orange-600 text-white"
                                          disabled={!addPlaceForm[stop.id]?.name || !addPlaceForm[stop.id]?.category}
                                        >
                                          Submit Place
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  {/* Step 3: Success */}
                                  {addPlaceStep[stop.id] === 3 && (
                                    <div className="p-8 text-center space-y-6">
                                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                        <Check className="h-8 w-8 text-green-600" />
                                      </div>

                                      <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Success! 🥳</h3>
                                        <p className="text-lg text-gray-600 mb-4">
                                          You've added{" "}
                                          <span className="font-semibold">{addPlaceForm[stop.id]?.name}</span> to City
                                          Trak.
                                        </p>
                                      </div>

                                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                                        <div className="flex items-center justify-center mb-2">
                                          <Star className="h-5 w-5 text-orange-500 fill-current mr-2" />
                                          <span className="text-lg font-bold text-orange-800">+100 TrakPoints</span>
                                        </div>
                                        <p className="text-orange-700">have been added to your wallet!</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="flex space-x-2">
                              <Input
                                type="number"
                                placeholder="30"
                                value={stop.estimatedTime}
                                onChange={(e) => updateStop(stop.id, "estimatedTime", e.target.value)}
                                className="w-20"
                                min="1"
                              />
                              <Select
                                value={stop.estimatedTimeUnit}
                                onChange={(value) => updateStop(stop.id, "estimatedTimeUnit", value)}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mins">Mins</SelectItem>
                                  <SelectItem value="hours">Hours</SelectItem>
                                  <SelectItem value="days">Days</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleStopExpansion(stop.id)}
                              className="p-1 hover:bg-gray-100"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-gray-600" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-600" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeStop(stop.id)}
                              className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {!isExpanded && stop.images.length > 0 && (
                          <div className="flex items-center space-x-2 pt-2">
                            {stop.images.slice(0, 4).map((image, idx) => (
                              <div
                                key={image.id}
                                className="w-8 h-8 bg-gray-200 rounded border overflow-hidden flex-shrink-0"
                              >
                                {image.url ? (
                                  <img
                                    src={image.url || "/placeholder.svg"}
                                    alt="Stop image"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Camera className="h-3 w-3 text-gray-400" />
                                  </div>
                                )}
                              </div>
                            ))}
                            {stop.images.length > 4 && (
                              <div className="w-8 h-8 bg-gray-100 rounded border flex items-center justify-center">
                                <span className="text-xs text-gray-600 font-medium">+{stop.images.length - 4}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {isExpanded && (
                          <div className="space-y-4 border-t pt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Detailed Instructions
                              </label>
                              <Textarea
                                placeholder="Provide detailed instructions for what to do at this stop..."
                                value={stop.detailedInstructions}
                                onChange={(e) => updateStop(stop.id, "detailedInstructions", e.target.value)}
                                className="h-32"
                              />
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-medium text-gray-700">
                                  Images ({stop.images.length})
                                </label>
                                <Button variant="outline" size="sm" onClick={() => addImageToStop(stop.id)}>
                                  <Camera className="h-4 w-4 mr-2" />
                                  Add Image
                                </Button>
                              </div>

                              {stop.images.length > 0 && (
                                <div className="space-y-3">
                                  {stop.images.map((image, imageIndex) => (
                                    <div key={image.id} className="border border-gray-200 rounded-lg p-3 relative">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeImageFromStop(stop.id, image.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 z-10"
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>

                                      <div className="space-y-3">
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden mx-auto">
                                          {image.url ? (
                                            <img
                                              src={image.url || "/placeholder.svg"}
                                              alt="Stop image"
                                              className="w-full h-full object-cover"
                                            />
                                          ) : (
                                            <label className="cursor-pointer flex items-center justify-center w-full h-full">
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleStopImageUpload(stop.id, image.id, e)}
                                                className="hidden"
                                              />
                                              <Camera className="h-6 w-6 text-gray-400" />
                                            </label>
                                          )}
                                        </div>

                                        {!image.url && (
                                          <div className="flex justify-center">
                                            <Button
                                              type="button"
                                              variant="outline"
                                              size="sm"
                                              onClick={() => {
                                                const input = document.createElement("input")
                                                input.type = "file"
                                                input.accept = "image/*"
                                                input.onchange = (e) =>
                                                  handleStopImageUpload(stop.id, image.id, e as any)
                                                input.click()
                                              }}
                                            >
                                              <Upload className="h-4 w-4 mr-2" />
                                              Upload
                                            </Button>
                                          </div>
                                        )}

                                        <div className="space-y-2">
                                          <Select
                                            value={image.type || "item"}
                                            onValueChange={(value: "subcategory" | "item") =>
                                              updateStopImage(stop.id, image.id, "type", value)
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Image type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="subcategory">Sub category</SelectItem>
                                              <SelectItem value="item">Specific Item</SelectItem>
                                            </SelectContent>
                                          </Select>
                                          <div className="relative">
                                            <Input
                                              placeholder="Search subcategory or item..."
                                              value={
                                                subcategorySearchQuery[`${stop.id}-${image.id}`] ||
                                                image.tags.join(", ")
                                              }
                                              onChange={(e) =>
                                                handleSubcategorySearch(stop.id, image.id, e.target.value)
                                              }
                                              onFocus={() =>
                                                setShowSubcategoryDropdown((prev) => ({
                                                  ...prev,
                                                  [`${stop.id}-${image.id}`]: true,
                                                }))
                                              }
                                            />
                                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

                                            {showSubcategoryDropdown[`${stop.id}-${image.id}`] && (
                                              <div
                                                ref={(el) =>
                                                  (subcategoryDropdownRefs.current[`${stop.id}-${image.id}`] = el)
                                                }
                                                className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-32 md:max-h-40 left-0 right-0"
                                              >
                                                <div className="max-h-24 md:max-h-32 overflow-auto">
                                                  {(stop.name
                                                    ? getSubcategoriesForPlace(
                                                        mockPlaces.find((p) => p.name === stop.name)?.id || "1",
                                                        subcategorySearchQuery[`${stop.id}-${image.id}`] || "",
                                                      )
                                                    : getDefaultSubcategories(
                                                        subcategorySearchQuery[`${stop.id}-${image.id}`] || "",
                                                      )
                                                  ).map((subcategory) => (
                                                    <button
                                                      key={subcategory.id}
                                                      onClick={() => selectSubcategory(stop.id, image.id, subcategory)}
                                                      className="w-full px-3 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                                                    >
                                                      <div className="flex items-center justify-between">
                                                        <span className="text-sm">{subcategory.name}</span>
                                                        <Badge variant="outline" className="text-xs">
                                                          {subcategory.type}
                                                        </Badge>
                                                      </div>
                                                    </button>
                                                  ))}
                                                </div>
                                                <div className="border-t border-gray-200 bg-gray-50">
                                                  <button
                                                    onClick={() => setShowNewSubcategoryModal(true)}
                                                    className="w-full px-3 py-2 text-left text-orange-600 hover:bg-orange-50 flex items-center gap-2"
                                                  >
                                                    <Plus className="h-4 w-4" />
                                                    {image.type === "item" ? "Add new item" : "Add new subcategory"}
                                                  </button>
                                                </div>
                                              </div>
                                            )}

                                            {showAddNewSubcategory[`${stop.id}-${image.id}`] && (
                                              <>
                                                <div
                                                  className="fixed inset-0 bg-black bg-opacity-50 z-50"
                                                  onClick={() => cancelNewSubcategory(stop.id, image.id)}
                                                />
                                                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                                                  <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                                                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                                                      {image.type === "subcategory"
                                                        ? "Add New Subcategory"
                                                        : "Add New Item"}
                                                    </h4>
                                                    <div className="space-y-4">
                                                      <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                          Type
                                                        </label>
                                                        <Select
                                                          value={
                                                            newSubcategoryForm[`${stop.id}-${image.id}`]?.type || "item"
                                                          }
                                                          onValueChange={(value: "subcategory" | "item") =>
                                                            setNewSubcategoryForm((prev) => ({
                                                              ...prev,
                                                              [`${stop.id}-${image.id}`]: {
                                                                ...prev[`${stop.id}-${image.id}`],
                                                                type: value,
                                                              },
                                                            }))
                                                          }
                                                        >
                                                          <SelectTrigger>
                                                            <SelectValue />
                                                          </SelectTrigger>
                                                          <SelectContent>
                                                            <SelectItem value="subcategory">Sub category</SelectItem>
                                                            <SelectItem value="item">Specific Item</SelectItem>
                                                          </SelectContent>
                                                        </Select>
                                                      </div>
                                                      <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                          Name
                                                        </label>
                                                        <Input
                                                          placeholder="Enter name..."
                                                          value={
                                                            newSubcategoryForm[`${stop.id}-${image.id}`]?.name || ""
                                                          }
                                                          onChange={(e) =>
                                                            setNewSubcategoryForm((prev) => ({
                                                              ...prev,
                                                              [`${stop.id}-${image.id}`]: {
                                                                ...prev[`${stop.id}-${image.id}`],
                                                                name: e.target.value,
                                                              },
                                                            }))
                                                          }
                                                        />
                                                      </div>
                                                      <div className="flex items-center justify-end space-x-3 pt-4">
                                                        <Button
                                                          variant="outline"
                                                          onClick={() => cancelNewSubcategory(stop.id, image.id)}
                                                        >
                                                          Cancel
                                                        </Button>
                                                        <Button
                                                          onClick={() => saveNewSubcategory(stop.id, image.id)}
                                                          className="bg-orange-500 hover:bg-orange-600 text-white"
                                                          disabled={!newSubcategoryForm[`${stop.id}-${image.id}`]?.name}
                                                        >
                                                          Add
                                                        </Button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                            )}
                                          </div>
                                          <Input
                                            placeholder="Image caption"
                                            value={image.caption}
                                            onChange={(e) =>
                                              updateStopImage(stop.id, image.id, "caption", e.target.value)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </Card>

        {trailForm.stops.length > 0 && (
          <Card className="p-6 bg-orange-50 border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Time and Stops</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{trailForm.stops.length}</div>
                <div className="text-sm text-gray-600">Total Stops</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{calculateTotalTime()}</div>
                <div className="text-sm text-gray-600">Estimated Time</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
