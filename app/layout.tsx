import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "City Trak - Discover Chennai's Best Restaurants",
  description: "Real-time billboard chart for restaurants. Discover what's trending in Chennai.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="bg-gray-50 min-h-screen pb-16 md:pb-0">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
