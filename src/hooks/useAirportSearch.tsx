import { useState, useMemo } from "react"
import type { Airport } from "@/types/flights"
import { mockAirports } from "@/mock/flights"

interface UseAirportSearchReturn {
  airports: Airport[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  filteredAirports: Airport[]
}

export const useAirportSearch = (): UseAirportSearchReturn => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAirports = useMemo(() => {
    if (!searchTerm) return mockAirports

    return mockAirports.filter(
      (airport) =>
        airport.presentation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.presentation.suggestionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airport.navigation.relevantFlightParams.skyId.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  return {
    airports: mockAirports,
    searchTerm,
    setSearchTerm,
    filteredAirports,
  }
}
