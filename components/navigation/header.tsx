"use client"

import { ChevronDown, User, Search, Plus, Bell, MapPin, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"
import { useCity } from "@/components/city-context"

const cities = [
  { name: "Chennai", country: "India" },
  { name: "Bangalore", country: "India" },
  { name: "Dubai", country: "UAE" },
  { name: "Muscat", country: "Oman" },
  { name: "New York", country: "USA" },
]

export function Header() {
  const pathname = usePathname()
  const { selectedCity, setSelectedCity } = useCity()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filteredCities = cities
    .filter(
      (city) =>
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 5)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isDropdownOpen])

  const handleCitySelect = (city: (typeof cities)[0]) => {
    setSelectedCity(city)
    setIsDropdownOpen(false)
    setSearchQuery("")
  }

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and City Selector on left, Desktop: Logo only */}
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ct-logo-bg"
              style={{
                background: "#f97316 !important",
                backgroundColor: "#f97316 !important",
              }}
            >
              <span
                className="font-bold text-sm select-none ct-logo-text"
                style={{
                  color: "#ffffff !important",
                  textShadow: "0 0 1px rgba(0,0,0,0.5)",
                }}
              >
                CT
              </span>
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:block">City Trak</span>
          </Link>

          {/* City Selector - Mobile only (after logo) */}
          <div className="relative md:hidden" ref={dropdownRef}>
            <Button
              variant="ghost"
              className="flex items-center space-x-1 text-gray-700 px-2 touch-manipulation"
              onClick={handleDropdownToggle}
              onTouchStart={handleDropdownToggle}
              style={{ touchAction: "manipulation" }}
            >
              <MapPin className="h-4 w-4" />
              <span className="font-medium text-sm">{selectedCity.name}</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform", isDropdownOpen && "rotate-180")} />
            </Button>

            {/* Mobile Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 touch-manipulation">
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search cities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <button
                        key={`${city.name}-${city.country}`}
                        onClick={() => handleCitySelect(city)}
                        onTouchStart={() => handleCitySelect(city)}
                        className={cn(
                          "w-full px-4 py-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center justify-between touch-manipulation",
                          selectedCity.name === city.name &&
                            selectedCity.country === city.country &&
                            "bg-orange-50 text-orange-600",
                        )}
                        style={{ touchAction: "manipulation" }}
                      >
                        <div>
                          <div className="font-medium text-sm">{city.name}</div>
                          <div className="text-xs text-gray-500">{city.country}</div>
                        </div>
                        {selectedCity.name === city.name && selectedCity.country === city.country && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-gray-500">No cities found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/"
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/" ? "bg-orange-50 text-orange-600" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
            )}
          >
            <span>Home</span>
          </Link>
          <Link
            href="/explore"
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/explore"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
            )}
          >
            <span>Trending</span>
          </Link>
          <Link
            href="/add" // Updated href from /add-place to /add
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/add" // Updated pathname check from /add-place to /add
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
            )}
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Link>
          <Link
            href="/search"
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/search"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
            )}
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </Link>
          <Link
            href="/profile"
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/profile"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
            )}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>
        </div>

        {/* City Selector and Alerts */}
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block" ref={dropdownRef}>
            <Button
              variant="ghost"
              className="flex items-center space-x-1 text-gray-700 touch-manipulation"
              onClick={handleDropdownToggle}
              onTouchStart={handleDropdownToggle}
              style={{ touchAction: "manipulation" }}
            >
              <MapPin className="h-4 w-4" />
              <span className="font-medium">{selectedCity.name}</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", isDropdownOpen && "rotate-180")} />
            </Button>

            {/* Desktop Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 touch-manipulation">
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search cities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredCities.length > 0 ? (
                    filteredCities.map((city) => (
                      <button
                        key={`${city.name}-${city.country}`}
                        onClick={() => handleCitySelect(city)}
                        onTouchStart={() => handleCitySelect(city)}
                        className={cn(
                          "w-full px-4 py-3 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors flex items-center justify-between touch-manipulation",
                          selectedCity.name === city.name &&
                            selectedCity.country === city.country &&
                            "bg-orange-50 text-orange-600",
                        )}
                        style={{ touchAction: "manipulation" }}
                      >
                        <div>
                          <div className="font-medium text-sm">{city.name}</div>
                          <div className="text-xs text-gray-500">{city.country}</div>
                        </div>
                        {selectedCity.name === city.name && selectedCity.country === city.country && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-gray-500">No cities found</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Alerts - Desktop only */}
          <Link
            href="/alerts"
            className={cn(
              "hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === "/alerts"
                ? "bg-orange-50 text-orange-600"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
            )}
          >
            <Bell className="h-4 w-4" />
            <span>Alerts</span>
          </Link>

          {/* Mobile Alerts Icon */}
          <Link href="/alerts" className="md:hidden">
            <Bell className="h-6 w-6 text-gray-600" />
          </Link>
        </div>
      </div>
    </header>
  )
}
