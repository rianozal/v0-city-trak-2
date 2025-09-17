"use client"

import { timeframes } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TrendingDropdownProps {
  selectedTimeframe: string
  onTimeframeChange: (timeframe: string) => void
}

export function TrendingDropdown({ selectedTimeframe, onTimeframeChange }: TrendingDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const currentTimeframe = timeframes.find((t) => t.id === selectedTimeframe)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleTimeframeSelect = (timeframe: (typeof timeframes)[0]) => {
    onTimeframeChange(timeframe.id)
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        className="text-xs bg-transparent"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {currentTimeframe?.label}
        <ChevronDown className={cn("ml-1 h-3 w-3 transition-transform", isDropdownOpen && "rotate-180")} />
      </Button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="max-h-60 overflow-y-auto">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.id}
                onClick={() => handleTimeframeSelect(timeframe)}
                className={cn(
                  "w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between text-sm",
                  selectedTimeframe === timeframe.id && "bg-orange-50 text-orange-600",
                )}
              >
                <span>{timeframe.label}</span>
                {selectedTimeframe === timeframe.id && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
