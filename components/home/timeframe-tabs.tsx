"use client"

import { timeframes } from "@/lib/dummy-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TimeframeTabsProps {
  selectedTimeframe: string
  onTimeframeChange: (timeframe: string) => void
}

export function TimeframeTabs({ selectedTimeframe, onTimeframeChange }: TimeframeTabsProps) {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {timeframes.map((timeframe) => (
        <Button
          key={timeframe.id}
          variant="ghost"
          size="sm"
          onClick={() => onTimeframeChange(timeframe.id)}
          className={cn(
            "flex-1 text-xs font-medium transition-all",
            selectedTimeframe === timeframe.id
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900",
          )}
        >
          {timeframe.label}
        </Button>
      ))}
    </div>
  )
}
