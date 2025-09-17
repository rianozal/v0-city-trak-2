"use client"

import { useRouter, useParams, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function UserProfile() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const userId = params.userId as string

  console.log("[v0] Dynamic profile route - userId:", userId)

  useEffect(() => {
    console.log("[v0] Dynamic profile route useEffect - userId:", userId)

    // Validate that userId is a valid user ID (should be numeric)
    if (!userId || userId === "undefined" || userId === "null" || !/^\d+$/.test(userId)) {
      console.log("[v0] Invalid userId, redirecting to main profile")
      router.replace("/profile")
      return
    }

    const urlParams = new URLSearchParams()
    urlParams.set("userId", userId)

    // Preserve all existing search parameters (like 'from')
    searchParams.forEach((value, key) => {
      if (key !== "userId") {
        // Don't duplicate userId
        urlParams.set(key, value)
      }
    })

    const redirectUrl = `/profile?${urlParams.toString()}`
    console.log("[v0] Valid userId, redirecting to main profile with preserved params:", redirectUrl)
    router.replace(redirectUrl)
  }, [userId, router, searchParams])

  // Show loading or nothing while redirecting
  return null
}
