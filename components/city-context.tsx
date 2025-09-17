"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type City = {
  name: string
  country: string
}

type CityContextType = {
  selectedCity: City
  setSelectedCity: (city: City) => void
}

const CityContext = createContext<CityContextType | undefined>(undefined)

export function CityProvider({ children }: { children: ReactNode }) {
  const [selectedCity, setSelectedCity] = useState<City>({ name: "Chennai", country: "India" })

  return <CityContext.Provider value={{ selectedCity, setSelectedCity }}>{children}</CityContext.Provider>
}

export function useCity() {
  const context = useContext(CityContext)
  if (context === undefined) {
    throw new Error("useCity must be used within a CityProvider")
  }
  return context
}
