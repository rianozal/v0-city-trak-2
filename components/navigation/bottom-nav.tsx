"use client"

import { Home, Search, Plus, Compass, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Trending", href: "/explore" },
  { icon: Plus, label: "Add", href: "/add" }, // Updated href from /add-place to /add
  { icon: Search, label: "Search", href: "/search" },
  { icon: User, label: "Profile", href: "/profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-xs transition-colors",
                isActive ? "text-orange-500" : "text-gray-500 hover:text-gray-700",
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
