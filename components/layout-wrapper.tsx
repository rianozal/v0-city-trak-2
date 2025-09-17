"use client"

import type React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Header } from "@/components/navigation/header"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { CityProvider } from "@/components/city-context"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isRestaurantPage = pathname?.startsWith("/restaurant/")
  const isReviewPage = pathname?.startsWith("/profile/review/")
  const isFollowersPage = pathname?.startsWith("/profile/followers")
  const isFollowingPage = pathname?.startsWith("/profile/following")
  const isLikesPage = pathname?.startsWith("/profile/likes")
  const isUserProfilePage = pathname?.startsWith("/profile/user/")
  const isMediaViewerPage = pathname?.startsWith("/profile/media/")
  const isTrailPage = pathname?.startsWith("/trail/")
  const isTrailReviewsPage = pathname?.includes("/trail/") && pathname?.includes("/reviews")
  const isAlertsPage = pathname?.startsWith("/alerts")
  const isPeopleYouMayKnowPage = pathname?.startsWith("/people-you-may-know")
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup")
  const isSettingsPage = pathname?.startsWith("/profile/settings")
  const isProfileEditPage = pathname?.startsWith("/profile/edit")
  const isDashboardPage = pathname?.startsWith("/dashboard") // Added dashboard page exclusion

  const isOtherUserProfile = pathname === "/profile" && searchParams?.get("userId")

  const isMediaViewerOpen = typeof document !== "undefined" && document.body.classList.contains("media-viewer-open")

  if (
    isRestaurantPage ||
    isReviewPage ||
    isFollowersPage ||
    isFollowingPage ||
    isLikesPage ||
    isUserProfilePage ||
    isOtherUserProfile ||
    isMediaViewerPage ||
    isTrailPage ||
    isTrailReviewsPage ||
    isAlertsPage ||
    isPeopleYouMayKnowPage ||
    isAuthPage ||
    isSettingsPage ||
    isProfileEditPage ||
    isDashboardPage || // Added dashboard page to exclusion list
    isMediaViewerOpen // Hide navigation when media viewer is open
  ) {
    return (
      <CityProvider>
        <main className="min-h-screen">{children}</main>
      </CityProvider>
    )
  }

  return (
    <CityProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <BottomNav />
    </CityProvider>
  )
}
