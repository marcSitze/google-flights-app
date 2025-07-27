import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, ChevronDown, AlertCircle } from "lucide-react"
import type { Airport } from "@/types/flights"
import { useAirportSearch } from "@/hooks/useAirportSearch"

interface LocationSelectorProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  error?: string
}

export function LocationSelector({ value, onChange, placeholder, label, error }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(value)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { filteredAirports } = useAirportSearch()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (airport: Airport) => {
    const displayValue =
      airport.navigation.entityType === "CITY" ? airport.presentation.title : airport.presentation.suggestionTitle

    setSearchTerm(displayValue)
    onChange(displayValue)
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    onChange(e.target.value)
    setIsOpen(true)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Label htmlFor={label.toLowerCase()} className="text-sm font-medium text-gray-700">
        {label}
      </Label>
      <div className="relative mt-1">
        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
        <Input
          id={label.toLowerCase()}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className={`pl-10 pr-10 ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
          placeholder={placeholder}
        />
        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        {error && (
          <div className="absolute right-10 top-3">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </p>
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredAirports.length > 0 ? (
            filteredAirports.map((airport) => (
              <div
                key={airport.navigation.entityId}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleSelect(airport)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{airport.presentation.title}</div>
                    <div className="text-sm text-gray-600">{airport.presentation.subtitle}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {airport.navigation.relevantFlightParams.skyId}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-center">No destinations found</div>
          )}
        </div>
      )}
    </div>
  )
}
